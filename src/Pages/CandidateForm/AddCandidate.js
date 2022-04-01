
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl,MenuItem } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import qualificationValue from "./Formhelper"
export default function AddCandidate(props) {

    const [candidateData, setcandidateData] = useState({ 
        fullName: "",gender: "",dob:null, address:{doorno:"",address1:"",address2:"",city:"",state:"",zip:""},
        emailID: "", PhoneNumber: "", jobDesignation: "", experience: "", currentCTC: "", expectedCTC: "",
        joinin:"" ,skills:"",qualification:"", previousworkDetails:{companyname:"",position:"",reasonforleave:"",startdate:null,enddate:null}
    });
    useEffect(() => { props.onCandidatechange(candidateData) });

    const qualificationval = qualificationValue.map((prop, key) => {
        return (
          <MenuItem
            value={prop.value}
          >
            {prop.text}
          </MenuItem>
        );
      });

    return (
        <div>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '55ch' }, }}
                noValidate
                autoComplete="off">
                {
                    props.emptyField.length !== 0 ? (
                        <span style={{
                            color: "#d32f2f",
                            display: "block",
                            marginBottom: "10px"
                        }}>*Please Fill Required Fields</span>
                    ) : <></>
                }
                <FormControl fullWidth={true} size='large'>
                    <TextField
                        id="outlined-basic"
                        fullWidth margin='dense'
                        label="Full Name"
                        required
                        error={props.emptyField.includes("fullName") ? true : false}
                        variant="outlined"
                        value={candidateData.fullName}
                        onChange={(e) => {setcandidateData({ ...candidateData, fullName: e.target.value })}}
                    />
                    <div style={{ marginLeft: "9px" }}>
                        <FormLabel >Gender</FormLabel>
                        <RadioGroup row onChange={(e) => { setcandidateData({ ...candidateData, gender: e.target.value }) }} >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Date of Birth"
                            inputFormat="dd/MM/yyyy"
                            value={candidateData.dob}
                            onChange={(e) => { 
                                setcandidateData({ ...candidateData, dob:e});
                             }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        id="outlined-basic"
                        fullWidth margin='dense'
                        label="Email Address"
                        required
                        error={props.emptyField.includes("emailID") ? true : false}
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
                        required
                        error={props.emptyField.includes("PhoneNumber") ? true : false}
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
                        label="Door no:/Street"
                        required
                        variant="outlined"
                        type="text"
                        value={candidateData.address?.doorno}
                        onChange={(e) => {setcandidateData({...candidateData,address:{...candidateData.address,doorno:e.target.value}})}}
                    />
                    <TextField
                        id="outlined-basic"
                        fullWidth margin='dense'
                        label="Address 1"
                        required
                        variant="outlined"
                        value={candidateData.address?.address1}
                        onChange={(e) => {setcandidateData({...candidateData,address:{...candidateData.address,address1:e.target.value}})}}
                    />
                    <TextField
                        id="outlined-basic"
                        fullWidth margin='dense'
                        label="Address 2"
                        required
                        variant="outlined"
                        value={candidateData.address?.address2}
                        onChange={(e) => {setcandidateData({...candidateData,address:{...candidateData.address,address2:e.target.value}})}}
                    />
                    <TextField
                        id="outlined-basic"
                        fullWidth margin='dense'
                        label="City"
                        required
                        variant="outlined"
                        value={candidateData.address?.city}
                        onChange={(e) => {setcandidateData({...candidateData,address:{...candidateData.address,city:e.target.value}})}}
                    />
                    <TextField
                        id="outlined-basic"
                        fullWidth margin='dense'
                        label="State"
                        required
                        variant="outlined"
                        value={candidateData.address?.state}
                        onChange={(e) => {setcandidateData({...candidateData,address:{...candidateData.address,state:e.target.value}})}}
                    />
                    <TextField
                        id="outlined-basic"
                        fullWidth margin='dense'
                        label="Zip Code"
                        required type="number"
                        variant="outlined"
                        value={candidateData.address?.zip}
                        onChange={(e) => {setcandidateData({...candidateData,address:{...candidateData.address,zip:e.target.value}})}}
                    />
                    <TextField
                        id="outlined-basic"
                        fullWidth margin='dense'
                        label="Job Designation"
                        variant="outlined"
                        value={candidateData.jobDesignation}
                        onChange={(e) => {setcandidateData({ ...candidateData, jobDesignation: e.target.value })}}
                    />
                    <TextField
                        id="outlined-basic"
                        fullWidth margin='dense'
                        label="Work Experience(in Years)"
                        variant="outlined" type="number"
                        value={candidateData.experience}
                        onChange={(e) => {setcandidateData({ ...candidateData, experience: e.target.value})}}
                    />
                    <TextField
                        id="outlined-basic"
                        fullWidth
                        margin='dense'
                        label="Current CTC"
                        variant="outlined" type="number"
                        value={candidateData.currentCTC}
                        onChange={(e) => {setcandidateData({ ...candidateData, currentCTC: e.target.value})}}
                    />
                    <TextField
                        id="outlined-basic"
                        fullWidth
                        margin='dense'
                        label="Expecting CTC"
                        variant="outlined" type="number"
                        value={candidateData.expectedCTC}
                        onChange={(e) => { setcandidateData({ ...candidateData, expectedCTC: e.target.value})}}
                    />
                    <div style={{ marginLeft: "9px" }}>
                        <FormLabel >Ready to join IN 15-30Days ?</FormLabel>
                        <RadioGroup row onChange={(e) => { setcandidateData({ ...candidateData, joinin: e.target.value }) }} >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                    </div>
                    <TextField
                        id="outlined-basic"
                        fullWidth
                        multiline
                        rows={3}
                        margin='dense'
                        label="Skills"
                        variant="outlined"
                        value={candidateData.skills}
                        onChange={(e) => { setcandidateData({ ...candidateData, skills: e.target.value })}}
                    />
                     <TextField
                        id="outlined-basic"
                        fullWidth
                        select
                        margin='dense'
                        label="Qualification"
                        variant="outlined"
                        value={candidateData.qualification}
                        onChange={(e) => {setcandidateData({ ...candidateData, qualification: e.target.value })}}
                    >{qualificationval}</TextField>
                    <span style={{fontWeight:"bold",marginLeft:"8px"}}>Previous Work Details:</span>
                    <TextField
                        id="outlined-basic"
                        fullWidth
                        margin='dense'
                        label="CompanyName"
                        variant="outlined"
                        value={candidateData?.previousworkDetails?.companyname}
                        onChange={(e) => {setcandidateData({...candidateData,previousworkDetails:{...candidateData.previousworkDetails,companyname:e.target.value}})}}
                    />
                    <TextField
                        id="outlined-basic"
                        fullWidth
                        margin='dense'
                        label="Position"
                        variant="outlined"
                        value={candidateData?.previousworkDetails?.position}
                        onChange={(e) => {setcandidateData({...candidateData,previousworkDetails:{...candidateData.previousworkDetails,position:e.target.value}})}}
                    />
                    <TextField
                        id="outlined-basic"
                        fullWidth
                        margin='dense'
                        label="Reason for Leaving"
                        variant="outlined"
                        value={candidateData?.previousworkDetails?.reasonforleave}
                        onChange={(e) => {setcandidateData({...candidateData,previousworkDetails:{...candidateData.previousworkDetails,reasonforleave:e.target.value}})}}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Start Date"
                            inputFormat="dd/MM/yyyy"
                            value={candidateData.previousworkDetails?.startdate}
                            onChange={(e) => { 
                                setcandidateData({...candidateData,previousworkDetails:{...candidateData.previousworkDetails,startdate:e}})
                             }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="End Date"
                            inputFormat="dd/MM/yyyy"
                            minDate={candidateData.previousworkDetails?.startdate}
                            value={candidateData.previousworkDetails?.enddate}
                            onChange={(e) => { 
                                setcandidateData({...candidateData,previousworkDetails:{...candidateData.previousworkDetails,enddate:e}})
                             }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </FormControl>
            </Box>
        </div>
    );
}