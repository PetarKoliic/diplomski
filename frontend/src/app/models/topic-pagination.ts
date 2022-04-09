import { Appraisal } from "./appraisal.model";
import { Topic } from "./topic.model";


export class TopicPagination {

    startIndex: number;
    endIndex: number;
    pageSize: number;
    topics: Topic[] = [];
    show_topics: Topic[] = []


    constructor(startIndex: number = 0, endIndex: number = 1, pageSize: number = 0) {

        this.fill_indexes(startIndex, endIndex, pageSize);
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

  refresh_show_topics()
  {
    this.show_topics = [...this.topics.slice(this.startIndex, this.endIndex)];
  }




}