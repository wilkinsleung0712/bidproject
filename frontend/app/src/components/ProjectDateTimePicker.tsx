import dayjs, {Dayjs} from "dayjs";
import React, {useState} from "react";
import {DateTimePicker, LocalizationProvider, MobileDateTimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {TextField} from "@mui/material";


export const ProjectDateTimePicker = React.forwardRef((props:any, ref) => {
    const [dateWithInitialValue, setDateWithInitialValue] =
        useState<Dayjs | null>(dayjs().utc());



    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                ref={ref}
                value={dateWithInitialValue}
                disablePast={true}
                label="Project bids end datetime"
                // onError={console.log}
                minDate={dayjs().utc()}
                renderInput={(params) => <TextField {...params} />}
                {...props}
            />
        </LocalizationProvider>
    );
});