package com.intuti.web;

import com.intuit.models.Project;
import com.intuti.mappers.ProjectMapper;
import com.intuti.services.ProjectService;
import com.intuti.web.requests.CreateProjectRequest;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/projects", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
@RequiredArgsConstructor
public class ProjectApi {

    private final ProjectService projectService;

    @GetMapping
    public List<Project> getProjects(
            @RequestParam(name = "status", required = false) Project.ProjectStatus status) {
        List<Project> projects = projectService.getProjects();
        return status == null
                ? projects
                : projects.stream()
                        .filter(project -> project.getProjectStatus() == status)
                        .toList();
    }

    @GetMapping("/{projectId}")
    public Project getProject(@PathVariable UUID projectId) {
        return projectService.getProject(projectId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UUID createProject(@RequestBody @Valid CreateProjectRequest request) {
        return projectService.registerProject(
                ProjectMapper.INSTANCE.createProjectRequestToProject(request));
    }
}
