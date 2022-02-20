import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { GeneralService } from '../services/general.service';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(private router: Router, private service: GeneralService) { }


  ngOnInit(): void {
    this.load_requests();

  }

  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'type', 'actions'];
  dataSource: any;

  load_requests() {
    this.service.load_all_users().subscribe((users: Array<User>) => {
      // console.log(JSON.stringify(users));

      console.log(users);

      this.dataSource = users;



    });
  }

  delete(element: User) {

    this.dataSource = [];

    this.service.delete_user(element.username).subscribe((res: any) => {
      // console.log(JSON.stringify(users));
      console.log(res);


      if (res["msg"] === "ok") {
        console.log(this.dataSource.length);
        for (let i = 0; i < this.dataSource.length; i++) {
          if (element.username === this.dataSource[i].username) {
            this.dataSource.splice(Number(i), 1);
          }
        }

        console.log(this.dataSource);

        this.load_requests();

      }


    });
  }

}
