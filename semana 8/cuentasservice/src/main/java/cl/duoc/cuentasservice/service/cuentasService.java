package cl.duoc.cuentasservice.service;

import cl.duoc.cuentasservice.dto.CuentaResponseDTO;
import cl.duoc.cuentasservice.mapper.cuentasMapper;
import cl.duoc.cuentasservice.repository.cuentasRepository;
import cl.duoc.cuentasservice.exception.CuentaNoEncontradaException;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class cuentasService {

    private final cuentasRepository cuentasRepository;

    public cuentasService(cuentasRepository cuentasRepository) {
        this.cuentasRepository = cuentasRepository;
    }

    public List<CuentaResponseDTO> obtenerTodas() {

        return cuentasRepository
                .findAll()
                .stream()
                .map(cuentasMapper::toResponseDTO)
                .toList();
    }

    public List<CuentaResponseDTO> obtenerPorcuentasId(
            Integer cuentasId) {

        List<CuentaResponseDTO> cuentas = cuentasRepository
                .findBycuentasId(cuentasId)
                .stream()
                .map(cuentasMapper::toResponseDTO)
                .toList();

        if (cuentas.isEmpty()) {
            throw new CuentaNoEncontradaException(
                    "No se encontraron cuentas con ID: " + cuentasId
            );
        }

        return cuentas;
    }
}