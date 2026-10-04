package cl.duoc.cuentasservice.event;

import java.math.BigDecimal;

public class TransaccionEvent {

    private Integer cuentasId;
    private String fecha;
    private String transaccion;
    private BigDecimal monto;
    private String descripcion;

    public TransaccionEvent() {
    }

    public TransaccionEvent(
            Integer cuentasId,
            String fecha,
            String transaccion,
            BigDecimal monto,
            String descripcion) {

        this.cuentasId = cuentasId;
        this.fecha = fecha;
        this.transaccion = transaccion;
        this.monto = monto;
        this.descripcion = descripcion;
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