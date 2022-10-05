package com.intuti.web;

import com.intuit.models.Bid;
import com.intuti.mappers.BidMapper;
import com.intuti.services.ProjectService;
import com.intuti.web.requests.CreateBidRequest;
import java.util.List;
import java.util.UUID;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/projects/{projectId}/bids", produces = MediaType.APPLICATION_JSON_VALUE)
public class BidApi {

    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<Bid>> getBidsByProject(@PathVariable UUID projectId) {
        return ResponseEntity.ok(projectService.getProject(projectId).getBids());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> createBidForProject(
            @PathVariable UUID projectId, @RequestBody CreateBidRequest request) {
        projectService.registerBidByProjectId(
                projectId, BidMapper.INSTANCE.createBidRequestToBid(request));

        return ResponseEntity.noContent().build();
    }
}
