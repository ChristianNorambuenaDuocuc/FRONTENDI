package cl.duoc.cuentasservice.dto;


import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class CuentaRequestDTO {

    @NotNull(message = "El ID de cuenta es obligatorio")
    private Integer cuentasId;

    @NotBlank(message = "La fecha es obligatoria")
    private String fecha;

    @NotBlank(message = "La transaccion es obligatoria")
    @Size(
            min = 3,
            max = 30,
            message = "La transaccion debe tener entre 3 y 30 caracteres"
    )
    private String transaccion;

    @NotNull(message = "El monto es obligatorio")
    @Positive(message = "El monto debe ser mayor que cero")
    private BigDecimal monto;

    @Size(
            max = 100,
            message = "La descripcion no puede superar los 100 caracteres"
    )
    private String descripcion;

    public CuentaRequestDTO() {
    }

    public Integer getCuentasId() {
        return cuentasId;
    }

    public void setCuentasId(Integer cuentasId) {
        this.cuentasId = cuentasId;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getTransaccion() {
        return transaccion;
    }

    public void setTransaccion(String transaccion) {
        this.transaccion = transaccion;
    }

    public BigDecimal getMonto() {
        return monto;
    }

    public void setMonto(BigDecimal monto) {
        this.monto = monto;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}