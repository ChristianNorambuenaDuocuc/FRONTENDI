package cl.duoc.cuentasservice.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;

@Service
public class EstadoExternoService {

    private final RestClient restClient;

    public EstadoExternoService() {
        this.restClient = RestClient.create();
    }

    @Retry(name = "estadoExterno")
    @CircuitBreaker(
            name = "estadoExterno",
            fallbackMethod = "fallbackEstado"
    )
    public String consultarEstado() {

        return restClient
                .get()
                .uri("http://localhost:9090/api/estado")
                .retrieve()
                .body(String.class);
    }

    public String fallbackEstado(Throwable throwable) {

        return "Servicio externo no disponible. Respuesta de respaldo.";
    }
}