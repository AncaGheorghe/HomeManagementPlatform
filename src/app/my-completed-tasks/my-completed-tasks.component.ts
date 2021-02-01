import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {TaskModelDto} from "../models/taskModelDto";

declare function require(path: string);
@Component({
  selector: 'app-my-completed-tasks',
  templateUrl: './my-completed-tasks.component.html',
  styleUrls: ['./my-completed-tasks.component.css']
})
export class MyCompletedTasksComponent implements OnInit {

  circleImage = require('src/assets/img/circle.svg').default;
  getTasksUrl = environment.apiBase + '/tasks/completed/current-user';
  listOfTasks: TaskModelDto[];

  constructor(private http: HttpClient) {
    this.listOfTasks = [];
  }

  ngOnInit(): void {
    this.getMyCompletedTasks();
  }

  getMyCompletedTasks(){
    this.http.get(this.getTasksUrl,{}).subscribe(response => {
      this.listOfTasks = response as TaskModelDto[];
      console.log('cevaaaa' + this.listOfTasks);
    });
  }

}
