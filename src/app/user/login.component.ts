import { Component, OnInit} from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import {Router} from '@angular/router';
import {NgForm} from '@angular/common';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';
import {UserService} from './user.service';
import {User} from './user';

@Component({
  moduleId: module.id,
  selector: 'Login',
  templateUrl: 'login.component.html',
  directives: [MODAL_DIRECTVES,CORE_DIRECTIVES],
  viewProviders:[BS_VIEW_PROVIDERS],
  styleUrls: ['login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  UserService;
  password;
  model = new User("","","");
  user: User;
  router: Router;
  constructor(UserService: UserService, router:Router) {
  	this.UserService = UserService;
    this.router = router;
  }
  ngOnInit() {
    document.getElementById('clickModal').click();
  }
  navSignUp(){
  	document.getElementById('login').style.visibility="hidden";
  	document.getElementById('login').style.display="none";
  	document.getElementById('login-title').style.visibility="hidden";
  	document.getElementById('login-title').style.display="none";
  	document.getElementById('signUp').style.visibility="visible";
  	document.getElementById('signUp').style.display="initial";
  	document.getElementById('signUp-title').style.visibility="visible";
  	document.getElementById('signUp-title').style.display="initial";
  }
  navLogin(){
  	document.getElementById('login').style.visibility="visible";
  	document.getElementById('login').style.display="initial";
  	document.getElementById('login-title').style.visibility="visible";
  	document.getElementById('login-title').style.display="initial";
  	document.getElementById('signUp').style.visibility="hidden";
  	document.getElementById('signUp').style.display="none";
  	document.getElementById('signUp-title').style.visibility="hidden";
  	document.getElementById('signUp-title').style.display="none";
  }
  onLogOut(){
    this.UserService.logout();
  }
  onSignUp(){
  	this.UserService.createUser(this.model.email,this.password,this.model.fName,this.model.lName);
  }
  onLogin(){
  	this.UserService.loginUser(this.model.email,this.password);
    this.router.navigate(['tasks']);
    console.log("HERE???");
  }
}
