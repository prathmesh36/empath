package org.empath.exception;

public class EmpathException extends Exception{
    private String errorCode;

    public EmpathException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}

