import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {GroupDto} from "../models/group-dto";
import {UserDto} from "../models/user-dto";
import {environment} from "../../environments/environment";
import {newArray} from "@angular/compiler/src/util";

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

  groupDto: GroupDto;
  groupDto2: GroupDto[];
  userDto: UserDto[];
  getUsersUrl = environment.apiBase + '/users';
  postGroupUrl = environment.apiBase + '/groups/add-edit';
  getGroupsUrl = environment.apiBase + '/groups/current-user';
  deleteGroupUrl = environment.apiBase + '/groups';
  usersList: string[];
  dropdownList: string[];
  selectedUsers: string[];
  usersDtoList: UserDto[];
  manager: string;
  groupName: string;
  errorMessage = '';
  email: string = '';
  id: number = null;
  selectedUsersList: string[];
  groupId: number = null;
  groupNameForConstructor: string = '';
  groupNameList: string[];
  dropdownGroupsList: string[];
  idForGroups: number;
  listForDropdown: string[];
  length: number

  constructor(private http: HttpClient, private router: Router) {
    this.userDto = [];
    this.usersList = [];
    this.dropdownList = [];
    this.selectedUsers = [];
    this.usersDtoList = [];
    this.selectedUsersList = [];
    this.groupDto = new GroupDto(this.groupId, this.groupNameForConstructor);
    this.groupDto2 = [];
    this.groupNameList = [];
    this.dropdownGroupsList = [];
    this.listForDropdown = [];
  }

  ngOnInit(): void {
    this.getUsers();
    this.getGroups();

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

  public slideToggleSidebar() {
    this.opened = !this.opened;
  }

  public closeSidebar(){
    this.opened = false;
  }

  takeId(groupName: string){

    console.log("takeIs" + groupName)
    const group = this.groupDto2.find((group) => {
      return group.name === groupName;
    });

    if(group){
      this.idForGroups = group.id;
      this.groupName = groupName;

      this.selectedUsers = [];
      for (let i = 0; i < group.userDtoSet.length; i++){
        this.selectedUsers.push(group.userDtoSet[i].email);

        if(group.userDtoSet[i].isManager){
          this.manager = group.userDtoSet[i].email;
        }

        console.log("teeest2  " + this.selectedUsers);
        this.listForDropdown = this.selectedUsers;
        console.log("teeest345  " + this.listForDropdown);
      }
    }
  }

  deleteThisGroup(){
    return this.http.delete(this.deleteGroupUrl + '/' + this.idForGroups);
  }

  deleteGroup(){
    this.deleteThisGroup().subscribe(
      response => {
        console.log('something' + response);
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  addGroupForm(){

    const alreadyManagerInUsersList = this.selectedUsers.find((user) => {
      return user === this.manager;
    });

    if(!alreadyManagerInUsersList){
      if(this.manager.length > 0){
        console.log("manager" + this.manager);
        this.selectedUsers.push(this.manager);
      }
    }

    this.selectedUsersList = this.selectedUsers;
    console.log("selected users " + this.selectedUsersList);
    console.log("selected users " + this.selectedUsersList.length);
    for(let i = 0; i < this.selectedUsersList.length; i++){
      console.log ("i" + i)
      this.usersDtoList[i] = new UserDto(this.id, this.email);
      this.usersDtoList[i].email = this.selectedUsersList[i];

      console.log(" this.usersDtoList" +  this.usersDtoList)

      const foundUser = this.userDto.find((user) => {
        return user.email === this.selectedUsersList[i];
      });

      if(foundUser){
        this.usersDtoList[i].id = foundUser.id;
      }

      if(this.selectedUsersList[i] === this.manager){
        this.usersDtoList[i].isManager = true;
      }
      else
        this.usersDtoList[i].isManager = false;
    }

    this.groupDto.userDtoSet = this.usersDtoList;
    this.groupDto.name = this.groupName;
    this.groupDto.id = this.idForGroups;

    if(!alreadyManagerInUsersList){
      if(this.manager.length > 0){
        this.selectedUsers.push(this.manager);
      }
    }

    return this.http.post(this.postGroupUrl, this.groupDto);
  }

  submit(){
    this.addGroupForm().subscribe(
      response => {
        console.log('something' + response);
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  reloadPage(){
    window.location.reload();
  }


  getUsers() {
    this.http.get(this.getUsersUrl, {}).subscribe(response =>{
        this.userDto = response as UserDto[];
        for(let i = 0; i < this.userDto.length; i++){
          this.usersList.push(this.userDto[i].email);
        }
        console.log("ceva" + this.usersList);
        this.dropdownList = this.usersList;
      },
      err => {
        this.errorMessage = err.error.message;
      });
    console.log("teest" + this.dropdownList);
    return this.dropdownList;
  }

  onItemSelect(item :string){
    this.selectedUsers.push(item);
  }

  onSelectAll(items: string[]){
    items.forEach((item: string , index: number) =>{
      this.selectedUsers[index] = item;
    });
  }

  onDeSelectAll(items: string[]){
    this.selectedUsers = [];
  }

  onDeselect(item: string){
    let index = this.selectedUsers.indexOf(item, 0);
    if(index > -1){
      this.selectedUsers.splice(index, 1);
    }
  }

  getGroups(){
    this.http.get(this.getGroupsUrl, {}).subscribe(response =>{
        this.groupDto2 = response as GroupDto[];
        for(let i = 0; i < this.groupDto2.length; i++){
          this.groupNameList.push(this.groupDto2[i].name);
        }
        console.log("ceva" + this.groupNameList);
        this.dropdownGroupsList = this.groupNameList;
      },
      err => {
        this.errorMessage = err.error.message;
      });
    console.log("teest" + this.dropdownGroupsList);
    return this.dropdownGroupsList;
  }
}
