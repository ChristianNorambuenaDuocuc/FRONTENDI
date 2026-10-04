package cl.duoc.cuentasservice.controller;

import cl.duoc.cuentasservice.dto.CuentaRequestDTO;
import cl.duoc.cuentasservice.dto.CuentaResponseDTO;

import cl.duoc.cuentasservice.event.TransaccionEvent;
import cl.duoc.cuentasservice.kafka.TransaccionProducer;
import cl.duoc.cuentasservice.service.cuentasService;
import cl.duoc.cuentasservice.service.EstadoExternoService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/cuentas")
public class cuentasController {

    private final cuentasService cuentasService;
    private final EstadoExternoService estadoExternoService;
    private final TransaccionProducer transaccionProducer;

    @Value("${mensaje.configuracion}")
    private String mensajeConfiguracion;

    public cuentasController(
            cuentasService cuentasService,
            EstadoExternoService estadoExternoService,
            TransaccionProducer transaccionProducer) {

        this.cuentasService = cuentasService;
        this.estadoExternoService = estadoExternoService;
        this.transaccionProducer = transaccionProducer;
    }

    @GetMapping
    public ResponseEntity<List<CuentaResponseDTO>> obtenerTodas() {

        return ResponseEntity.ok(
                cuentasService.obtenerTodas()
        );
    }

    @GetMapping("/{cuentaId}")
    public ResponseEntity<List<CuentaResponseDTO>> obtenerPorCuenta(
            @PathVariable Integer cuentaId) {

        return ResponseEntity.ok(
                cuentasService.obtenerPorcuentasId(cuentaId)
        );
    }

    @GetMapping("/config")
    public ResponseEntity<String> obtenerConfiguracion() {

        return ResponseEntity.ok(
                mensajeConfiguracion
        );
    }

    @PostMapping("/validar")
    public ResponseEntity<CuentaResponseDTO> validarCuenta(
            @Valid @RequestBody CuentaRequestDTO cuenta) {

        TransaccionEvent evento = new TransaccionEvent(
                cuenta.getCuentasId(),
                cuenta.getFecha(),
                cuenta.getTransaccion(),
                cuenta.getMonto(),
                cuenta.getDescripcion()
        );

        transaccionProducer.publicarTransaccion(evento);

        CuentaResponseDTO respuesta =
                new CuentaResponseDTO(
                        cuenta.getCuentasId(),
                        cuenta.getFecha(),
                        cuenta.getTransaccion(),
                        cuenta.getMonto(),
                        cuenta.getDescripcion()
                );

        return ResponseEntity
                .status(201)
                .body(respuesta);
    }

    @GetMapping("/estado-externo")
    public ResponseEntity<String> consultarEstadoExterno() {

        return ResponseEntity.ok(
                estadoExternoService.consultarEstado()
        );
    }
}