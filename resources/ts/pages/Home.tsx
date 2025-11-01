import Grid from '@mui/material/Grid';
import React from 'react';
import ReactDOM from 'react-dom';
import TodoCard from '../components/ToDo.js';
import Todo from '../components/ToDo.js';
import ToDo from '../components/ToDo.js';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useThemeProps } from '@mui/material';
import type { ToDoType } from '../types/ToDoTypes.js';
import useGetToDoList from '../hocks/TodoList/useGetTodoList.js';
import useCurrentToDoList from '../hocks/TodoList/useCurrentToList.js';


const getToDoList = async (): Promise<ToDoType[]> => {
    const response = await axios.request<ToDoType[]>({
        url: "/api/todo",
        method: "GET",
    });
    return response.data;
};

const Home = () => {
    const { data, isLoading, error }  = useGetToDoList();
    if (isLoading) {
        return (<p>Now Loading...</p>);
    }
    if (error instanceof Error) {
        return (<p>エラー: {error.message}</p>);
    }

    const toDoList = useCurrentToDoList();
    if (toDoList == undefined) {
        return (<p>undefined...</p>);
    };
 
    return (
        <Grid container spacing={2}>
            {
                toDoList.map((todo) => {
                    return (
                        <Grid key={todo.id} size={4}>
                            <ToDo key={todo.id} todo={todo} />
                        </Grid>
                    )
                })
            }
        </Grid>
    );
}

export default Home;
