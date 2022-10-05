package com.intuti.repositories;

import com.intuit.models.Project;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {

    List<Project> findAllByProjectStatus(Project.ProjectStatus projectStatus);
}
