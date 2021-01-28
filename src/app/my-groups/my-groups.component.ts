import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

declare function require(path: string);

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.css']
})
export class MyGroupsComponent implements OnInit {

  circleImage = require('src/assets/img/circle.svg').default;
  opened: boolean = false;
  config = {};
  config2 = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.config = {
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };

    this.config2 = {
      displayKey: "description",
      search: true,
      height: 'auto',
      placeholder: 'Select a Manager',
      moreText: 'more',
      noResultsFound: 'No results found!',
      searchPlaceholder: 'Search',
      searchOnKey: 'name'
    };
  }

  public toggleSidebar() {
    this.opened = !this.opened;
  }
}
