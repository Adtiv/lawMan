import { Component, OnInit} from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {ClientService} from './clients.service';
import {CollapseDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS, DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'Add-Client',
  templateUrl: 'addClient.component.html',
  styleUrls: ['clients.component.css'],
  viewProviders:[BS_VIEW_PROVIDERS],
  directives: [CollapseDirective,MODAL_DIRECTVES,CORE_DIRECTIVES,DATEPICKER_DIRECTIVES]
})
export class AddClientComponent implements OnInit {
  clientService: ClientService;
  name;
  email;
  phoneNumber;
  address;
  //date: Date = new Date();
  public isCollapsed:boolean;
  constructor(clientService: ClientService, af:AngularFire) {
  	this.clientService=clientService;
  	this.isCollapsed = true;
  }
  ngOnInit() {
  }
  openClients(){
  	this.isCollapsed=!this.isCollapsed;
  }
  readFile(){
    var x = (<HTMLInputElement>document.getElementById("xcelFile"));
    //this.spreadsheet.read(x.files, {type:'binary'});
    //this.spreadsheet.read('sample.xlsx');
  }
  addClient(){
    this.clientService.addClient(this.name,this.email,this.phoneNumber,this.address);
    this.isCollapsed=!this.isCollapsed;
    this.name="";
    this.email="";
    this.phoneNumber="";
    this.address="";
  }

}
