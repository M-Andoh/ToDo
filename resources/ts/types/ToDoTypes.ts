
export type ToDoType = {
    id: number;
    title: string;
    to_do_details: ToDoDetailType[];
};

export type ToDoDetailType ={
    id: number;
    name: string;
    completed_flag: boolean;
}

