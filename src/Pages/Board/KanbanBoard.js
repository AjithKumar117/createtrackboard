import React, { useState ,useEffect} from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

//Default Values for cards
const itemsFromBackend = [
    { id: uuid(), FullName: "Ajith", PhoneNumber: "1111111" ,EmailID:"ajith@mail.com"},
    { id: uuid(), FullName: "Kumar", PhoneNumber: "1111112" ,EmailID:"kumar@mail.com"},
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
    const [currentData,setcurrentData] = useState(null);

    useEffect(()=>{
        if(props.CandidateData){
            let arr = [];
            let candi = props.CandidateData;
            arr = {id: uuid(), FullName:candi.fullName, PhoneNumber:candi.PhoneNumber,EmailID:candi.emailID}
            const AppliedCandidate = columns[1].items;
            AppliedCandidate.push(arr)
            setcurrentData(candi)
        }
    },[props.CandidateData])

    return (
        <div>
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
                                <h2 style={{ fontSize: "18px" }}>{column.name}</h2>
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
                                                        overflowY:"auto"
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
                                                                            <span style={{fontWeight:"bold",textDecoration:"underline"}}>Name: {item.FullName}</span><br />
                                                                            <span style={{fontSize:"11px"}}>Phone No: {item.PhoneNumber}</span><br />
                                                                            <span style={{fontSize:"11px"}}>Email ID: {item.EmailID}</span>
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


