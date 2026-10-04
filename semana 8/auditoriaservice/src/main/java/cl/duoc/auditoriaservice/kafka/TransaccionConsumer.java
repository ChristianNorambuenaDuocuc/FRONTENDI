package cl.duoc.auditoriaservice.kafka;


import cl.duoc.auditoriaservice.event.TransaccionEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class TransaccionConsumer {

    @KafkaListener(
        topics = "transacciones-cuenta.v1",
        groupId = "auditoria-group"
)
    public void recibirTransaccion(TransaccionEvent evento) {

        System.out.println("================================");
        System.out.println("EVENTO RECIBIDO DESDE KAFKA");
        System.out.println("Cuenta: " + evento.getCuentasId());
        System.out.println("Fecha: " + evento.getFecha());
        System.out.println("Transaccion: " + evento.getTransaccion());
        System.out.println("Monto: $" + evento.getMonto());
        System.out.println("Descripcion: " + evento.getDescripcion());
        System.out.println("================================");
    }
}