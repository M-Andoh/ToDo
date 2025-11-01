import Grid from '@mui/material/Grid';
import React from 'react';
import ReactDOM from 'react-dom';
import TodoCard from '../components/ToDo.js';
import Todo from '../components/ToDo.js';
import ToDo from '../components/ToDo.js';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useThemeProps } from '@mui/material';
import { type ToDoType } from '../types/ToDoTypes.js';


const getToDoList = async (): Promise<ToDoType[]> => {
    const response = await axios.request<ToDoType[]>({
        url: "/api/todo",
        method: "GET",
    });
    return response.data;
};

const Home = () => {
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery<ToDoType[]>({
        queryKey: ["todo"],
        queryFn: getToDoList,
    }, queryClient);
    if (isLoading) {
        return (<p>Now Loading...</p>);
    }
    if (error instanceof Error) {
        return (<p>エラー: {error.message}</p>);
    }

    const toDoList = queryClient.getQueryData<ToDoType[]>(["todo"]);
    console.log('home:result =');
    console.log(toDoList);
    if (toDoList == undefined) {
        return (<p>undefined...</p>);
    };
    return (
        <Grid container spacing={2}>
            {
                toDoList.map((t) => {
                    return (
                        <Grid size={4}>
                            <ToDo todo={t} />
                        </Grid>
                    )
                })
            }
        </Grid>
    );
}

export default Home;
