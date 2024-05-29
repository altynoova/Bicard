'use client'
import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import useDoctorStore from '@/store/useDoctorStore';

const hours = Array.from({ length: 24 }, (_, i) => `${i < 10 ? '0' : ''}${i}:00`);

const doctorData = {
    "doctorId": 1,
    "doctorName": "Dr. John Doe",
    "doctorSpecialty": "Cardiology",
    "days": [
        {
            "date": "2024-05-27T00:00:00+06:00",
            "dayOfWeek": "Monday",
            "startTime": "09:30",
            "endTime": "17:00",
            "timeslots": [
                { "Time": "09:30", "Status": "available" },
                { "Time": "10:00", "Status": "available" },
                { "Time": "10:30", "Status": "available" },
                { "Time": "11:00", "Status": "available" },
                { "Time": "11:30", "Status": "available" },
                { "Time": "12:00", "Status": "available" },
                { "Time": "12:30", "Status": "available" },
                { "Time": "13:00", "Status": "available" },
                { "Time": "13:30", "Status": "available" },
                { "Time": "14:00", "Status": "available" },
                { "Time": "14:30", "Status": "available" },
                { "Time": "15:00", "Status": "available" },
                { "Time": "15:30", "Status": "available" },
                { "Time": "16:00", "Status": "available" },
                { "Time": "16:30", "Status": "available" }
            ]
        },
        // Add other days here...
    ]
};

const Scheduler = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDoctor, setSelectedDoctor] = useState(doctorData);
    const [doctorId, setDoctorId] = useState<number | undefined>()
    const { doctors, FetchDoctors } = useDoctorStore()

    const startOfWeekDate = startOfWeek(selectedDate);
    const endOfWeekDate = endOfWeek(selectedDate);
    const daysOfWeek = eachDayOfInterval({ start: startOfWeekDate, end: endOfWeekDate });

    const handleDoctorChange = (event: any) => {
        // Update selectedDoctor with the appropriate data based on event.target.value
        // For simplicity, we're using static data
        setSelectedDoctor(doctorData);
    };

    useEffect(() => { FetchDoctors() }, [])

    useEffect(() => {
        
    }, [doctorId])

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ padding: 3 }}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Button variant="contained" onClick={() => setSelectedDate(new Date())}>Today</Button>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Button variant="contained" onClick={() => setSelectedDate(addDays(selectedDate, -7))}>Back</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={() => setSelectedDate(addDays(selectedDate, 7))}>Next</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">{format(selectedDate, 'dd MMM yyyy')}</Typography>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <InputLabel id="doctor-select-label">Select Doctor</InputLabel>
                            <Select
                                labelId="service-simple-select-label"
                                size="small"
                                value={doctorId}
                                onChange={(event) => setDoctorId(event.target.value as number)}
                                sx={{ width: '200px' }}
                            >
                                <MenuItem disabled value={undefined}>
                                    None
                                </MenuItem>
                                {doctors.map((d) => (
                                    <MenuItem key={d.name} value={d.id}>
                                        {d.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ overflow: 'auto' }}>
                            <Box display="grid" gridTemplateColumns="repeat(8, 1fr)">
                                <Box borderRight="1px solid #e0e0e0" padding={1}>
                                    {hours.map((hour, index) => (
                                        <Typography key={index}>{hour}</Typography>
                                    ))}
                                </Box>
                                {daysOfWeek.map((date, index) => (
                                    <Box key={index} borderRight="1px solid #e0e0e0" padding={1}>
                                        <Typography align="center">{format(date, 'EEE dd/MM')}</Typography>
                                        {hours.map((hour, hourIndex) => {
                                            const timeslot = selectedDoctor.days.find(day => format(new Date(day.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))?.timeslots.find(slot => slot.Time === hour);
                                            return (
                                                <Typography
                                                    key={hourIndex}
                                                    bgcolor={timeslot?.Status === 'available' ? 'lightgreen' : 'lightgray'}
                                                >
                                                    {timeslot ? timeslot.Time : ''}
                                                </Typography>
                                            );
                                        })}
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </LocalizationProvider>
    );
};

export default Scheduler;
