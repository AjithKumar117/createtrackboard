import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import Button from '@mui/material/Button';
import ConfirmationBox from "../ConfirmationBox/ConfirmationBox";
import DialogBox from "../DialogBox/DialogBox"
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';import 'react-toastify/dist/ReactToastify.css';
const itemsFromBackend = [
    // { id: uuid(), fullName: "Ajith", gender: "male", dob: null, address: { doorno: "328", address1: "rice mill street", address2: "", city: "Trichy", state: "Tamil Nadu", zip: "620010" }, emailID: "yuvan@mail.com", PhoneNumber: "8870871527", jobDesignation: "dev", experience: "3", currentCTC: "2", expectedCTC: "4" }
   { id: uuid(),fullName: "Ajith",gender: "male",dob:null, address:{doorno:"328",address1:"rice mill street",address2:"",city:"Trichy",state:"Tamil Nadu",zip:"620010"},
        emailID: "ajith@mail.com", PhoneNumber: "11223344", jobDesignation: "Dev", experience: "1.5", currentCTC: "2", expectedCTC: "3.5",
        joinin:"yes" ,skills:"Dev",qualification:"PG", previousworkDetails:{companyname:"RamTech",position:"software Dev",reasonforleave:"",startdate:null,enddate:null}
   },{id: uuid(), fullName: "Kumar",gender: "male",dob:null, address:{doorno:"32/8",address1:"rice mill street",address2:"",city:"Trichy",state:"Tamil Nadu",zip:"620010"},
   emailID: "ajith@mail.com", PhoneNumber: "11223344", jobDesignation: "Dev", experience: "1.6", currentCTC: "2", expectedCTC: "3.5",
   joinin:"yes" ,skills:"Dev",qualification:"PG", previousworkDetails:{companyname:"RamTech",position:"software Dev",reasonforleave:"",startdate:null,enddate:null}
   }];
const columnsFromBackend = {
    [1]: {
        name: "Applied Candidates",
        items: itemsFromBackend
    },
    [2]: {
        name: "Test Round",
        items: []
    },
    [3]: {
        name: "Technical Test",
        items: []
    },
    [4]: {
        name: "Selected Candidates",
        items: []
    }
};

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });
    }
};
export default function KanbanBoard(props) {
    let [columns, setColumns] = useState(columnsFromBackend);
    const [confirmMsg, setconfirmMsg] = useState("");
    const [confirmBoxOpn, setconfirmBoxOpn] = useState(false);
    const [currentClmID, setcurrentClmID] = useState('');
    const [currentIdx, setcurrentIdx] = useState('');
    const [Dialogopen, setDialogopen] = useState(false)
    const [DialogContent, setDialogContent] = useState(null);

    const onDeleteCard = (columnId, index) => {
        setconfirmBoxOpn(true);
        setconfirmMsg("Are you Sure Want To Delete ?")
        setcurrentClmID(columnId);
        setcurrentIdx(index);
    }
    const onDeleteConfirmaton = () => {
        props.onDltSearchUpdate(columns[currentClmID].items[currentIdx])
        columns[currentClmID].items.splice(currentIdx, 1);
        setColumns(columns);
        setconfirmBoxOpn(false);    
        toast.warn("Candidate Data Removed",{autoClose:2000})    
    }
    useEffect(() => {
        if (props.CandidateData) {
            let arr = [];
            let candi = props.CandidateData;
            arr = {
                id: uuid(), fullName: candi.fullName, gender: candi.gender, dob: candi.dob, address: candi.address, PhoneNumber: candi.PhoneNumber, emailID: candi.emailID, jobDesignation: candi.jobDesignation, experience: candi.experience, currentCTC: candi.currentCTC, expectedCTC: candi.expectedCTC,
                joinin: candi.joinin, skills: candi.skills, qualification: candi.qualification, previousworkDetails: candi.previousworkDetails
            }
            const AppliedCandidate = columns[1].items;
            AppliedCandidate.push(arr)
            setconfirmMsg(null)
        }
    }, [props.CandidateData, props.SearchValue])


    return (
        <div>
            <ToastContainer />
            <ConfirmationBox
                open={confirmBoxOpn}
                msg={confirmMsg}
                onClose={() => {
                    setconfirmBoxOpn(false);
                    setconfirmMsg("");
                    setcurrentClmID("");
                    setcurrentIdx("");
                }}
                onHandleSubmit={onDeleteConfirmaton}
            />
            <DialogBox
                open={Dialogopen}
                Content={DialogContent}
                onClose={() => {
                    setDialogopen(false);
                    setDialogContent("")
                }}
            />
            <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
                <DragDropContext
                    onDragEnd={result => onDragEnd(result, columns, setColumns)}
                >
                    {Object.entries(columns).map(([columnId, column]) => {
                        return (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}
                                key={columnId}
                            >
                                <span style={{ fontSize: "18px" }}>{column.name}</span>
                                <div style={{ margin: 8 }}>
                                    <Droppable droppableId={columnId} key={columnId}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        background: snapshot.isDraggingOver
                                                            ? "lightblue"
                                                            : "lightgrey",
                                                        padding: 4,
                                                        width: 250,
                                                        height: 500,
                                                        overflowY: "auto",
                                                    }}
                                                >
                                                    {column.items.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}
                                                            >
                                                                {(provide, snapsht) => {
                                                                    return (
                                                                        <div
                                                                            ref={provide.innerRef}
                                                                            {...provide.draggableProps}
                                                                            {...provide.dragHandleProps}
                                                                            style={{
                                                                                userSelect: "none",
                                                                                padding: 16,width:"218px",
                                                                                margin: "0 0 8px 0",
                                                                                minHeight: "68px",
                                                                                backgroundColor: snapsht.isDragging
                                                                                    ? "#263B4A"
                                                                                    : "#1976d2",
                                                                                color: "white",
                                                                                ...provide.draggableProps.style
                                                                            }}
                                                                        >
                                                                            <span style={{ fontWeight: "bold", textDecoration: "underline" }}>Name: {item.fullName}</span><br />
                                                                            <span style={{ fontSize: "11px" }}>Phone No: {item.PhoneNumber}</span><br />
                                                                            <Button
                                                                                onClick={() => {setDialogopen(true); setDialogContent(item);}}
                                                                                style={{
                                                                                    color: "white",fontSize: "11.5px", cursor: "pointer",
                                                                                    opacity: "0.9",textDecoration: "underline",
                                                                                }}
                                                                            >View Details</Button>
                                                                            <Button onClick={() => {onDeleteCard(columnId, index)}} style={{
                                                                                color: "white",
                                                                                fontSize: "9.5px",
                                                                                backgroundColor: "grey",marginLeft: "28px", cursor: "pointer",
                                                                            }}>Delete<DeleteIcon style={{ height: "16px" }} /></Button>
                                                                        </div>
                                                                    );
                                                                }}
                                                            </Draggable>
                                                        );
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            );
                                        }}
                                    </Droppable>
                                </div>
                            </div>
                        );
                    })}
                </DragDropContext>
            </div>
        </div>
    );
}


