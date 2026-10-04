package cl.duoc.cuentasservice.exception;


public class CuentaNoEncontradaException extends RuntimeException {

    public CuentaNoEncontradaException(String mensaje) {
        super(mensaje);
    }
}