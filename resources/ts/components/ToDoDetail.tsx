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
    const detail = {
        id: props.detail.id,
        to_do_id: props.detail.to_do_id,
        name: props.detail.name,
        completed_flag: props.detail.completed_flag,
    };

    const [timer, setTimer] = useState<number>(Number.MIN_VALUE);

    const { updateToDoDetailMutate } = useUpdateToDoDetail();

    const eventUpdateDetailTodo = (event: any) => {
        if (timer != Number.MIN_VALUE) clearTimeout(timer);
        const newTimer = setTimeout(() => {
            let data: ToDoDetailType = {
                ...detail,
                name: event.target.value,
            };
            updateToDoDetailMutate.mutate(data);
        }, 500);

        setTimer(newTimer);
    }

    const eventCheckDetailTodo = (event: any) => {
        let data: ToDoDetailType = {
            ...detail,
            completed_flag: event.target.checked,
        };
        updateToDoDetailMutate.mutate(data);
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
                    <Checkbox
                        edge="start"
                        checked={props.detail.completed_flag}
                        onChange={eventCheckDetailTodo}/>
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