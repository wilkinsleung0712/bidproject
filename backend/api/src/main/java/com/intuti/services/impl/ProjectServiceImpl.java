package com.intuti.services.impl;

import com.intuit.models.Bid;
import com.intuit.models.Project;
import com.intuti.exceptions.NotFoundException;
import com.intuti.exceptions.ProjectFinalizedException;
import com.intuti.repositories.ProjectRepository;
import com.intuti.services.BidWorker;
import com.intuti.services.ProjectService;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class ProjectServiceImpl implements ProjectService {

    private ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public UUID registerProject(Project project) {
        Project p =
                project.toBuilder()
                        .bidStartDateTime(LocalDateTime.now())
                        .projectStatus(Project.ProjectStatus.ACCEPT_BIDING)
                        .build();
        boolean injectResult = BidWorker.projects.offer(p);

        if (!injectResult) {
            throw new RuntimeException("system not able to create new project");
        }

        return projectRepository.save(p).getProjectId();
    }

    @Override
    public Project getProject(UUID id) {
        Optional<Project> project = projectRepository.findById(id);
        if (project.isEmpty()) {
            throw new NotFoundException("project not exist");
        }

        return project.get();
    }

    @Override
    public List<Project> getProjects() {
        return projectRepository.findAll();
    }

    @Override
    public void registerBidByProjectId(UUID id, Bid bid) {

        Project project = this.getProject(id);

        if (project.getProjectStatus() == Project.ProjectStatus.FINALIZED) {
            throw new ProjectFinalizedException(String.format("project [%s] does not accept any biding", project.getProjectId()));
        }

        Project p = project.toBuilder()
                .bid(
                        bid.toBuilder()
                                .total(
                                        bid.getFixedPrice() != null
                                                ? bid.getFixedPrice()
                                                : bid.getHourlyPrice()
                                                .multiply(
                                                        BigDecimal.valueOf(
                                                                project
                                                                        .getHoursExpected())))
                                .project(project)
                                .build())
                .build();

        var bestBid = p.getBids().stream().max(Comparator.comparing(Bid::getTotal));
        if(bestBid.isPresent()) {
            p = p.toBuilder().bestBid(bestBid.get()).bestBidingPrice(bestBid.get().getTotal()).build();
        }
        projectRepository.save(p);

    }
}
