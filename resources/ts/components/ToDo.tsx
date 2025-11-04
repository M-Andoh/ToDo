import React, { useState } from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    List,
    TextField,
} from "@mui/material";
import { Delete, AddCircle } from '@mui/icons-material';
import ToDoDetail from "./ToDoDetail.js";
import type { ToDoDetailType, ToDoType } from "../types/ToDoTypes.js";
import useUpdateToDo from "../hocks/ToDo/useUpdateToDo.js";
import useDeleteToDo from "../hocks/ToDo/useDeleteToDo.js";
import useAddToDoDetail from "../hocks/ToDoDetail/useAddToDoDetail.js";

type ToDoProps = {
    todo: ToDoType;
};

const ToDo = (props: ToDoProps) => {
    const todo = {
        id: props.todo.id,
        title: props.todo.title,
        to_do_details: props.todo.to_do_details,
    };

    const [timer, setTimer] = useState<number>(Number.MIN_VALUE);

    const { updateToDoMutate } = useUpdateToDo();
    const { deleteToDoMutate } = useDeleteToDo();
    const { addToDoDetailMutate } = useAddToDoDetail();

    /** 名称変更イベント */
    const eventUpdateTodo = (event: any) => {
        if (timer != Number.MIN_VALUE) clearTimeout(timer);
        const newTimer = setTimeout(() => {
            let data: ToDoType = {
                ...todo,
                title: event.target.value,
            };
            updateToDoMutate.mutate(data);
        }, 500);

        setTimer(newTimer);
    }

    /** 削除イベント */
    const eventDeleteDetailTodo = (event: any) => {
        //const queryClient = useQueryClient();
        deleteToDoMutate.mutate(todo);
        //queryClient.invalidateQueries({queryKey:["todo"]});
    }

    /** 追加イベント */
    const eventAddDetailTodo = (event: any) => {
        //const queryClient = useQueryClient();
        const detail :ToDoDetailType ={       
            to_do_id: todo.id,
        };
        addToDoDetailMutate.mutate(detail);
        //queryClient.invalidateQueries({queryKey:["todo"]});
    }

    return (
        <Grid>
            <Card>
                <TextField
                    variant="standard"
                    margin="dense"
                    defaultValue={props.todo.title}
                    fullWidth
                    onChange={eventUpdateTodo}
                />
                <CardContent>
                    <List>
                        {
                            props.todo.to_do_details.map((detail) => {
                                return (<ToDoDetail key={detail.id} detail={detail} />);
                            })
                        }
                    </List>

                </CardContent>

                <CardActions>
                    <IconButton
                        edge="start"
                        aria-label="add"
                        color="primary"
                        onClick={eventAddDetailTodo}>
                        <AddCircle />
                    </IconButton>

                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={eventDeleteDetailTodo}>
                        <Delete />
                    </IconButton>

                </CardActions>
            </Card>
        </Grid>
    );
};

export default ToDo;