import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    List,
    TextField,
} from "@mui/material";
import ToDoDetail from "./ToDoDetail.js";
import type { ToDoType } from "../types/ToDoTypes.js";
import useUpdateToDo from "../hocks/ToDo/useUpdateToDo.js";

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
            </Card>
        </Grid>
    );
};

export default ToDo;