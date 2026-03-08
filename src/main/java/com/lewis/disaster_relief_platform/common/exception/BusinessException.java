package com.lewis.disaster_relief_platform.common.exception;

public class BusinessException extends RuntimeException {
    public BusinessException(String message){
        super(message);
    }
}
