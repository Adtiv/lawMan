import { Component, OnInit} from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import {Router} from '@angular/router';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {ClientService} from './clients.service';
import {CollapseDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {BS_VIEW_PROVIDERS, DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Observable} from 'rxjs';
import {Dialog} from 'primeng/primeng';
import 'rxjs/add/operator/map';
declare let XLSX;

@Component({
  moduleId: module.id,
  selector: 'Add-Client',
  templateUrl: 'addClient.component.html',
  styleUrls: ['clients.component.css'],
  viewProviders:[BS_VIEW_PROVIDERS],
  directives: [CollapseDirective,CORE_DIRECTIVES,DATEPICKER_DIRECTIVES,Dialog]
})
export class AddClientComponent implements OnInit {
  clientService: ClientService;
  name:string;
  email:string;
  email2:string;
  email3:string;
  phoneNumber:string;
  phoneNumber2:string;
  phoneNumber3:string;
  address:string;
  address2:string;
  fileName:string;
  file;
  display:boolean;
  fileError:boolean;
  emailText:boolean;
  phoneText:boolean;
  addressText:boolean;
  emailCount:number;
  public isCollapsed:boolean;
  phoneCount:number;
  addressCount:number;
  constructor(clientService: ClientService, af:AngularFire,private router:Router) {
  	this.clientService=clientService;
  }
  ngOnInit() {
    this.emailCount=1;
    this.phoneCount=1;
    this.addressCount=1;
    this.emailText=false;
    this.phoneText=false;
    this.addressText=false;
    this.display=false;
    this.fileName='';
    this.isCollapsed = true;
    this.fileError=false;
  }
  openClients(){
  	this.isCollapsed=!this.isCollapsed;
  }
  showDialog() {
    console.log("HERE");
    this.display = true;
  }
  endDialog(){
    console.log("Not here");
    this.display=false;
  }
  navHelp(){
    this.router.navigateByUrl('help');
  }
  readFile(){
    this.fileError=false;
    var x = (<HTMLInputElement>document.getElementById("xcelFile")).files;
    console.log(x[0].type);
    if(x[0].name.substring(x[0].name.length-5,x[0].name.length)=='.xlsx'){
      this.file=x[0];
      this.fileName=this.file.name;
      this.fileError=false;
    }
    else{
      this.fileError=true;
    }
  }
  submitList(){
    if(this.file!=null){
      var fileURL = window.URL.createObjectURL(this.file);
      console.log("file " + fileURL);
      /* set up XMLHttpRequest */
      var oReq = new XMLHttpRequest();
      oReq.open("GET", fileURL, true);
      oReq.responseType = "arraybuffer";
      var cliServiceRef=this.clientService;
      var addClientList=function(name,email,phoneNumber,address){
         cliServiceRef.addClient(name,email,phoneNumber,address);
      }
      oReq.onload = function(e) {
        var arraybuffer = oReq.response;
        /* convert data to binary string */
        var data = new Uint8Array(arraybuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        /* Call XLSX */
        var workbook = XLSX.read(bstr, {type:"binary"});
        var sheet_name_list = workbook.SheetNames;
        sheet_name_list.forEach(function(y) { /* iterate through sheets */
          var worksheet = workbook.Sheets[y];
          var row;
          var rowCap;
          var name;
          var email;
          var phoneNumber;
          var address;
          for (var z in worksheet) {
            /* all keys that do not begin with "!" correspond to cell addresses */
            if(z[0] === '!') continue;
              row=parseInt(z.substring(1,z.length));
              if(row==rowCap){
                console.log("NEW ROW");
                addClientList(name,email,phoneNumber,address);
                //this.clientService.addClient(name,email,phoneNumber,address);
              }
              rowCap=parseInt(z.substring(1,z.length))+1;
              if(z.substring(0,1)=='A'){
                console.log("name");
                name=JSON.stringify(worksheet[z].v).substring(1,JSON.stringify(worksheet[z].v).length-1);
                console.log(name);
              }
              if(z.substring(0,1)=='B'){
                console.log("email");
                email=JSON.stringify(worksheet[z].v).substring(1,JSON.stringify(worksheet[z].v).length-1);
                console.log(email);
              }
              if(z.substring(0,1)=='D'){
                console.log("phoneNumber");            
                phoneNumber=JSON.stringify(worksheet[z].v);
                console.log(phoneNumber);
              }
              if(z.substring(0,1)=='F'){
                console.log("address");
                address=JSON.stringify(worksheet[z].v).substring(1,JSON.stringify(worksheet[z].v).length-1);
                console.log(address);
              }
            console.log(z.substring(1,z.length) + "=" + JSON.stringify(worksheet[z].v ));
          }
        });
      }

      oReq.send();
    }
    this.file=null;
    this.isCollapsed=true;
  }
  addClientList(name,email,phonenumber,address){
    this.clientService.addClient(name,email,phonenumber,address);
  }
  addClient(){
    this.clientService.addClient(this.name,this.email,this.phoneNumber,this.address);
    this.isCollapsed=!this.isCollapsed;
    this.name="";
    this.email="";
    this.phoneNumber="";
    this.address="";
  }
  emailTextToggle(state){
    if(state=='enter'){
      this.emailText=true;
    }
    else{
      this.emailText=false;
    }
  }
  phoneTextToggle(state){
    if(state=='enter'){
      this.phoneText=true;
    }
    else{
      this.phoneText=false;
    }
  }
  addressTextToggle(state){
    if(state=='enter'){
      this.addressText=true;
    }
    else{
      this.addressText=false;
    }
  }
  addEmail(){
    if(this.emailCount<3){
      this.emailCount++;
    }
  }
  collapseEmail(){
    this.emailCount=1;
  }
  addPhoneNumber(){
    if(this.phoneCount<3){
      this.phoneCount++;
    }
  }
  collapsePhone(){
    this.phoneCount=1;
  }
  addAddress(){
    if(this.addressCount<3){
      this.addressCount++;
    }
  }
  collapseAddress(){
    this.addressCount=1;
  }
}
