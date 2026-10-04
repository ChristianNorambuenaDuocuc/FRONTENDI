package cl.duoc.cuentasservice.exception;


import java.time.LocalDateTime;

public class ErrorResponse {

    private int status;
    private String mensaje;
    private LocalDateTime fecha;

    public ErrorResponse(
            int status,
            String mensaje,
            LocalDateTime fecha) {

        this.status = status;
        this.mensaje = mensaje;
        this.fecha = fecha;
    }

    public int getStatus() {
        return status;
    }

    public String getMensaje() {
        return mensaje;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }
}