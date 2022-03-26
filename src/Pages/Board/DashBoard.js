
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
  const [emptyField,setemptyField] = React.useState([]); 

  const validatedata=(IncomeData)=>{
    let arr = [];
    if(!IncomeData.fullName){
      arr.push("fullName");
    }
    if(!IncomeData.emailID){
      arr.push("emailID");
    }
    if(!IncomeData.PhoneNumber){
      arr.push("PhoneNumber")
    }
    return arr;
  }

  const AddCandi = () => {
    let valid = validatedata(IncomeData);
    if(valid.length===0){
    setCandiData(IncomeData);
    setdialogBoxFlag(false);
    setemptyField([]);
    }else{
      setemptyField(valid)
    }
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
          marginTop: '15px',
          marginLeft: '15px',
          marginBottom: '15px'
        }}
        className={classes.Addbutton}>
        Add Candidate
      </Button>

      <Dialog maxWidth="lg" open={dialogBoxFlag}>
        <DialogContent id="classic-modal-slide-description"
          dividers={scroll === 'paper'}>
          <AddCandidate onCandidatechange={onCandidatechange} openDialog={props.openDialog} emptyField={emptyField} />
        </DialogContent>
        <DialogActions>
          <Button onClick={AddCandi} variant="outlined">Add</Button>
          <Button onClick={() => { setdialogBoxFlag(false);setemptyField([]); }} variant="outlined">Close</Button>
        </DialogActions>
      </Dialog>
      <KanbanBoard CandidateData={CandiData} />
    </div>
  );
}

