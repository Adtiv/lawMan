import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import {LoginComponent} from '../user/login.component';
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';
@Component({
  moduleId: module.id,
  selector: 'Menu-Bar',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
  directives: [LoginComponent,AlertComponent]
})
export class MenuComponent implements OnInit {
  viewContainerRef:ViewContainerRef
  constructor(viewContainerRef:ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }
  ngOnInit() {
  }
}
