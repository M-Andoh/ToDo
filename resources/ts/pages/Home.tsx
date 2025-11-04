import Grid from '@mui/material/Grid';
import React from 'react';
import ReactDOM from 'react-dom';
import TodoCard from '../components/ToDo.js';
import Todo from '../components/ToDo.js';
import ToDo from '../components/ToDo.js';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Fab, useThemeProps } from '@mui/material';
import type { ToDoType } from '../types/ToDoTypes.js';
import useGetToDoList from '../hocks/ToDoList/useGetTodoList.js';
import useCurrentToDoList from '../hocks/ToDoList/useCurrentToList.js';
import { Add } from '@mui/icons-material';
import useAddToDo from '../hocks/ToDo/useAddToDo.js';


const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
};

const Home = () => {    /** 追加イベント */
    const { addToDoMutate } = useAddToDo();

    const eventAddDetailTodo = (event: any) => {
        //const queryClient = useQueryClient();
        const todo :ToDoType ={  
        };
        addToDoMutate.mutate(todo);
        //queryClient.invalidateQueries({queryKey:["todo"]});
    }


    const { data, isLoading, error } = useGetToDoList();
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
        <>
            <Grid container spacing={2}>
                {
                    toDoList.map((todo: ToDoType) => {
                        return (
                            <Grid key={todo.id} size={4}>
                                <ToDo key={todo.id} todo={todo} />
                            </Grid>
                        )
                    })
                }
            </Grid>
            <Fab
                color='primary'
                aria-label='add'
                sx={fabStyle}
                onClick={eventAddDetailTodo}
            >
                <Add />
            </Fab>
        </>
    );
}

export default Home;
