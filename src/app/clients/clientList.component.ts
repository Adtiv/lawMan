import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable,FirebaseAuth } from 'angularfire2';
import {AddClientComponent} from './addClient.component';
import {ClientService} from './clients.service';
import {UserService} from '../user/user.service';
import { CORE_DIRECTIVES } from '@angular/common';
import {BS_VIEW_PROVIDERS,CollapseDirective, DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {SearchPipe} from "./search.pipe"
//import 'xlsx'; declare let XLSX;
declare let XLSX;

@Component({	
  moduleId: module.id,
  selector: 'Client-List',
  pipes: [SearchPipe],
  templateUrl: 'clientList.component.html',
  styleUrls: ['clients.component.css'],
  viewProviders: [BS_VIEW_PROVIDERS],
  directives: [AddClientComponent,CollapseDirective,CORE_DIRECTIVES]
})
export class ClientListComponent implements OnInit {
	clientService: ClientService;
  	clients: FirebaseListObservable<any[]>;
  	public isCollapsed:boolean;
  	clientKey;
  	clientTasks: FirebaseListObservable<any[]>;  
  	hasTasks:boolean;
  	af;	
  	searchClient;
  	clientList;
  	spreadsheet;
  	localClientKey;
  	updatedClientKey;
  	edit:boolean;
  	name:string;
  	email:string;
  	email2:string;
  	email3:string;
  	phoneNumber;
  	phoneNumber2;
  	phoneNumber3;
  	address:string;
  	address2:string;
	constructor(public auth:FirebaseAuth,af: AngularFire,clientService: ClientService,userService:UserService){
		//this.spreadsheet = XLSX.readFile('test.xlsx');
		this.clientService = clientService;
		this.af=af;
	}
	ngOnInit() {
		this.auth.subscribe((data)=>{
			if(data){
				this.clients =this.clientService.getClients();
			}
		})
		this.searchClient="";
		this.isCollapsed = true;
		this.edit=true;
		this.email2="";
		this.email3="";
		this.phoneNumber2="";
		this.phoneNumber3="";
		this.address2="";
	}
	onKey(event:any){
		this.clientList=this.clientService.getLocalClientList();
		this.searchClient=event.target.value;
		console.log(this.searchClient);
	}
	editToggle(client, isLocal){
		this.edit=!this.edit;
		this.name=client.name;
		this.email=client.email;
		if(client.email2!=null){
			this.email2=client.email2;
		}
		if(client.email3!=null){
			this.email3=client.email3;
		}
		if(client.phoneNumber2!=null){
			this.phoneNumber2=client.phoneNumber2;
		}
		if(client.phoneNumber3!=null){
			this.phoneNumber3=client.phoneNumber3;
		}
		if(client.address2!=null){
			this.address2=client.address2;
		}
		this.phoneNumber=client.phoneNumber;
		this.address=client.address;
		if(!isLocal){
			this.updatedClientKey=client.$key;
		}
		else{
			this.updatedClientKey=client.key;
		}
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}
	getStyle(clientTask){
		if(clientTask.days<=2){
			return "rgba(255,0,0,1)";
		}
		else if(clientTask.days<=5){
			return "rgba(255,255,0,1)";
		}
		else{
			return "rgba(0,255,0,1)";
		}
	}
	updateClient(){
		this.edit=!this.edit;
		this.clientService.updateClient(this.updatedClientKey,this.name,this.email,this.email2,this.email3,this.phoneNumber,this.phoneNumber2,this.phoneNumber3,this.address,this.address2);
	}
	closeEdit(){
		this.edit=!this.edit;
		this.email2="";
		this.email3="";
		this.phoneNumber2="";
		this.phoneNumber3="";
		this.address2="";
	}
	deleteClient(client){
		this.clientService.deleteClient(client.$key);
		return false;
	}
	deleteLocalClient(clientKey){
		this.clientService.deleteClient(clientKey);
		this.searchClient="";
		return false;
	}
	clientDetail(client){
		if(client.$key==this.clientKey){
			return false;
		}
		else{
			//this.isCollapsed=!this.isCollapsed;
			return true;
		}
	}
	localClientDetail(client){
		if(client.key==this.localClientKey){
			return false;
		}
		else{
			//this.isCollapsed=!this.isCollapsed;
			return true;
		}
	}
	activeClient(client){
		if(this.clientKey==client.$key){
			this.clientKey="";
			this.clientTasks=null;
		}
		else{
			this.clientKey=client.$key;
			this.clientTasks=this.af.database.list('clientTasks/'+this.clientKey,{
	            query: {
	              orderByChild: 'days',
	            }
	          });
			this.clientTasks.subscribe((tasks)=>{
				console.log(tasks);
				if(tasks.length>0){
					this.hasTasks=true;
				}
				else{
					this.hasTasks=false;
				}
			})
			console.log(this.clientKey);
		}
		return false;
	}
	activeLocalClient(client){
		if(this.localClientKey==client.key){
			this.localClientKey="";
			this.clientTasks=null;
		}
		else{
			this.localClientKey=client.key;
			this.clientTasks=this.af.database.list('clientTasks/'+this.localClientKey,{
	            query: {
	              orderByChild: 'days',
	            }
	          });
			this.clientTasks.subscribe((tasks)=>{
				if(tasks.length>0){
					this.hasTasks=true;
				}
				else{
					this.hasTasks=false;
				}
			})
			console.log(this.localClientKey);
		}
		return false;		
	}
}
