package com.intuti.mappers;

import com.intuit.models.Project;
import com.intuti.web.requests.CreateProjectRequest;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProjectMapper {
    ProjectMapper INSTANCE = Mappers.getMapper(ProjectMapper.class);

    Project createProjectRequestToProject(CreateProjectRequest request);
}
