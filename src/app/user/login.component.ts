import { Component, OnInit} from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import {Router} from '@angular/router';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';
import {UserService} from './user.service';
import {User} from './user';
import {LandingPageComponent} from './landingPage.component';

@Component({
  moduleId: module.id,
  selector: 'Login',
  templateUrl: 'login.component.html',
  directives: [CORE_DIRECTIVES,LandingPageComponent, MODAL_DIRECTVES],
  viewProviders:[BS_VIEW_PROVIDERS],
  styleUrls: ['login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  UserService;
  password;
  model = new User("","","");
  loginEmail;
  loginPassword;
  user: User;
  router: Router;
  login;
  signUp;
  constructor(UserService: UserService, router:Router) {
  	this.UserService = UserService;
    this.router = router;
  }
  ngOnInit() {
    this.signUp=false;
    this.login=true;
    document.getElementById('clickModal').click();
  }
  navLanding(){
    this.router.navigateByUrl('landingPage');
  }
  navSignUp(){
    this.loginEmail="";
    this.loginPassword="";
    this.signUp=true;
    this.login=false;
  }
  navLogin(){
    this.loginEmail="";
    this.loginPassword="";
    this.signUp=false;
    this.login=true;
  }
  onLogOut(){
    this.UserService.logout();
    this.router.navigateByUrl('landingPage');
  }
  onSignUp(){
  	this.UserService.createUser(this.model.email,this.password,this.model.fName,this.model.lName);
    //this.router.navigateByUrl('tasks');
  }
  onLogin(){
  	this.UserService.loginUser(this.loginEmail,this.loginPassword);
    document.getElementById('closeModal').click();
    //this.router.navigateByUrl('tasks');
  }
}
