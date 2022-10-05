import type {API, Project} from "../types";

const baseUrl:string = 'http://localhost:8080';

const requestHeaders: HeadersInit = new Headers();
requestHeaders.set('Content-Type', 'application/json');

export const RegisterProject = async (params: API.CreateProjectBody): Promise<API.CreateProjectResponse> => {

    const rawResponse = await fetch(baseUrl + '/projects', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: requestHeaders,
        body: JSON.stringify(params)
    });

    return await rawResponse.json();
}

export const GetProjects = async():Promise<Project[]> => {
    const rawResponse = await fetch(baseUrl + '/projects', {
        method: 'GET',
    });

    return await rawResponse.json();
}

export const RegisterBid = async (params: API.RegisterBidBody, projectId: string) : Promise<any> => {
    await fetch(baseUrl + `/projects/${projectId}/bids`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(params)
    });
}