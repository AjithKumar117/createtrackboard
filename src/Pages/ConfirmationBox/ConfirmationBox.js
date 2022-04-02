import * as React from 'react'; import Button from '@mui/material/Button'; import Dialog from '@mui/material/Dialog'; import DialogActions from '@mui/material/DialogActions'; import DialogContent from '@mui/material/DialogContent'; import DialogTitle from '@mui/material/DialogTitle';
function ConfirmationBox(props) {
    const { onClose, open, onHandleSubmit, msg } = props; const handleClose = () => {onClose();}; const handleSubmit = (status) => {onHandleSubmit(status);};
    return (
        <div> <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" > <DialogTitle id="alert-dialog-title">{"Confirmation Alert"}</DialogTitle> <DialogContent>{msg}</DialogContent> <DialogActions> <Button onClick={() => { handleSubmit("approval"); }} autoFocus> Okay </Button> <Button onClick={() => { handleClose(); }}>Cancel</Button> </DialogActions> </Dialog> </div>
    );
}

export default ConfirmationBox;
