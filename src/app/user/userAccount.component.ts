import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './user.service';
import kurve = require('kurvejs');


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
  messages:kurve.MessageDataModel[];
  private isAuthenticated:boolean = false;
  msEmail:string;
  msId;
  id;
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
    this.msEmail="";
    this.id = new kurve.Identity("13f08987-43dc-440f-bf5f-9eea83d10f47", "http://localhost:4200/app/user/login.html", 
          {endpointVersion: kurve.EndpointVersion.v1});
    //this.loginMS();
  }
  loginMS() {
      console.log("id"+ this.id);
      this.id.loginAsync().then(_ => {
          this.isAuthenticated = true;
          console.log(this.isAuthenticated);
          const graph = new kurve.Graph(this.id);
          graph.me.GetUser().then(user=>{
            console.log(user);
            this.msEmail=user.displayName;
          })
          graph.me.events.GetEvents().then(events=>{
            console.log(events);
          })
          graph.me.calendarView.GetEvents().then(data=>{
              console.log(data.value);
              data.value.forEach(event=>{
                  console.log(event.subject);
              })
              console.log("HERER");
          });
      });
  }
  logoutMS(){
    this.id.logOut()
  }
}
