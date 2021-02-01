import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth-service/auth.service';

declare function require(path: string);
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  circle = require('src/assets/img/circle.svg').default;
  img1 = require('src/assets/img/home.jpg').default;
  img2 = require('src/assets/img/family.jpg').default;
  img4 = require('src/assets/img/house.jpg').default;
  img3 = require('src/assets/img/home2.png').default;

  constructor(private router: Router, private authenticationService: AuthService) {}

  ngOnInit() {
  }


}

