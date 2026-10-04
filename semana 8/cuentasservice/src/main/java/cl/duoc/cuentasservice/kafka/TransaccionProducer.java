package cl.duoc.cuentasservice.kafka;


import cl.duoc.cuentasservice.event.TransaccionEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class TransaccionProducer {

    private static final String TOPIC = "transacciones-cuenta.v1";

    private final KafkaTemplate<String, TransaccionEvent> kafkaTemplate;

    public TransaccionProducer(
            KafkaTemplate<String, TransaccionEvent> kafkaTemplate) {

        this.kafkaTemplate = kafkaTemplate;
    }

    public void publicarTransaccion(TransaccionEvent evento) {

        kafkaTemplate.send(TOPIC, evento);

        System.out.println(
                "Evento enviado a Kafka: " +
                evento.getTransaccion() +
                " - Cuenta: " +
                evento.getCuentasId()
        );
    }
}
