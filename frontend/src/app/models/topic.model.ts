import { Comment } from "./comment.model";

export class Topic{
    
    _id: string;
    username: string;
    comments: Comment[];
    title: string;
    category: string;
    date_added: Date;
    views: number;
    // comments: Comment[];

}









