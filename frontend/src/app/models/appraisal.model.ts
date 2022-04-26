import { Evaluation } from "./evaluation.model";


export class Appraisal {
    _id: string;
    date_added: Date;
    description: string;
    img_names: Array<string>;
    evaluations: Array<Evaluation>;
    name: string;
    country: string;
    date: Date;
    author: string;
    value: number;
    date_created;
    
}