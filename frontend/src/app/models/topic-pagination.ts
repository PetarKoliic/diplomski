import { allowedNodeEnvironmentFlags } from "process";
import { Appraisal } from "./appraisal.model";
import { Topic } from "./topic.model";


export class TopicPagination {

    startIndex: number;
    endIndex: number;
    pageSize: number;
    topics: Topic[] = [];
    show_topics: Topic[] = [];
    name : string;

    static all_objects: TopicPagination[] = [];

    constructor(name: string, startIndex: number = 0, endIndex: number = 1, pageSize: number = 0) {
        TopicPagination.all_objects.push(this);
        this.fill_indexes(startIndex, endIndex, pageSize);

        this.name = name;
    }

    fill_indexes(startIndex: number, endIndex: number, pageSize: number) {
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.pageSize = pageSize;
    }

    sort(search_topic: string,sort_choosen: string ,up_down_flag:string) {
        console.log(up_down_flag);
        console.log(sort_choosen);
    
        this.topics.sort((a: Topic, b: Topic) => {
    
    
          let flag = up_down_flag === "up" ? 1 : -1;
    
    
          // if (this.sort_choosen === "date_created")
          //   return a.title > b.title ? 1 * flag : -1 * flag;
    
          if (sort_choosen === "title" || sort_choosen === "views" ||
            sort_choosen === "date_added")
            return a[sort_choosen] > b[sort_choosen] ? 1 * flag : -1 * flag;
          else if (sort_choosen === "comments_count")
            return a.comments.length - b.comments.length;
          else // last comment
            return a.comments[a.comments.length - 1].date_added > b.comments[b.comments.length - 1].date_added ? 1 * flag : -1 * flag;
    
        });
    
        TopicPagination.sort_array_criteria(this.show_topics, search_topic, sort_choosen, up_down_flag);
        TopicPagination.sort_array_criteria(this.topics, search_topic, sort_choosen, up_down_flag);
    
        console.log(this.show_topics);
        console.log(this.topics);
    
      }

  static empty_all_topics()
  {
    for(let i = 0; i < TopicPagination.all_objects.length; i++)
    {
      TopicPagination.all_objects[i].topics = [];
      TopicPagination.all_objects[i].show_topics = [];
    }
  }

  static refresh_all_topics(startIndex: number, endIndex: number, pageSize: number)
  {
    for(let i = 0; i < TopicPagination.all_objects.length; i++)
    {
      TopicPagination.all_objects[i].refresh_show_topics(startIndex, endIndex, pageSize);
    }
  }
  static sort_all(search_topic: string, sort_choosen: string, up_down_flag: string)
  {
    for(let i = 0; i < TopicPagination.all_objects.length; i++)
    {
      TopicPagination.all_objects[i].sort(search_topic, sort_choosen, up_down_flag);
    }
  }

  static sort_array_criteria(topics: Topic[], search_topic: string,sort_choosen: string ,up_down_flag:string)
  {
    topics.sort((a: Topic, b: Topic) => {


      let flag = up_down_flag === "up" ? 1 : -1;


      // if (this.sort_choosen === "date_created")
      //   return a.title > b.title ? 1 * flag : -1 * flag;

      if (sort_choosen === "title" || sort_choosen === "views" ||
        sort_choosen === "date_added")
        return a[sort_choosen] > b[sort_choosen] ? 1 * flag : -1 * flag;
      else if (sort_choosen === "comments_count")
        return a.comments.length - b.comments.length;
      else // last comment
        return a.comments[a.comments.length - 1].date_added > b.comments[b.comments.length - 1].date_added ? 1 * flag : -1 * flag;

    });

    console.log(topics);
  }

  refresh_show_topics(startIndex: number, endIndex: number, pageSize: number)
  {

    // console.log("prenete vrednosti");
    // console.log(startIndex + " : " + endIndex);
    this.fill_indexes(startIndex, endIndex, pageSize);


    this.show_topics = [...this.topics.slice(this.startIndex, this.endIndex)];

    // console.log("pocetak kraj : " + this.startIndex + " kraj :" + this.endIndex);

    console.log(this.topics.slice(this.startIndex, this.endIndex));
  }




}