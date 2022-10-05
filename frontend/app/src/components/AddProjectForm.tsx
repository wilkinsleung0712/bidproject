import {Button, TextField} from "@material-ui/core";
import {ProjectDateTimePicker} from "./ProjectDateTimePicker";
import {Stack} from "@mui/material";
import {useApplicationContext} from "../contexts/ApplicationContext";
import {Controller} from 'react-hook-form';
import WithForm from "../hooks/WithForm";
import {RegisterProject} from "../services";
import dayjs, {Dayjs} from "dayjs";

interface AddProjectFormProps {
}

export type ProjectFormState = {
    workDescription: string;
    hoursExpected: number;
    bidEndDateTime: Dayjs
};

export const AddProjectForm = (props: AddProjectFormProps) => {

    const {setReload} = useApplicationContext();

    const projectFormDefaultValues: ProjectFormState = {
        workDescription: "",
        hoursExpected: 1,
        bidEndDateTime: dayjs()
    };

    return (
        <WithForm defaultValues={projectFormDefaultValues} onSubmit={(data) => {
            const project = data as ProjectFormState;

            console.log('project', project);

            RegisterProject({
                workDescription: project.workDescription,
                hoursExpected: project.hoursExpected,
                bidEndDateTime: project.bidEndDateTime.format("YYYY-MM-DDTHH:mm:ss")
            }).then(r => setReload(true));
        }}>
            <Stack spacing={3}>
                <Controller name="workDescription"
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Please enter work description.',
                                }
                            }}
                            render={({field, fieldState}) => (
                                <TextField label="Work Description" multiline
                                           maxRows={4} error={!!fieldState.error}
                                           helperText={fieldState.error?.message}
                                           {...field}
                                />
                            )}/>
                <Controller name="hoursExpected"
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Please enter duration of work expected.',
                                },
                                min: {
                                    value: 1,
                                    message: 'Duration of work minimum 1 hour',
                                },
                                max: {
                                    value: 1000,
                                    message: 'Duration of work maximum 1000 hour',
                                }
                            }}
                            render={({field, fieldState}) => (
                                <TextField type="number" label="Hours Expected" error={!!fieldState.error}
                                           helperText={fieldState.error?.message}
                                           {...field}
                                />
                            )}/>
                <Controller name="bidEndDateTime"
                            render={({field}) => (
                                <ProjectDateTimePicker {...field}/>
                            )}/>


            </Stack>


            <Button
                type="submit"
                size={"large"}
                variant="contained"
                color="primary"
            >
                Add
            </Button>
        </WithForm>)


}