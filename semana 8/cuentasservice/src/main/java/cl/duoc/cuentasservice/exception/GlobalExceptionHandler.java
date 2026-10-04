package cl.duoc.cuentasservice.exception;


import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.MethodArgumentNotValidException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CuentaNoEncontradaException.class)
    public ResponseEntity<ErrorResponse> manejarCuentaNoEncontrada(
            CuentaNoEncontradaException ex) {

        ErrorResponse error = new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage(),
                LocalDateTime.now()
        );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> manejarErrorGeneral(
            Exception ex) {

        ErrorResponse error = new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Error interno del servidor",
                LocalDateTime.now()
        );

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<Map<String, Object>> manejarValidaciones(
        MethodArgumentNotValidException ex) {

    Map<String, String> errores = new HashMap<>();

    ex.getBindingResult()
            .getFieldErrors()
            .forEach(error ->
                    errores.put(
                            error.getField(),
                            error.getDefaultMessage()
                    )
            );

    Map<String, Object> respuesta = new HashMap<>();

    respuesta.put("status", 400);
    respuesta.put("mensaje", "Error de validacion");
    respuesta.put("errores", errores);
    respuesta.put("fecha", LocalDateTime.now());

    return ResponseEntity
            .badRequest()
            .body(respuesta);
}
}