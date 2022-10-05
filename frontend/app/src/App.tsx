import React from 'react';
import './App.css';
import {AddProjectForm, Layout, ProjectsPanel, Container} from "./components";
import {ApplicationContextProvider} from "./contexts/ApplicationContext";
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from "dayjs";

dayjs.extend(relativeTime);
dayjs.extend(utc);
const  App = () =>
    (
        <div className="App">
            <Container>
                <Layout>
                    <ApplicationContextProvider>
                        <AddProjectForm/>
                        <ProjectsPanel/>
                    </ApplicationContextProvider>
                </Layout>
            </Container>

        </div>
    )

export default App;
