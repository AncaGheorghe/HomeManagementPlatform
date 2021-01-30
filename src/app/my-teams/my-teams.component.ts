import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {TaskModelDto} from "../models/taskModelDto";
import {HttpClient} from "@angular/common/http";
import {Task} from "protractor/built/taskScheduler";

declare function require(path: string);

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.css']
})
export class MyTeamsComponent implements OnInit {

  circleImage = require('src/assets/img/circle.svg').default;
  getTasksUrl = environment.apiBase + '/tasks/my-teams';
  deleteTaskUrl = environment.apiBase + '/groups/';
  filterTask = environment.apiBase + '/groups/filter';
  editTaskUrl = environment.apiBase + '/tasks/add-edit';
  listOfTasks: TaskModelDto[];
  errorMessage: string ='';

  constructor(private http: HttpClient) {
    this.listOfTasks = [];
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this.http.get(this.getTasksUrl, {}).subscribe(response => {
      this.listOfTasks = response as TaskModelDto[];
      console.log('tesst'+ response);
      console.log(this.listOfTasks);
    });
  }

  deleteThisTask(id: number){
    return this.http.delete(this.deleteTaskUrl + id);
  }

  deleteTask(id : number){
    this.deleteThisTask(id).subscribe(
      response => {
        console.log('something' + response);
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  filterTasks(){}

  editTask(){}

  reloadPage(){
    window.location.reload();
  }

}
