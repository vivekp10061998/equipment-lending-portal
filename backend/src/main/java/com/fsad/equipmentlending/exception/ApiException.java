package com.fsad.equipmentlending.exception;

public class ApiException extends RuntimeException {
    public ApiException(String message) {
        super(message);
    }
}
