package org.empath.constant;

public enum ErrorCodes {
    ERROR_CODE_1("E001", "Database Error"),
    ERROR_CODE_2("E002", "Record not found"),
    ERROR_CODE_3("E003", "Rest Error"),
    ERROR_CODE_4("E004", "Parsing Error"),
    ERROR_CODE_5("E005", "Duplicate Record Error"),
    ERROR_CODE_6("E006", "Insufficient Inventory"),
    ERROR_CODE_7("E007", "Insufficient Points");

    private final String code;
    private final String message;

    ErrorCodes(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
