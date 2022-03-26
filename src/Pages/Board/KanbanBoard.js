import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import Button from '@mui/material/Button';
import Confirmation from "../ConfirmationBox/ConfirmationBox";
import DeleteIcon from '@mui/icons-material/Delete';
import Link from '@mui/material/Link';
import { ListItemText } from '@mui/material';

//Default Values for cards
const itemsFromBackend = [
    { id: uuid(), FullName: "Ajith", PhoneNumber: "1111111", EmailID: "Ajith@gmail.com" },
    { id: uuid(), FullName: "Kumar", PhoneNumber: "1111141", EmailID: "Kumar@gmail.com" },
];

//Default Columns
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

    const [columns, setColumns] = useState(columnsFromBackend);
    const [currentData, setcurrentData] = useState(null);
    const [confirmMsg, setconfirmMsg] = useState("");
    const [confirmBoxOpn, setconfirmBoxOpn] = useState(false);
    const [currentClmID, setcurrentClmID] = useState('');
    const [currentIdx, setcurrentIdx] = useState('');

    const onDeleteCard = (columnId, index) => {
        setconfirmBoxOpn(true);
        setconfirmMsg("Are you Sure Want To Delete ?")
        setcurrentClmID(columnId);
        setcurrentIdx(index);
    }

    const onDeleteConfirmaton = () => {
        let updatedData = columns[currentClmID].items.splice(currentIdx, 1);
        setColumns(columns);
        setcurrentData(updatedData);
        setconfirmBoxOpn(false);
    }

    useEffect(() => {
        if (props.CandidateData) {
            let arr = [];
            let candi = props.CandidateData;
            arr = { id: uuid(), FullName: candi.fullName, PhoneNumber: candi.PhoneNumber, EmailID: candi.emailID }
            const AppliedCandidate = columns[1].items;
            AppliedCandidate.push(arr)
            setcurrentData(candi)
        }
    }, [props.CandidateData])

    return (
        <div>
            <Confirmation
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
            <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
                <DragDropContext
                    onDragEnd={result => onDragEnd(result, columns, setColumns)}
                >
                    {Object.entries(columns).map(([columnId, column], index) => {
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
                                                        overflowY: "auto"
                                                    }}
                                                >
                                                    {column.items.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                userSelect: "none",
                                                                                padding: 16,
                                                                                margin: "0 0 8px 0",
                                                                                minHeight: "68px",
                                                                                backgroundColor: snapshot.isDragging
                                                                                    ? "#263B4A"
                                                                                    : "#1976d2",
                                                                                color: "white",
                                                                                ...provided.draggableProps.style
                                                                            }}
                                                                        >
                                                                            <span style={{ fontWeight: "bold", textDecoration: "underline" }}>Name: {item.FullName}</span><br />
                                                                            <span style={{ fontSize: "11px" }}>Phone No: {item.PhoneNumber}</span><br />
                                                                            <span >
                                                                                <ListItemText style={{ marginBottom: "-30px" }} primary={
                                                                                    <Link href={item.EmailID} style={{ color: "white", fontSize: "11px", display: "-webkit-box" }} target="_blank" color="inherit" underline="hover">
                                                                                        Email ID:{item.EmailID.length >= 12 ? item.EmailID.substring(0, 12) + ".." : item.EmailID}
                                                                                    </Link>}
                                                                                /></span><br />
                                                                            <Button onClick={() => onDeleteCard(columnId, index)} style={{
                                                                                color: "white",
                                                                                fontSize: "9.5px",
                                                                                backgroundColor: "grey",
                                                                                marginTop: "-21px",
                                                                                float: "right"
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


