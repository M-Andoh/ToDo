import React from "react"
import {
    Checkbox,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import type { ToDoDetailType } from "../types/ToDoTypes.js";

type ToDoProps = {
    detail: ToDoDetailType;
};

const ToDoDetail = (props: ToDoProps) => {
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
                <ListItemText primary={props.detail.name} />
            </ListItemButton>
        </ListItem>
    );
};

export default ToDoDetail;