import { Component, OnInit } from '@angular/core';

declare function require(path: string);

@Component({
  selector: 'app-my-opened-tasks',
  templateUrl: './my-opened-tasks.component.html',
  styleUrls: ['./my-opened-tasks.component.css']
})
export class MyOpenedTasksComponent implements OnInit {

  circleImage = require('src/assets/img/circle.svg').default;

  constructor() { }

  ngOnInit(): void {
  }

}
