import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../services/token-storage/token-storage.service';
import {Router} from '@angular/router';
import {environment} from "../../environments/environment";
import {UserDto} from "../models/user-dto";
import {HttpClient} from "@angular/common/http";

declare function require(path: string);

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logo = require('src/assets/img/logo2.png').default;
  isLoggedIn = false;
  username: string;
  getCurrentUserUrl = environment.apiBase + '/users/current';
  currentUser: UserDto;
  userId: number;
  email: string;

  constructor(private tokenStorageService: TokenStorageService, private router: Router, private http: HttpClient) {
    this.currentUser = new UserDto(this.userId, this.email);
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
    }

    this.getCurrentUser();
  }

  getCurrentUser(){
    this.http.get(this.getCurrentUserUrl, {}).subscribe(response => {
      this.currentUser = response as UserDto;
    });
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('/login');
  }
}
