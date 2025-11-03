import React, { useState } from "react"
import {
    Checkbox,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import type { ToDoDetailType } from "../types/ToDoTypes.js";
import useUpdateToDoDetail from "../hocks/ToDoDetail/useUpdateToDoDetail.js";

type ToDoDetailProps = {
    detail: ToDoDetailType;
};

const ToDoDetail = (props: ToDoDetailProps) => {
    const todo = {
        id: props.detail.id,
        title: props.detail.name,
        completed_flag: props.detail.completed_flag,
    };

    const [timer, setTimer] = useState<number>(Number.MIN_VALUE);

    const { updateToDoDetailMutate } = useUpdateToDoDetail();
    const eventUpdateDetailTodo = (event: any) => {
        console.log("eventUpdateTodo start");
        if (timer != Number.MIN_VALUE) clearTimeout(timer);
        const newTimer = setTimeout(() => {
            let data: ToDoDetailType = {
                ...todo,
                name: event.target.value,
            };
            updateToDoDetailMutate.mutate(data);
        }, 500);

        setTimer(newTimer);
    }

    return (
        <ListItem
            key={props.detail.id}
            secondaryAction={
                <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton>
                <ListItemIcon>
                    <Checkbox edge="start" />
                </ListItemIcon>
                <TextField
                    variant="standard"
                    margin="dense"
                    defaultValue={props.detail.name}
                    fullWidth
                    onChange={eventUpdateDetailTodo}
                />
            </ListItemButton>
        </ListItem>
    );
};

export default ToDoDetail;