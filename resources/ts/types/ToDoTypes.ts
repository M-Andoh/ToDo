
export type ToDoType = {
    id?: number | undefined;
    title?: string | undefined;
    to_do_details?: ToDoDetailType[] | undefined;
};

export type ToDoDetailType = { 
    id?: number | undefined;
    to_do_id?: number | undefined;
    name?: string | undefined;
    completed_flag?: boolean | undefined;
}

