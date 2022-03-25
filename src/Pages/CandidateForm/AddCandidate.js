
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';

export default function AddCandidate(props) {

    const [candidateData, setcandidateData] = useState({
        fullName: "",
        emailID: "",
        PhoneNumber: "",
        jobDesignation: "",
        experience: "",
        currentCTC: "",
        expectedCTC: ""
    });

    useEffect(() => {
        props.onCandidatechange(candidateData)
    }, [candidateData])

    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '55ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <FormControl fullWidth={true} size='large'>
                        <TextField
                            id="outlined-basic"
                            fullWidth margin='dense'
                            label="Full Name"
                            variant="outlined"
                            value={candidateData.fullName}
                            onChange={(e) => {
                                setcandidateData({ ...candidateData, fullName: e.target.value })
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            fullWidth margin='dense'
                            label="Email Address"
                            variant="outlined"
                            value={candidateData.emailID}
                            onChange={(e) => {
                                setcandidateData({ ...candidateData, emailID: e.target.value })
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            fullWidth margin='dense'
                            label="Phone Number"
                            variant="outlined"
                            type="number"
                            value={candidateData.PhoneNumber}
                            onChange={(e) => {
                                setcandidateData({ ...candidateData, PhoneNumber: e.target.value })
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            fullWidth margin='dense'
                            label="Job Designation"
                            variant="outlined"
                            value={candidateData.jobDesignation}
                            onChange={(e) => {
                                setcandidateData({ ...candidateData, jobDesignation: e.target.value })
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            fullWidth margin='dense'
                            label="Experience(in Years)"
                            variant="outlined"
                            value={candidateData.experience}
                            onChange={(e) => {
                                setcandidateData({ ...candidateData, experience: e.target.value })
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            fullWidth
                            margin='dense'
                            label="Currently CTC"
                            variant="outlined"
                            value={candidateData.currentCTC}
                            onChange={(e) => {
                                setcandidateData({ ...candidateData, currentCTC: e.target.value })
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            fullWidth
                            margin='dense'
                            label="Expecting CTC"
                            variant="outlined"
                            value={candidateData.expectedCTC}
                            onChange={(e) => {
                                setcandidateData({ ...candidateData, expectedCTC: e.target.value })
                            }}
                        />
                    </FormControl>
                </div>
            </Box>
        </div>
    );
}