package com.intuti.web.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import lombok.Builder;

@Builder(toBuilder = true)
public record CreateBidRequest(
        @JsonProperty BigDecimal fixedPrice, @JsonProperty BigDecimal hourlyPrice) {}
