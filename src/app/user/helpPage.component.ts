import { Component, OnInit} from '@angular/core';
import {UserService} from './user.service';


@Component({
  moduleId: module.id,
  selector: 'help',
  templateUrl: 'helpPage.component.html',
  directives: [],
  viewProviders:[],
  styleUrls: ['userAccount.component.css'],
  providers: [UserService]
})
export class HelpPageComponent implements OnInit {
  UserService;
  password;
  user;
  userService:UserService;
  constructor(userService: UserService) {
  	this.userService = userService;
  }
  ngOnInit() {
  }
}
