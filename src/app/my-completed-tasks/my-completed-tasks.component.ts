import { Component, OnInit } from '@angular/core';

declare function require(path: string);
@Component({
  selector: 'app-my-completed-tasks',
  templateUrl: './my-completed-tasks.component.html',
  styleUrls: ['./my-completed-tasks.component.css']
})
export class MyCompletedTasksComponent implements OnInit {

  circleImage = require('src/assets/img/circle.svg').default;

  constructor() { }

  ngOnInit(): void {
  }

}
