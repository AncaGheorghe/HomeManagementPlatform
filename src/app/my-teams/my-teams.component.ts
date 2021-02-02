import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {TaskModelDto} from "../models/taskModelDto";
import {HttpClient} from "@angular/common/http";
import {UserDto} from "../models/user-dto";
import {GroupDto} from "../models/group-dto";
import {TASK_CATEGORY} from "../helpers/app_constants";
import {CreateTaskDto} from "../models/createTaskDto";

declare function require(path: string);

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.css']
})
export class MyTeamsComponent implements OnInit {

  options: string [] = [
    TASK_CATEGORY.SHOPPING,
    TASK_CATEGORY.CLEANING
  ];

  circleImage = require('src/assets/img/circle.svg').default;
  getTasksUrl = environment.apiBase + '/tasks/my-teams';
  deleteTaskUrl = environment.apiBase + '/tasks/';
  filterTask = environment.apiBase + '/tasks/filter';
  editTaskUrl = environment.apiBase + '/tasks/add-edit';
  getUsersUrl = environment.apiBase + '/users';
  getGroupsUrl = environment.apiBase + '/groups';
  listOfTasks: TaskModelDto[];
  errorMessage: string ='';
  config = {};
  config2 = {};
  config3 ={};
  opened: boolean = false;
  selectedUsers: string[];
  selectedGroups: string[];
  userDto: UserDto[];
  usersList: string[];
  dropdownList: string[];
  inputGroupName: string = '';
  whatToDo: string = '';
  groupDto: GroupDto[];
  groupNameList: string[];
  dropdownGroupsList: string[];
  category: string = '';
  id: number = null;
  email: string = '';
  groupId: number = null;
  groupName: string = '';
  createTaskDto: CreateTaskDto;
  usersDtoList: UserDto[];
  groupsDtoList: GroupDto[];
  listForDropdownUsers: string[];
  listForDropdownGroups: string[];
  idForTask: number;

  constructor(private http: HttpClient) {
    this.listOfTasks = [];
    this.selectedUsers = [];
    this.userDto = [];
    this.usersList = [];
    this.dropdownList = [];
    this.groupDto = [];
    this.groupNameList = [];
    this.dropdownGroupsList = [];
    this.selectedGroups = [];
    this.createTaskDto = new CreateTaskDto();
    this.usersDtoList = [];
    this.groupsDtoList = [];
    this.listForDropdownUsers = [];
    this.listForDropdownGroups = [];
  }

  ngOnInit(): void {
    this.getTasks();
    this.getUsers();
    this.getGroups();

    this.config2 = {
      displayKey: "description",
      search: true,
      height: 'auto',
      placeholder: 'Select a Category',
      moreText: 'more',
      noResultsFound: 'No results found!',
      searchPlaceholder: 'Search',
      searchOnKey: 'name'
    };

    this.config3 = {
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };

    this.config = {
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };

  }

  public slideToggleSidebar() {
    this.opened = !this.opened;
  }

  public closeSidebar() {
    this.opened = false;
  }


  takeId(taskId: number){

    const task = this.listOfTasks.find((task) => {
      return task.id === taskId;
    });

    if(task){
      this.idForTask = taskId;
      this.inputGroupName = task.title;
      this.category = task.category;
      this.whatToDo = task.content;

      this.selectedUsers =[];
      for (let i = 0; i < task.users.length; i++){
        this.selectedUsers.push(task.users[i].email);
        console.log("teeest2  " + this.selectedUsers);
        this.listForDropdownUsers = this.selectedUsers;
        console.log("teeest345  " + this.listForDropdownUsers);
      }

      this.selectedGroups = [];
      for (let i = 0; i < task.groups.length; i++){
        this.selectedGroups.push(task.groups[i].name);
        console.log("teeest2  " + this.selectedGroups);
        this.listForDropdownGroups = this.selectedGroups;
        console.log("teeest345  " + this.listForDropdownGroups);
      }
    }
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

  onItemSelect2(item :string){
    this.selectedGroups.push(item);
  }

  onSelectAll2(items: string[]){
    items.forEach((item: string , index: number) =>{
      this.selectedGroups[index] = item;
    });
  }

  onDeSelectAll2(items: string[]){
    this.selectedGroups = [];
  }

  onDeselect2(item: string){
    let index = this.selectedGroups.indexOf(item, 0);
    if(index > -1){
      this.selectedGroups.splice(index, 1);
    }
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

  getGroups(){
    this.http.get(this.getGroupsUrl, {}).subscribe(response =>{
        this.groupDto = response as GroupDto[];
        for(let i = 0; i < this.groupDto.length; i++){
          this.groupNameList.push(this.groupDto[i].name);
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

  editTask(){
    for(let i = 0; i < this.selectedUsers.length; i++){
      this.usersDtoList[i] = new UserDto(this.id, this.email);
      this.usersDtoList[i].email = this.selectedUsers[i];

      const foundUser = this.userDto.find((user) => {
        return user.email === this.selectedUsers[i];
      });

      if(foundUser){
        this.usersDtoList[i].id = foundUser.id;
      }
  }


    for(let i = 0; i < this.selectedGroups.length; i++){
      this.groupsDtoList[i] = new GroupDto(this.groupId, this.groupName);
      this.groupsDtoList[i].name = this.selectedGroups[i];

      const foundGroup = this.groupDto.find((user) => {
        return user.name === this.selectedGroups[i];
      });

      if(foundGroup){
        this.groupsDtoList[i].id = foundGroup.id;
      }

      const usersGroup = this.groupDto.find((group) => {
        return group.name === this.selectedGroups[i];
      });

      if(usersGroup){
        this.groupsDtoList[i].userDtoSet = usersGroup.userDtoSet;
      }
    }

    this.createTaskDto.users = this.usersDtoList;
    this.createTaskDto.groups = this.groupsDtoList;
    this.createTaskDto.title =  this.inputGroupName;
    this.createTaskDto.content = this.whatToDo;
    this.createTaskDto.category  = this.category;
    this.createTaskDto.id = this.idForTask;

    return this.http.post(this.editTaskUrl, this.createTaskDto);}

  submit(){
    this.editTask().subscribe(
      response => {
        console.log('something' + response);
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
      });
  }

  filterTasks(){}

  reloadPage(){
    window.location.reload();
  }

}
