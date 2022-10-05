package com.intuti.services;

import com.intuit.models.Bid;
import com.intuit.models.Project;
import com.intuti.repositories.ProjectRepository;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.PriorityBlockingQueue;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class BidWorker {
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    private static final Comparator<Project> projectComparator =
            Comparator.comparing(Project::getBidEndDateTime);

    public static final BlockingQueue<Project> projects =
            new PriorityBlockingQueue<>(1, projectComparator);

    private final ProjectRepository projectRepository;

    @Scheduled(fixedRate = 5000)
    public void reportCurrentTime() {
        if (projects.isEmpty()) {
            projects.addAll(
                    projectRepository.findAllByProjectStatus(Project.ProjectStatus.ACCEPT_BIDING));
        }

        List<UUID> projectToFinalized = new ArrayList<>();

        while (!projects.isEmpty()) {
            Project project = projects.peek();

            if (project.getBidEndDateTime().isBefore(LocalDateTime.now())
                    || project.getBidEndDateTime().equals(LocalDateTime.now())) {
                projectToFinalized.add(Objects.requireNonNull(projects.poll()).getProjectId());
                continue;
            }
            break;
        }

        projectToFinalized
                .forEach(
                        projectId -> {
                            var projectOptional = projectRepository.findById(projectId);
                            var project = projectOptional.get();
                            Optional<Bid> bestBidOptional =
                                    project.getBids().stream()
                                            .max(Comparator.comparing(Bid::getTotal));

                            bestBidOptional.ifPresent(
                                    bid ->
                                            log.info(
                                                    "Project with id [{}] is has winning bid of"
                                                            + " [{}]",
                                                    project.getProjectId(),
                                                    bid));

                            projectRepository.save(
                                    project.toBuilder()
                                            .projectStatus(Project.ProjectStatus.FINALIZED)
                                            .bestBid(bestBidOptional.orElse(null))
                                            .build());
                        });
    }
}
