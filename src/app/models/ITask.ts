export interface Task {
    title:string,
    description:string
}

export interface TaskResponse {
    id:number,
    title:string,
    description:string,
    completed:boolean,
    created_at: Date,
    updated_at:Date,
}

export interface TaskCreateResponse {
    id:number,
    title:string,
    description:string,
    completed:boolean,
}