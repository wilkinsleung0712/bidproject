package com.intuti.web.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;

import lombok.Builder;

import javax.validation.constraints.NotNull;

@Builder(toBuilder = true)
public record CreateProjectRequest(
        @NotNull(message="work description is required")
        @JsonProperty String workDescription,

        @NotNull(message="hours of work is required")
        @JsonProperty double hoursExpected,

        @NotNull(message="bid finish datetime is required")
        @JsonProperty LocalDateTime bidEndDateTime) {}
