package com.intuti.web;

import com.intuti.exceptions.NotFoundException;
import com.intuti.exceptions.ProjectFinalizedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiErrorResponse entityNotFoundExceptionHandler(NotFoundException e) {
        return new ApiErrorResponse(e.getMessage());
    }

    @ExceptionHandler(ProjectFinalizedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrorResponse entityNotFoundExceptionHandler(ProjectFinalizedException e) {
        return new ApiErrorResponse(e.getMessage());
    }
}
