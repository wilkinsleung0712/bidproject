import {createContext} from "react";
import {Project} from "../types";

export const ProjectContext = createContext<Project | null>(null);

