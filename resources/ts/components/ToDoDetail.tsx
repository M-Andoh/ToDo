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
import useDeleteToDoDetail from "../hocks/ToDoDetail/useDeleteToDoDetail.js";
import { useQueryClient } from "@tanstack/react-query";

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
    const { deleteToDoDetailMutate } = useDeleteToDoDetail();

    /** 名称変更イベント */
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

    /** 　チェックボックス変更イベント */
    const eventCheckDetailTodo = (event: any) => {
        let data: ToDoDetailType = {
            ...detail,
            completed_flag: event.target.checked,
        };
        updateToDoDetailMutate.mutate(data);
    }

    /** 削除イベント */
    const eventDeleteDetailTodo = (event: any) => {
        //const queryClient = useQueryClient();
        deleteToDoDetailMutate.mutate(detail);
        //queryClient.invalidateQueries({queryKey:["todo"]});
    }
    
    return (
        <ListItem
            key={props.detail.id}
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={eventDeleteDetailTodo}>
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
                        onChange={eventCheckDetailTodo} />
                </ListItemIcon>
                <TextField
                    variant="standard"
                    margin="dense"
                    defaultValue={
                        props.detail.name
                    }
                    placeholder="新規項目"
                    fullWidth
                    onChange={eventUpdateDetailTodo}
                />
            </ListItemButton>
        </ListItem>
    );
};

export default ToDoDetail;