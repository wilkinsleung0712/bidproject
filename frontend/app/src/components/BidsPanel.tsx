import React, {useContext} from "react";
import {Box, Modal, Switch, Typography} from "@mui/material";
import {AddBidForm} from "./AddBidForm";
import {ProjectContext} from "../contexts/ProjectContext";

interface BidsPanelProps {
    open: boolean
    handleClose: () => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export const BidsPanel: React.FC<BidsPanelProps> = ({open, handleClose}:BidsPanelProps) => {

    const project = useContext(ProjectContext);

    if(!project) {
        return <></>
    }

    return (
        <Modal
            color={"white"}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Project Work Descriptions: {project.workDescription}
                    Project Durations: {project.hoursExpected} hours
                </Typography>

                <AddBidForm handleClose={handleClose}/>
            </Box>
        </Modal>

    )
}