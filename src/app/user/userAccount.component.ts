import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/common';
import {UserService} from './user.service';


@Component({
  moduleId: module.id,
  selector: 'userAccount',
  templateUrl: 'userAccount.component.html',
  directives: [],
  viewProviders:[],
  styleUrls: ['userAccount.component.css'],
  providers: [UserService]
})
export class UserAccountComponent implements OnInit {
  UserService;
  password;
  user;
  userService:UserService;
  constructor(userService: UserService, router:Router) {
  	this.userService = userService;
  }
  ngOnInit() {
      this.userService.af.auth.subscribe((auth)=>{
      if(auth!=null){
        this.user=this.userService.user;
      }
      else{
      }
    });
  }
}
