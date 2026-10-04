package cl.duoc.cuentasservice.mapper;

import cl.duoc.cuentasservice.dto.CuentaResponseDTO;
import cl.duoc.cuentasservice.model.cuentas;

public class cuentasMapper {

    private cuentasMapper() {
    }

    public static CuentaResponseDTO toResponseDTO(cuentas cuenta) {

        return new CuentaResponseDTO(
                cuenta.getcuentasId(),
                cuenta.getFecha(),
                cuenta.getTransaccion(),
                cuenta.getMonto(),
                cuenta.getDescripcion()
        );
    }
}