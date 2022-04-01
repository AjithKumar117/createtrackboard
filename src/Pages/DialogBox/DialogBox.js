import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function DialogBox(props) {
    const { onClose, open,  Content } = props;
    const handleClose = () => {onClose();};

    const dateformat = (date) => {
        if(date){
            let day = date.getDate();
            let month = date.getMonth();
            let year = date.getFullYear();
            let dateFormat = day + '/' + month + '/' + year
            return dateFormat;
        }
    }

    return (
        <div>
            <BootstrapDialog
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Candidate Details
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Full Name:</TableCell><TableCell align="left">{Content?.fullName}</TableCell>
                                </TableRow>
                                <TableRow><TableCell align="left">Gender :</TableCell><TableCell align="left">{Content?.gender}</TableCell></TableRow>
                                <TableRow><TableCell align="left">DOB :</TableCell><TableCell align="left">{dateformat(Content?.dob)}</TableCell></TableRow>
                                <TableRow><TableCell align="left">Door No/Street</TableCell><TableCell align="left">{Content?.address?.doorno}</TableCell></TableRow>
                                <TableRow><TableCell align="left">Address 1:</TableCell><TableCell align="left">{Content?.address?.address1}</TableCell></TableRow>
                                <TableRow><TableCell align="left">Address 2:</TableCell><TableCell align="left">{Content?.address?.address2}</TableCell></TableRow>
                                <TableRow><TableCell align="left">City</TableCell><TableCell align="left">{Content?.address?.city}</TableCell></TableRow>
                                <TableRow><TableCell align="left">State</TableCell><TableCell align="left">{Content?.address?.state}</TableCell></TableRow>
                                <TableRow> <TableCell align="left">Phone Number:</TableCell><TableCell align="left">{Content?.PhoneNumber}</TableCell></TableRow>
                                <TableRow> <TableCell align="left">Email ID:</TableCell><TableCell align="left">{Content?.emailID}</TableCell></TableRow>
                                <TableRow><TableCell align="left">Job Designation:</TableCell><TableCell align="left">{Content?.jobDesignation}</TableCell></TableRow>
                                <TableRow> <TableCell align="left">Experience:</TableCell> <TableCell align="left">{Content?.experience}</TableCell></TableRow>
                                <TableRow> <TableCell align="left">Current CTC:</TableCell><TableCell align="left">{Content?.currentCTC}</TableCell></TableRow>
                                <TableRow> <TableCell align="left">Expecting CTC:</TableCell> <TableCell align="left">{Content?.expectedCTC}</TableCell></TableRow>
                                <TableRow> <TableCell align="left">Ready to join IN 15-30Days ?</TableCell><TableCell align="left">{Content?.joinin}</TableCell></TableRow>
                                <TableRow> <TableCell align="left">Skills:</TableCell> <TableCell align="left">{Content?.skills}</TableCell></TableRow>
                                <TableRow> <TableCell align="left">Qualification:</TableCell><TableCell align="left">{Content?.qualification}</TableCell></TableRow>
                                <TableRow> <TableCell align="left"><span style={{ fontWeight: "bold", marginLeft: "8px", textDecoration: "underline" }}>Previous Work Details:</span></TableCell> <TableCell align="left"></TableCell></TableRow>
                                <TableRow> <TableCell align="left">CompanyName:</TableCell> <TableCell align="left">{Content?.previousworkDetails?.companyname}</TableCell></TableRow>
                                <TableRow> <TableCell align="left">Position:</TableCell> <TableCell align="left">{Content?.previousworkDetails?.position}</TableCell></TableRow>
                                <TableRow> <TableCell align="left">Reason for Leaving:</TableCell> <TableCell align="left">{Content?.previousworkDetails?.reasonforleave}</TableCell></TableRow>
                                <TableRow> <TableCell align="left">Start Date:</TableCell> <TableCell align="left">{dateformat(Content?.previousworkDetails?.startdate)}</TableCell></TableRow>
                                <TableRow> <TableCell align="left">End Date:</TableCell> <TableCell align="left">{dateformat(Content?.previousworkDetails?.enddate)}</TableCell></TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}