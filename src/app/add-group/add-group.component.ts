import { Component, OnInit } from '@angular/core';
import {GroupDto} from '../models/group-dto';
import {UserDto} from '../models/user-dto';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  groupDto: GroupDto;
  userDto: UserDto[];
  getUsersUrl = environment.apiBase + '/users';
  postGroupUrl = environment.apiBase + '/groups/add-edit';
  usersList: string[];
  dropdownList: string[];
  selectedUsers: string[];
  usersDtoList: UserDto[];
  manager: string;
  groupName: string;
  errorMessage = '';
  email: string = '';
  id: number = null;
  config = {};
  config2 = {};
  selectedUsersList: string[];
  groupId: number = null;
  groupNameForConstructor: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.groupDto = new GroupDto(this.groupId, this.groupNameForConstructor);
    this.userDto = [];
    this.usersList = [];
    this.dropdownList = [];
    this.selectedUsers = [];
    this.usersDtoList = [];
    this.selectedUsersList = [];
  }

  ngOnInit() {
    this.getUsers();

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

  addGroupForm(){
    
    const alreadyManagerInUsersList = this.selectedUsers.find((user) => {
      return user === this.manager;
    });

    if(!alreadyManagerInUsersList){
      this.selectedUsers.push(this.manager);
    }

    this.selectedUsersList = this.selectedUsers;
    for(let i = 0; i < this.selectedUsersList.length; i++){
      this.usersDtoList[i] = new UserDto(this.id, this.email);
      this.usersDtoList[i].email = this.selectedUsersList[i];
      

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

    console.log(this.usersDtoList)

    this.groupDto.userDtoSet = this.usersDtoList;
    this.groupDto.name = this.groupName;

    return this.http.post(this.postGroupUrl, this.groupDto);
  }

  submit(){
    this.addGroupForm().subscribe(
      response => {
        console.log('something' + response);
        this.router.navigate(['/myGroups']);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }


  getUsers() {
     this.http.get(this.getUsersUrl, {}).subscribe((response: UserDto[]) =>{
       console.log("userssss", response)
      this.userDto = response;
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
}
