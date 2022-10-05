package com.intuti.web;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ApiErrorResponse {

    @JsonProperty("message")
    private String message;

    public ApiErrorResponse(String message) {
        this.message = message;
    }
}
