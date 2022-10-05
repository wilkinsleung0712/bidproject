import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";
import {Project} from "../types";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {GetProjects} from "../services";


const defaultApplicationContext: ApplicationState = {
    projects: [],
    setProjects: () => {},
    reload: false,
    setReload: () => {}
};

type ApplicationState = {
    projects: Project[],
    setProjects: (projects: Project[]) => void;
    reload: boolean,
    setReload: (reload:boolean) => void;
};

export const ApplicationContext = createContext<ApplicationState>(defaultApplicationContext)

type ApplicationContextProps = {
    children: ReactJSXElement[]
};

export const ApplicationContextProvider: FC<ApplicationContextProps> = ({
                                                                            children
                                                                        }: ApplicationContextProps) => {

    const [projects, setProjects] = useState<Project[]>([]);
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        const interval = setInterval(() => {
            GetProjects().then(projects => setProjects(projects));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if(reload) {
            GetProjects().then(projects => setProjects(projects));
            setReload(false);
        }
    }, [reload])

    return (
        <ApplicationContext.Provider value={{
            projects,
            setProjects,
            reload,
            setReload
        }}>
            {children}
        </ApplicationContext.Provider>
    )
}

export const useApplicationContext = () => useContext(ApplicationContext);