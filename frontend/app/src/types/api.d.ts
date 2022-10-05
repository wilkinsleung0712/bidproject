import {Project} from "./project";

export namespace API {

    type Response<T = undefined> = { data?: T; message?: string; retryAllowed?: boolean };

    //API.CreateProject
    type CreateProjectBody = {};
    type CreateProjectResponse = {};
    type GetProjectsResponse = Response<{ projects: Project[]}>;
    type RegisterBidBody = {}
    type RegisterBidResponse = {}


}