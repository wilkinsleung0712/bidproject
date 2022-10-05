package com.intuti.services;

import com.intuit.models.Bid;
import com.intuit.models.Project;
import java.util.List;
import java.util.UUID;

public interface ProjectService {

    UUID registerProject(Project project);

    Project getProject(UUID id);

    List<Project> getProjects();

    void registerBidByProjectId(UUID id, Bid bid);
}
