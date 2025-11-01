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

const ToDo = (props: ToDoProps) => {
    return (
        <Grid>
            <Card>
                <CardHeader title={props.todo.title} />
                <CardContent>
                    <List>
                        {
                            props.todo.to_do_details.map((value) => {
                                return (<ToDoDetail detail={value} />);
                            })
                        }
                    </List>

                </CardContent>
            </Card>
        </Grid>
    );
};

export default ToDo;