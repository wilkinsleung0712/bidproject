package com.intuit.models;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import javax.persistence.*;
import lombok.*;

@Builder(toBuilder = true)
@ToString
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID projectId;

    @Column(name = "bid_start_datetime")
    private LocalDateTime bidStartDateTime;

    @Column(name = "bid_end_datetime")
    private LocalDateTime bidEndDateTime;

    @OneToMany(
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            mappedBy = "project")
    @ToString.Exclude
    @Singular
    private List<Bid> bids;

    @Column(name = "work_description")
    private String workDescription;

    @Column(name = "hours_expected")
    private double hoursExpected;

    @Enumerated(EnumType.STRING)
    private ProjectStatus projectStatus;

    @OneToOne private Bid bestBid;

    @Column(name = "best_biding_price")
    private BigDecimal bestBidingPrice;

    public enum ProjectStatus {
        FINALIZED,
        ACCEPT_BIDING
    }
}
