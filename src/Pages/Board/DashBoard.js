
import React, { useState } from 'react';
import AppBaTopNavBarr from '../AppBar/AppBar';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import AddCandidate from '../CandidateForm/AddCandidate';
import KanbanBoard from './KanbanBoard';

const useStyles = makeStyles({
  flexGrow: {
    flex: '1',
  },
  button: {
    backgroundColor: '#3c52b2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#3c52b2',
  },
}})

export default function DashBoard(props){
  const classes = useStyles();
  const [dialogBoxFlag, setdialogBoxFlag] = useState(false);
  const [scroll] = React.useState('paper');
  const [IncomeData,setIncomeData] = React.useState(null);
  const [CandiData,setCandiData] = React.useState(null);

  const AddCandi = () => {
    setCandiData(IncomeData)
    setdialogBoxFlag(false)
  }

  const onCandidatechange=(value)=>{
    setIncomeData(value)
  }

  return (
    <div>
      <AppBaTopNavBarr />
      <Button
        variant="contained"
        onClick={() => { setdialogBoxFlag(true) }}
        style={{
          "margin-top": '15px',
          'margin-left': '15px',
          'margin-bottom': '15px'
        }}
        className={classes.Addbutton}>
        Add Candidate
      </Button>

      <Dialog maxWidth="lg" open={dialogBoxFlag}>
        <DialogContent id="classic-modal-slide-description"
          dividers={scroll === 'paper'}>
          <AddCandidate onCandidatechange={onCandidatechange} openDialog={props.openDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={AddCandi} variant="outlined">Add</Button>
          <Button onClick={() => { setdialogBoxFlag(false) }} variant="outlined">Close</Button>
        </DialogActions>
      </Dialog>
      <KanbanBoard CandidateData={CandiData} />
    </div>
  );
}

