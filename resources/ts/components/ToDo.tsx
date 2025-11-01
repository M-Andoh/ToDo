import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    List,
} from "@mui/material";
import ToDoDetail from "./ToDoDetail.js";
import type { ToDoType } from "../types/ToDoTypes.js";

type ToDoProps = {
    todo: ToDoType;
};

const ToDo:React.FC<ToDoProps> = (props: ToDoProps) => {
    console.log(props.todo);
    return (
        <Grid>
            <Card>
                <CardHeader title={props.todo.title} />
                <CardContent>
                    <List>
                        {
                            props.todo.to_do_details.map((value) => {
                                return (<ToDoDetail
                                    id={value.id}
                                    name={value.name}
                                    completed_flag={value.completed_flag}>

                                </ToDoDetail>);
                            })
                        }
                    </List>

                </CardContent>
            </Card>
        </Grid>

    );
};

export default ToDo;