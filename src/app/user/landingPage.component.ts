import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './user.service';

@Component({
  moduleId: module.id,
  selector: 'Landing-Page',
  templateUrl: 'landingPage.component.html',
  styleUrls: ['login.component.css'],
  providers: [UserService]
})
export class LandingPageComponent implements OnInit {
  UserService;
  router: Router;
  constructor(UserService: UserService, router:Router) {
  	this.UserService = UserService;
    this.router = router;
  }
  ngOnInit() {
  }
}