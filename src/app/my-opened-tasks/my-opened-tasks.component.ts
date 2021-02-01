import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {TaskModelDto} from "../models/taskModelDto";

declare function require(path: string);

@Component({
  selector: 'app-my-opened-tasks',
  templateUrl: './my-opened-tasks.component.html',
  styleUrls: ['./my-opened-tasks.component.css']
})
export class MyOpenedTasksComponent implements OnInit {

  circleImage = require('src/assets/img/circle.svg').default;
  getTasksUrl = environment.apiBase + '/tasks/open/current-user';
  claimTaskUrl = environment.apiBase + '/tasks/claim/';
  submitTaskUrl = environment.apiBase + '/tasks/submit/'
  listOfTasks: TaskModelDto[];
  isClaimed: boolean = false;
  isSubmitted: boolean = false;
  finalList: TaskModelDto[];

  constructor(private http: HttpClient) {
    this.listOfTasks = [];
    this.finalList = [];
  }

  ngOnInit(): void {
    this.getMyOpenedTasks();
    this.showButtons();
  }

  getMyOpenedTasks(){
    this.http.get(this.getTasksUrl, {}).subscribe(response => {
      this.listOfTasks = response as TaskModelDto[];
      this.showButtons();
    });
  }

  showButtons(){
    for(let i = 0; i < this.listOfTasks.length; i++){
      if(this.listOfTasks[i].claimedBy === null){
        this.listOfTasks[i].isClaimed = true;
      }
      else this.listOfTasks[i].isClaimed = false;

      this.finalList.push(this.listOfTasks[i]);
    }
  }

  claimTask(id: number){
   this.http.post(this.claimTaskUrl + id, {}).subscribe(response => {
     console.log('cevaaaaa' + response);
     this.isClaimed = true;
   });
  }

  submitTask(taskId: number){
    this.http.post(this.submitTaskUrl + taskId, {}).subscribe(response =>{
      console.log('test' + response);
      this.isSubmitted = true;
      this.reloadPage();
    });

  }

  reloadPage(){
    window.location.reload();
  }

}
