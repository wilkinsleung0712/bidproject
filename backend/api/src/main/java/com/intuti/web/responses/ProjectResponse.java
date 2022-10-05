package com.intuti.web.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder(toBuilder = true)
public record ProjectResponse(
        @JsonProperty String workDescription,
        @JsonProperty int hoursExpected,
        @JsonProperty LocalDateTime bidEndDateTime) {}
