import React from "react";
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useApplicationContext} from "../contexts/ApplicationContext";
import {BidsPanel} from "./BidsPanel";
import {Project} from "../types";
import {ProjectContext} from "../contexts/ProjectContext";
import DoneIcon from '@mui/icons-material/Done';
import SyncIcon from '@mui/icons-material/Sync';

interface ProjectsPanelProps {

}

export const ProjectsPanel: React.FC<ProjectsPanelProps> = (props) => {

    const {projects} = useApplicationContext();

    const [open, setOpen] = React.useState(false);
    const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <>
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">Work Description</Typography></TableCell>
                                <TableCell align="right"><Typography id="modal-modal-title" variant="h6" component="h2">Hours Expected</Typography></TableCell>
                                <TableCell align="right"><Typography id="modal-modal-title" variant="h6" component="h2">Bids End</Typography></TableCell>
                                <TableCell align="right"><Typography id="modal-modal-title" variant="h6" component="h2">Best Bid</Typography></TableCell>
                                <TableCell align="right"><Typography id="modal-modal-title" variant="h6" component="h2">Status</Typography></TableCell>
                                <TableCell align="right"><Typography id="modal-modal-title" variant="h6" component="h2">Actions</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects.map((project) => (
                                <TableRow
                                    key={project.projectId}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {project.workDescription}
                                    </TableCell>
                                    <TableCell align="right">{project.hoursExpected}</TableCell>
                                    <TableCell align="right">{project.bidEndDateTime}</TableCell>
                                    <TableCell align="right">{project.bestBidingPrice ? `${project.bestBidingPrice}`: 'N/A'}</TableCell>
                                    <TableCell align="right">
                                        {project.projectStatus === "FINALIZED" ? <DoneIcon color={"success"}/> : <SyncIcon color={"warning"} /> }

                                    </TableCell>
                                    <TableCell align="right">
                                        <Button variant={"contained"} onClick={() => {
                                            setSelectedProject(project);
                                            handleOpen()
                                        }} disabled={project.projectStatus === "FINALIZED"}>Add Bids</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <ProjectContext.Provider value={selectedProject}>
                <BidsPanel open={open} handleClose={handleClose} />
            </ProjectContext.Provider>
        </>
    )
}