import { Component, ViewContainerRef, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Router} from '@angular/router';
import {AngularFire, FirebaseListObservable,AngularFireAuth } from 'angularfire2';
import {AlertComponent, DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {MenuComponent} from './menu/menu.component';
import {TaskListComponent} from './tasks/taskList.component';
import {ClientListComponent} from './clients/clientList.component';
import {LoginComponent} from './user/login.component';
import {UserService} from './user/user.service';
import {Schedule} from 'primeng/primeng';
import {appRoutes} from './app.routes'

import kurve = require('kurvejs');
//import xlsx = require('xlsx');

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES,Schedule,AlertComponent, DATEPICKER_DIRECTIVES,MenuComponent,TaskListComponent,LoginComponent,ClientListComponent]
})
export class AppComponent implements OnInit{
  viewContainerRef:ViewContainerRef;
  userService:UserService;
  userState;
  userEmail;
  user;
  //private messages:kurve.MessageDataModel[];
  constructor(private router:Router,af: AngularFire,
              viewContainerRef:ViewContainerRef,
              userService:UserService){
    this.viewContainerRef = viewContainerRef;
    this.userService=userService;
  }
  ngOnInit(){
    this.userService.af.auth.subscribe((auth)=>{
      if(auth!=null){
        console.log(this.userService.uid);
        this.userState=true;
        this.user=this.userService.user;
        console.log(this.user);
        document.getElementById('loginButton').style.visibility='hidden';
        document.getElementById('loginButton').style.display='none';
        document.getElementById('userButton').style.visibility='visible';
        document.getElementById('userButton').style.display='initial';
        document.getElementById('navComponents').style.visibility='visible';
        document.getElementById('navComponents').style.display='initial'; 
      }
      else{
        console.log("not Logged in");
        this.userState=false;
        document.getElementById('userButton').style.visibility='hidden';
        document.getElementById('userButton').style.display='none';
        document.getElementById('navComponents').style.visibility='hidden';
        document.getElementById('navComponents').style.display='none';        
      }
    });
  }
  logOut(){
    this.userService.logout();
    this.userState=false;
    document.getElementById('loginButton').style.visibility='visible';
    document.getElementById('loginButton').style.display='initial';
    document.getElementById('userButton').style.visibility='hidden';
    document.getElementById('userButton').style.display='none';
    this.router.navigateByUrl('landingPage');
  }
}
