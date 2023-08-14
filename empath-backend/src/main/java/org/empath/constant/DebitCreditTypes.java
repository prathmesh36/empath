package org.empath.constant;

public enum DebitCreditTypes {
    CREDIT_PURCHASE_HISTORY("CREDIT_PURCHASE_HISTORY"),
    CREDIT_SM_INTERACTION("CREDIT_SM_INTERACTION");

    private final String code;

    DebitCreditTypes(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

}
