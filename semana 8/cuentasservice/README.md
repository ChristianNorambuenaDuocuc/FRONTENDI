# Backend III - Semana 8 - Evaluación Sumativa

Proyecto desarrollado para la asignatura **Backend III**, basado en una arquitectura de microservicios con Spring Boot.

En esta etapa se incorporaron mejoras de seguridad mediante **OAuth2.0 y JWT**, tolerancia a fallos con **Resilience4j**, comunicación asíncrona mediante **Apache Kafka**, manejo de errores con **DLQ**, separación de DTOs y dockerización de los componentes mediante **Docker y Docker Compose**.

---

## Arquitectura de la solución

La solución está compuesta por los siguientes componentes:

- **Eureka Server:** descubrimiento y registro de servicios.
- **Config Server:** administración centralizada de configuraciones.
- **Auth Server:** autenticación mediante OAuth2.0 con GitHub y generación de JWT.
- **Cuenta Service:** microservicio principal encargado de la gestión y consulta de cuentas.
- **Auditoría Service:** consumidor de eventos generados por Cuenta Service.
- **Apache Kafka:** comunicación asíncrona entre los microservicios.
- **Docker Compose:** orquestación de todos los componentes de la solución.

La arquitectura general es:

```text
                    GitHub
                      |
                      v
                +-------------+
                | Auth Server |
                |    :8080    |
                +------+------+
                       |
                       | JWT
                       v
                +-------------+
                |   Cuenta    |
                |   Service   |
                |    :8081    |
                +------+------+
                       |
                       | Evento Kafka
                       v
                +-------------+
                |    Kafka    |
                |    :9092    |
                +------+------+
                       |
                       v
                +-------------+
                | Auditoría   |
                |   Service   |
                |    :8082    |
                +-------------+


          +------------------+
          |  Eureka Server   |
          |      :8761       |
          +------------------+

          +------------------+
          |  Config Server   |
          |      :8888       |
          +------------------+
```

---

# 1. OAuth2.0 y JWT

Se implementó OAuth2.0 utilizando **GitHub como proveedor de autenticación**.

El usuario se autentica mediante GitHub y, una vez validada su identidad, el `auth-server` genera un token JWT.

El flujo de autenticación es:

```text
Usuario
   |
   v
GitHub OAuth2
   |
   v
Auth Server
   |
   | genera JWT
   v
Cuenta Service
```

El `auth-server` utiliza claves RSA para firmar los tokens JWT.

También expone su clave pública mediante el endpoint:

```text
http://localhost:8080/.well-known/jwks.json
```

De esta forma, `cuentasservice` funciona como **OAuth2 Resource Server** y puede validar los JWT generados por `auth-server` sin necesidad de compartir la clave privada.

El endpoint para iniciar la autenticación mediante GitHub es:

```text
http://localhost:8080/oauth2/authorization/github
```

También se encuentra disponible:

```text
http://localhost:8080/api/auth/login
```

que entrega la URL correspondiente para iniciar el proceso de autenticación.

Los endpoints protegidos de `cuentasservice` requieren enviar:

```text
Authorization: Bearer <JWT>
```

Si se intenta acceder a un recurso protegido sin un token válido, el servicio responde con:

```text
401 Unauthorized
```

---

# 2. Configuración centralizada

Se utiliza **Spring Cloud Config Server** para centralizar configuraciones de los microservicios.

El Config Server se encuentra disponible en:

```text
http://localhost:8888
```

La configuración centralizada permite administrar propiedades como:

- conexión con Eureka;
- configuración de Resilience4j;
- parámetros de los servicios;
- configuraciones compartidas.

El Config Server utiliza autenticación HTTP Basic.

Para facilitar la ejecución tanto local como mediante Docker, `cuentasservice` utiliza:

```properties
spring.config.import=configserver:${CONFIG_SERVER_URL:http://localhost:8888}
```

De esta forma:

```text
Ejecución local:
http://localhost:8888

Ejecución Docker:
http://config-server:8888
```

---

# 3. Eureka Server

Se utiliza **Netflix Eureka** para el registro y descubrimiento de microservicios.

Eureka se ejecuta en:

```text
http://localhost:8761
```

Los servicios pueden registrarse en Eureka y utilizar el registro para identificar los componentes disponibles dentro de la arquitectura.

---

# 4. Comunicación mediante Kafka

`cuentasservice` publica eventos relacionados con transacciones mediante Apache Kafka.

`auditoriaservice` actúa como consumidor de dichos eventos.

El flujo es:

```text
Cuenta Service
      |
      | publica evento
      v
Apache Kafka
      |
      | consume evento
      v
Auditoría Service
```

---

## Convención de nombres de tópicos

Se estableció una convención para disminuir ambigüedades y permitir la evolución de los eventos:

```text
<evento>-<dominio>.v<version>
```

El tópico utilizado actualmente es:

```text
transacciones-cuenta.v1
```

La versión permite evolucionar el contrato del evento sin afectar inmediatamente a consumidores que todavía dependan de una versión anterior.

Por ejemplo, una futura modificación incompatible podría publicarse como:

```text
transacciones-cuenta.v2
```

---

# 5. Manejo de errores y DLQ

Se implementó una estrategia para evitar la pérdida de eventos cuando ocurre un error durante su procesamiento.

El consumidor Kafka utiliza:

- `DefaultErrorHandler`
- `DeadLetterPublishingRecoverer`
- reintentos con backoff exponencial.

El flujo ante un error es:

```text
transacciones-cuenta.v1
          |
          v
   Auditoría Service
          |
          | error
          v
      Reintento 1
          |
          | error
          v
      Reintento 2
          |
          | error
          v
      Reintento 3
          |
          | error
          v
transacciones-cuenta.v1.dlq
```

La configuración utiliza tres reintentos con espera progresiva:

```text
1 segundo
2 segundos
4 segundos
```

Si después de los reintentos el evento continúa fallando, es enviado al tópico:

```text
transacciones-cuenta.v1.dlq
```

La DLQ permite conservar la trazabilidad de los eventos fallidos y facilita su análisis o reprocesamiento posterior.

---

# 6. Tolerancia a fallos

Se incorporó **Resilience4j** para mejorar la tolerancia a fallos en la comunicación con servicios externos.

Se implementaron:

```java
@Retry
@CircuitBreaker
```

junto con un método de respaldo o `fallback`.

El comportamiento es:

```text
Solicitud a servicio externo
          |
          v
        @Retry
          |
     reintenta si falla
          |
          v
   @CircuitBreaker
          |
   controla los fallos
          |
          v
       fallback
```

### @Retry

Permite realizar nuevos intentos cuando se produce un error temporal de comunicación.

Se configuraron reintentos con espera progresiva.

### @CircuitBreaker

Supervisa los fallos del servicio externo.

Cuando se supera el umbral configurado, el circuito se abre temporalmente para evitar seguir realizando solicitudes hacia un servicio que se encuentra fallando.

### Fallback

Si la operación no puede recuperarse, se ejecuta un método de respaldo que entrega una respuesta controlada:

```text
Servicio externo no disponible. Respuesta de respaldo.
```

Esta estrategia permite aumentar la resiliencia de la aplicación y evitar fallos en cascada.

---

# 7. Separación de DTOs y dominio

Para disminuir el acoplamiento entre la API y el modelo interno se separaron los objetos utilizados para recibir y devolver información.

La estructura utilizada es:

```text
CuentaRequestDTO
CuentaResponseDTO
cuentas
```

## CuentaRequestDTO

Representa los datos recibidos por la API.

Contiene las reglas de validación, por ejemplo:

- ID obligatorio;
- fecha obligatoria;
- transacción obligatoria;
- monto mayor que cero;
- límites de caracteres.

## CuentaResponseDTO

Representa exclusivamente la información que será devuelta por la API.

De esta forma se controla qué datos son expuestos al cliente.

## Modelo cuentas

Representa el modelo interno del dominio.

Esta separación permite que cambios en el modelo interno no afecten necesariamente el contrato público de la API.

También ayuda a controlar qué información entra y sale del microservicio.

---

# 8. Manejo global de errores

`cuentasservice` posee manejo centralizado de excepciones mediante un `GlobalExceptionHandler`.

Se contemplan respuestas para:

```text
400 Bad Request
404 Not Found
500 Internal Server Error
```

También se procesan los errores generados por las validaciones de los DTOs.

Esto permite entregar respuestas de error controladas y consistentes.

---

# 9. Dockerización

Cada microservicio posee su propio `Dockerfile`.

La estructura general es:

```text
eureka-server/
    Dockerfile

config-server/
    Dockerfile

auth-server/
    Dockerfile

cuentasservice/
    Dockerfile

auditoriaservice/
    Dockerfile
```

Los Dockerfile utilizan una construcción multi-stage.

Primero se utiliza Maven y Java 21 para generar el archivo JAR:

```text
Código fuente
     |
     v
Maven
     |
mvn clean package
     |
     v
archivo .jar
```

Posteriormente se genera una imagen más liviana utilizando Java Runtime 21 para ejecutar la aplicación.

---

# 10. Docker Compose

Se implementó un archivo:

```text
docker-compose.yml
```

que permite orquestar todos los componentes de la solución.

Los servicios definidos son:

```text
kafka
eureka-server
config-server
auth-server
cuentasservice
auditoriaservice
```

Todos los servicios utilizan la red:

```text
backend-network
```

Dentro de Docker los microservicios se comunican utilizando el nombre del servicio en lugar de `localhost`.

Por ejemplo:

```text
config-server:8888
eureka-server:8761
auth-server:8080
kafka:9092
```

Esto permite que cada contenedor pueda localizar a los demás dentro de la red creada por Docker Compose.

---

# 11. Puertos utilizados

| Servicio | Puerto |
|---|---:|
| Auth Server | 8080 |
| Cuenta Service | 8081 |
| Auditoría Service | 8082 |
| Eureka Server | 8761 |
| Config Server | 8888 |
| Kafka | 9092 |

---

# 12. Ejecución mediante Docker

Desde la carpeta raíz del proyecto se puede construir y levantar toda la arquitectura mediante:

```bash
docker compose up --build
```

Para ejecutar los contenedores en segundo plano:

```bash
docker compose up -d
```

Para comprobar el estado de todos los componentes:

```bash
docker compose ps
```

Para visualizar los contenedores, incluyendo aquellos que se encuentren detenidos:

```bash
docker compose ps -a
```

Para visualizar logs:

```bash
docker compose logs
```

Por ejemplo:

```bash
docker compose logs cuentasservice
```

o:

```bash
docker compose logs auth-server
```

Para detener toda la solución:

```bash
docker compose down
```

---

# 13. Endpoints principales

## Eureka Server

```text
http://localhost:8761
```

---

## Auth Server

Información de autenticación:

```text
GET http://localhost:8080/api/auth/login
```

Inicio de autenticación mediante GitHub:

```text
http://localhost:8080/oauth2/authorization/github
```

Clave pública utilizada para verificar JWT:

```text
GET http://localhost:8080/.well-known/jwks.json
```

---

## Cuenta Service

Obtener todas las cuentas:

```text
GET http://localhost:8081/api/cuentas
```

Obtener información por ID de cuenta:

```text
GET http://localhost:8081/api/cuentas/{cuentaId}
```

Validar una cuenta y generar un evento:

```text
POST http://localhost:8081/api/cuentas/validar
```

Verificar configuración centralizada:

```text
GET http://localhost:8081/api/cuentas/config
```

Probar tolerancia a fallos:

```text
GET http://localhost:8081/api/cuentas/estado-externo
```

Los endpoints protegidos requieren:

```text
Authorization: Bearer <JWT>
```

---

# 14. Tecnologías utilizadas

El proyecto utiliza las siguientes tecnologías:

```text
Java 21
Spring Boot
Spring Cloud
Spring Security
OAuth2.0
JWT
GitHub OAuth2
Netflix Eureka
Spring Cloud Config
Apache Kafka
Resilience4j
Maven
Docker
Docker Compose
```

---

# 15. Mejoras implementadas

Durante el desarrollo se incorporaron mejoras para fortalecer la arquitectura del proyecto.

### Seguridad

```text
OAuth2.0 con GitHub
JWT firmado mediante RSA
Resource Server
JWK público
```

### Comunicación asíncrona

```text
Apache Kafka
Productor de eventos
Consumidor de eventos
```

### Convención y versionado

```text
transacciones-cuenta.v1
```

### Manejo de errores Kafka

```text
reintentos
backoff exponencial
DLQ
```

### Tolerancia a fallos

```text
@Retry
@CircuitBreaker
fallback
```

### Diseño de API

```text
CuentaRequestDTO
CuentaResponseDTO
modelo de dominio separado
```

### Despliegue

```text
Dockerfile por microservicio
Docker Compose
red interna de contenedores
```

---

# 16. Resultado final

La solución permite levantar mediante Docker Compose una arquitectura completa de microservicios que incorpora:

```text
descubrimiento de servicios
configuración centralizada
autenticación OAuth2.0
JWT
comunicación asíncrona con Kafka
manejo de errores mediante DLQ
tolerancia a fallos con Resilience4j
separación de DTOs
Docker
Docker Compose
```

La aplicación queda preparada para ejecutarse de forma integrada y para ser desplegada posteriormente en un entorno Cloud.