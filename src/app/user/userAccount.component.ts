import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './user.service';
import kurve = require('kurvejs');
import {Observable} from 'rxjs';
import {CalendarService} from '../calendar/calendar.service';

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
  constructor(userService: UserService, router:Router,private calendar:CalendarService) {
  	this.userService = userService;
    this.id = new kurve.Identity("13f08987-43dc-440f-bf5f-9eea83d10f47", "http://localhost:4200/vendor/kurvejs/dist/login.html", 
          {endpointVersion: kurve.EndpointVersion.v1});
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
    //this.id = new kurve.Identity("13f08987-43dc-440f-bf5f-9eea83d10f47", "http://localhost:4200/app/user/login.html", 
          //{endpointVersion: kurve.EndpointVersion.v1});
    //this.id = new kurve.Identity("13f08987-43dc-440f-bf5f-9eea83d10f47", "https://lawyermanagementsys-2df1f.firebaseapp.com/app/user/login.html", 
          //{endpointVersion: kurve.EndpointVersion.v1});
    //this.loginMS();
  }
  loginMS() {
      const idTest = new kurve.Identity("13f08987-43dc-440f-bf5f-9eea83d10f47", "http://localhost:4200/vendor/kurvejs/dist/login.html", 
                {endpointVersion: kurve.EndpointVersion.v1});
      this.id.loginAsync().then(_ => {
          //console.log(this.id.getAccessTokenAsync());
          this.id.getAccessTokenAsync().then(token=>{
            console.log(token);
          })
          //console.log("token"+ this.id.clientId());
          console.log("id"+ this.id.isLoggedIn());
          this.isAuthenticated = true;
          console.log(this.isAuthenticated);
          const graph = new kurve.Graph(this.id);
          graph.me.GetUser().then(user=>{
            console.log(user.mail);
            this.msEmail=user.displayName;
          })
          graph.me.events.GetEvents().then(events=>{
            console.log(events);
            events.value.forEach(event=>{
              event.title=event.subject;
              event.start=event.start.dateTime;
              event.end=event.end.dateTime;
              console.log(event.subject);
            })
            this.calendar.setMSevents(events.value);
          })
      });
  }
  logoutMS(){
    this.id.logOut()
  }
}
