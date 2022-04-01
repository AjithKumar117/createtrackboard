
import React, { useState } from 'react';
import AppBaTopNavBarr from '../AppBar/AppBar';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import AddCandidate from '../CandidateForm/AddCandidate';
import KanbanBoard from './KanbanBoard';import { ToastContainer, toast } from 'react-toastify';import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
  flexGrow: {flex: '1'},
  button: {backgroundColor: '#3c52b2',color: '#fff',
    '&:hover': {backgroundColor: '#fff', color: '#fff'}
}})
export default function DashBoard(props){
  const classes = useStyles();
  const [dialogBoxFlag, setdialogBoxFlag] = useState(false);
  const [scroll] = React.useState('paper');
  const [IncomeData,setIncomeData] = React.useState(null);
  const [CandiData,setCandiData] = React.useState(null);
  const [emptyField,setemptyField] = React.useState([]); 
  const [SearchData,setSearchData]  = React.useState("");
  const [valueforSearch,setvalueforSearch]=React.useState([{ fullName: "Ajith",gender: "male",dob:null, address:{doorno:"328",address1:"rice mill street",address2:"",city:"Trichy",state:"Tamil Nadu",zip:"620010"},
  emailID: "ajith@mail.com", PhoneNumber: "11223344", jobDesignation: "Dev", experience: "1.5", currentCTC: "2", expectedCTC: "3.5",
  joinin:"yes" ,skills:"React Js, JavaScript,",qualification:"PG", previousworkDetails:{companyname:"RamTech",position:"software Dev",reasonforleave:"",startdate:null,enddate:null}
}, { fullName: "Kumar",gender: "male",dob:null, address:{doorno:"32/8",address1:"rice mill street",address2:"",city:"Trichy",state:"Tamil Nadu",zip:"620010"},
emailID: "ajith@mail.com", PhoneNumber: "11223344", jobDesignation: "Dev", experience: "1.6", currentCTC: "2", expectedCTC: "3.5",
joinin:"yes" ,skills:"Dev",qualification:"PG", previousworkDetails:{companyname:"RamTech",position:"software Dev",reasonforleave:"",startdate:null,enddate:null}
}]) 
  const validatedata=()=>{
    let arr = [];
    if(!IncomeData.fullName){arr.push("fullName");}
    if(!IncomeData.emailID){arr.push("emailID");}
    if(!IncomeData.PhoneNumber){arr.push("PhoneNumber");}
    return arr;
  }
  const AddCandi = () => {
    let valid = validatedata();
    if(valid.length===0){
    setCandiData(IncomeData);
    valueforSearch.push(IncomeData)
    setdialogBoxFlag(false);
    setemptyField([]);
    }else{setemptyField(valid)}toast.success("New Candidate Added",{autoClose:2000})
  }
  const onCandidatechange=(value)=>{setIncomeData(value)}
  const onsearchdataChange=(value)=>{setSearchData(value);}
  const onDeleteSearchUpdate=(value)=>{
    let result=valueforSearch.filter((ele) => {
      return ele.firstName !== value.firstName;
    }); setvalueforSearch(result);
  }

  return (
    <div> <ToastContainer />
      <AppBaTopNavBarr onsearchChange={onsearchdataChange} searchVal={valueforSearch}/>
      <Button
        variant="contained" className={classes.button}
        onClick={() => { setdialogBoxFlag(true) }}
        style={{marginTop: '15px',marginLeft: '15px',marginBottom: '15px'}}>
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
      <KanbanBoard CandidateData={CandiData} SearchValue={SearchData} onDltSearchUpdate={onDeleteSearchUpdate}/>
    </div>
  );
}

