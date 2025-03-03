
import { Post } from "./post";

export type Thread = {
    id: number;
    title: string;
    content: string;
};

export type ThreadWithPost = {
    threadId:string;
    posts:Post[];
}