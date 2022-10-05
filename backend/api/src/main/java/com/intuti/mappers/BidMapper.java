package com.intuti.mappers;

import com.intuit.models.Bid;
import com.intuti.web.requests.CreateBidRequest;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BidMapper {
    BidMapper INSTANCE = Mappers.getMapper(BidMapper.class);

    Bid createBidRequestToBid(CreateBidRequest request);
}
