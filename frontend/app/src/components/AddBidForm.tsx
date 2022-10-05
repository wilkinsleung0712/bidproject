import {Button, TextField} from "@material-ui/core";
import {Checkbox, Divider, FormControlLabel, FormGroup, Stack, Switch} from "@mui/material";
import {useApplicationContext} from "../contexts/ApplicationContext";
import {Controller} from 'react-hook-form';
import WithForm from "../hooks/WithForm";
import {RegisterBid} from "../services";
import React, {useContext, useState} from "react";
import {ProjectContext} from "../contexts/ProjectContext";

interface AddBidFormProps {
    handleClose: () => void
}

export type BidFormState = {
    fixedPrice: number;
    hourlyPrice: number;
};

export const AddBidForm = ({handleClose}: AddBidFormProps) => {

    const {setReload} = useApplicationContext();

    const project = useContext(ProjectContext);

    const [priceMethod, setPriceMethod] = useState<boolean>(true);

    const bidFormDefaultValues: BidFormState = {
        fixedPrice: 0,
        hourlyPrice: 0
    };

    if (!project) {
        return <></>
    }

    const removeEmptyFields = (data: any) => {
        Object.keys(data).forEach(key => {
            if (data[key] === 0) {
                delete data[key];
            }
        });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceMethod(event.target.checked);
    };

    return (
        <WithForm defaultValues={bidFormDefaultValues} onSubmit={(data) => {

            const bid = data as BidFormState;
            removeEmptyFields(bid);

            RegisterBid({
                fixedPrice: bid.fixedPrice,
                hourlyPrice: bid.hourlyPrice
            }, project.projectId).then(r => {
                handleClose();
                setReload(true);
            });
        }}>
            <Stack spacing={3}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked onChange={handleChange}/>} label="Fixed Contract Price" sx={
                        {marginLeft: "-1px"}
                    }/>

                    <Divider variant="middle"/>

                    {priceMethod ?
                    <Controller name="fixedPrice"
                                rules={{
                                    min: {
                                        value: 1,
                                        message: 'Fixed price at minimum $1',
                                    },
                                    max: {
                                        value: 1000,
                                        message: 'Duration of work maximum 1000 hour',
                                    }
                                }}
                        defaultValue={null}
                                render={({field, fieldState}) => (
                                    <TextField type={"number"} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} label="Fixed Price Expected"
                                               helperText={fieldState.error?.message}
                                               {...field}
                                    />
                                )}/> :
                    <Controller name="hourlyPrice"
                        // rules={{required: true}}
                                render={({field, fieldState}) => (
                                    <TextField type={"number"} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} label="Hourly Price Excepted"
                                               helperText={fieldState.error?.message}
                                               {...field}
                                    />
                                )}/>}
                </FormGroup>

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