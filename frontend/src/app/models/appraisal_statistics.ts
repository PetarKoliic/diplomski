export class AppraisalStatistics {
    name: string;
    estimated_value: number;
    sold_value: number;



    constructor(name: string, estimated_value: number, sold_value) {
       
        this.name = name;
        this.estimated_value = estimated_value;
        this.sold_value = sold_value;
      }
}