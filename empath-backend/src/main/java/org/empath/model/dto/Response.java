package org.empath.model.dto;

public class Response<T> {
    private String status;
    private T body;

    public Response() {
    }

    public Response(String status, T body) {
        this.status = status;
        this.body = body;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public T getBody() {
        return body;
    }

    public void setBody(T body) {
        this.body = body;
    }
}
