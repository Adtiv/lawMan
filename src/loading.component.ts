import { Component, ViewContainerRef, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'loading',
  templateUrl: 
  `
    <section><br><br><br>loading..</section>
  `,
  styleUrls: ['loading.component.css'],
  directives: []
})
export class LoadingComponent implements OnInit{
  //private messages:kurve.MessageDataModel[];
  constructor(){
  }
  ngOnInit(){
  }
}
