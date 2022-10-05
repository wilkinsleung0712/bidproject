import {Bid} from "./bid";

export type Project = {
    projectId: string,
    workDescription: string,
    hoursExpected: number,
    bidEndDateTime: string,
    bidStartDateTime: string,
    bids: Bid[],
    projectStatus: ProjectStatus,
    bestBidingPrice: number
}

export enum ProjectStatus {
    ACCEPT_BIDING = 'ACCEPT_BIDING',
    FINALIZED = 'FINALIZED',
}