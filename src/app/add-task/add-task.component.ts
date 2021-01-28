import { Component, OnInit } from '@angular/core';
import {TASK_CATEGORY} from '../helpers/app_constants';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserDto} from '../models/user-dto';
import {GroupDto} from '../models/group-dto';
import {CreateTaskDto} from '../models/createTaskDto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  options: string [] = [
    TASK_CATEGORY.SHOPPING,
    TASK_CATEGORY.CLEANING
  ];

  category: string = '';
  config2 = {};
  config = {};
  config3 = {};
  id: number = null;
  email: string = '';
  groupId: number = null;
  groupName: string = '';
  selectedUsers: string[];
  selectedGroups: string[];
  errorMessage = '';
  userDto: UserDto[];
  usersList: string[];
  dropdownList: string[];
  inputGroupName: string = '';
  whatToDo: string = '';
  groupDto: GroupDto[];
  groupNameList: string[];
  dropdownGroupsList: string[];
  createTaskDto: CreateTaskDto;
  usersDtoList: UserDto[];
  groupsDtoList: GroupDto[];
  usersDtoForGroup: UserDto[];

  getUsersUrl = environment.apiBase + '/users';
  getGroupsUrl = environment.apiBase + '/groups';
  createTaskUrl = environment.apiBase + '/tasks/add-edit';

  constructor(private http: HttpClient, private router: Router) {
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
    this.usersDtoForGroup = [];
  }

  ngOnInit(): void {
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

  createTask(){

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

    return this.http.post(this.createTaskUrl, this.createTaskDto);
  }

  submit(){
    this.createTask().subscribe(
      response => {
        console.log('something' + response);
        this.router.navigate(['/home']);
      },
      err => {
        this.errorMessage = err.error.message;
      });
  }
}
