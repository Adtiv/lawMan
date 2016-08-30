import {Injectable, OnInit} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {UserService} from '../user/user.service';
import {FirebaseAuth} from 'angularfire2';
import * as moment from 'moment';
let now = moment().format('LLLL');

@Injectable()
export class ClientService implements OnInit{
    clients: FirebaseListObservable<any[]>;
    client: FirebaseObjectObservable<any[]>;
    af: AngularFire;
    clientKey;
    userService: UserService;
    userId;
    clientList: Client[];
    initLocalClient:boolean;
    constructor(af: AngularFire,userService: UserService){
      this.af=af;
      this.userService=userService;
      this.clientList=[];
      this.initLocalClient=true;
      this.userService.af.auth.subscribe((auth)=>{
        if(auth!=null){
            this.userId=this.userService.uid;
            this.setClients();
          }
        else{
          this.clients=null;
        }
      });
    }
    ngOnInit(){}
    setClients(){
      this.clients = this.af.database.list('clients/'+this.userId, { preserveSnapshot: true });
      this.clientList = [];
      this.af.database.list('clients/'+this.userId,{
            query: {
              orderByChild: 'name',
            }
          }).subscribe(snapshots => {
              snapshots.forEach(snapshot => {
               if(this.initLocalClient){

                 this.setLocalClients(snapshot.$key,snapshot.name,snapshot.email,snapshot.email2,snapshot.email3,snapshot.phoneNumber,snapshot.phoneNumber2,snapshot.phoneNumber3,snapshot.address,snapshot.address2);
              }
        })
        this.initLocalClient=false;  
      })
    }
    setLocalClients(key,name,email,email2,email3,phoneNumber,phoneNumber2,phoneNumber3,address,address2){
      if(email2==null){
        email2="";
      }
      if(email3==null){
        email3="";
      }
      if(phoneNumber2==null){
        phoneNumber2="";
      }
      if(phoneNumber3==null){
        phoneNumber3="";
      }
      if(address2==null){
        address2="";
      }
      this.clientList.push(new Client(key,name,email,email2,email3,phoneNumber,phoneNumber2,phoneNumber3,address,address2));
    }
    getClients(){
      if(this.userId!=null){
        this.clients = this.af.database.list('clients/'+this.userId,{
            query: {
              orderByChild: 'name',
            }
          });
        return this.clients;
      }
    }
    getLocalClientList(){
      return this.clientList;
    }
    addClient(name, email,email2,email3,phoneNumber,phoneNumber2,phoneNumber3,address,address2){
      console.log(name+"   "+email+" "+phoneNumber+" " +address);
      this.clients=this.af.database.list('clients/'+this.userService.uid);
      this.clientKey = this.clients.push({uid:this.userService.uid,name:name,email:email,phoneNumber:phoneNumber}).key;
      if(email2!=""){
        this.af.database.object('clients/'+this.userService.uid+'/'+this.clientKey).update({email2:email2});
      }
      if(email3!=""){
        this.af.database.object('clients/'+this.userService.uid+'/'+this.clientKey).update({email3:email3});
      }
      if(phoneNumber2!=""){
        this.af.database.object('clients/'+this.userService.uid+'/'+this.clientKey).update({phoneNumber2:phoneNumber2});        
      }
      if(phoneNumber3!=""){
        this.af.database.object('clients/'+this.userService.uid+'/'+this.clientKey).update({phoneNumber3:phoneNumber3});                
      }
      if(address!=""){
        this.af.database.object('clients/'+this.userService.uid+'/'+this.clientKey).update({address2:address2});                        
      }
      if(address2!=""){
        this.af.database.object('clients/'+this.userService.uid+'/'+this.clientKey).update({address2:address2});                        
      }
      this.addSortLocalClientArray(new Client(this.clientKey,name,email,email2,email3,phoneNumber,phoneNumber2,phoneNumber3,address,address2));
    }
    addSortLocalClientArray(client){
      this.clientList.push(client);
      this.clientList.sort(function(a,b){
        var alc = a.name.toLowerCase(), blc = b.name.toLowerCase();
        return alc > blc ? 1 : alc < blc ? -1 : a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
      });
    }
    updateSortLocalClient(key,name,email,email2,email3,phoneNumber,phoneNumber2,phoneNumber3,address,address2){
      for(let i=0;i<this.clientList.length;i++){
        if(this.clientList[i].key==key){
          this.clientList[i].name=name;
          this.clientList[i].email=email;
          this.clientList[i].phoneNumber=phoneNumber;
          this.clientList[i].address=address;
          this.clientList[i].email2=email2;
          this.clientList[i].email3=email3;
          this.clientList[i].phoneNumber2=phoneNumber2;
          this.clientList[i].phoneNumber3=phoneNumber3;
          this.clientList[i].address2=address2;
        }
      }
      this.clientList.sort(function(a,b){
        var alc = a.name.toLowerCase(), blc = b.name.toLowerCase();
        return alc > blc ? 1 : alc < blc ? -1 : a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
      });
    }
    deleteLocalClient(clientKey){
      for(let i=0;i<this.clientList.length;i++){
        if(this.clientList[i].key==clientKey){
          this.clientList.splice(i,1);
        }
      }
    }
    updateClient(clientKey,name,email,email2,email3,phoneNumber,phoneNumber2,phoneNumber3,address,address2){
      this.client=this.af.database.object('clients/'+this.userService.uid+'/'+clientKey);
      this.client.update({name:name,email:email,phoneNumber:phoneNumber,address:address});
      if(email2!=""){
        this.af.database.object('clients/'+this.userService.uid+'/'+clientKey).update({email2:email2});
      }
      if(email3!=""){
        this.af.database.object('clients/'+this.userService.uid+'/'+clientKey).update({email3:email3});
      }
      if(phoneNumber2!=""){
        this.af.database.object('clients/'+this.userService.uid+'/'+clientKey).update({phoneNumber2:phoneNumber2});        
      }
      if(phoneNumber3!=""){
        this.af.database.object('clients/'+this.userService.uid+'/'+clientKey).update({phoneNumber3:phoneNumber3});                
      }
      if(address2!=""){
        this.af.database.object('clients/'+this.userService.uid+'/'+clientKey).update({address2:address2});                        
      }
      this.af.database.list('clientTasks/'+clientKey).subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.af.database.object('taskClients/'+snapshot.$key+'/'+clientKey).update({client:name});
          })
      })
      this.updateSortLocalClient(clientKey,name,email,email2,email3,phoneNumber,phoneNumber2,phoneNumber3,address,address2);
      //console.log(taskKey + title + description + dueDate + taskType + daysTillDue);
    }
    deleteClient(clientKey){
      this.clients=this.af.database.list('clients/'+this.userService.uid);
      this.clients.remove(clientKey);
      this.af.database.list('clientTasks/'+clientKey).subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          this.af.database.object('taskClients/'+snapshot.$key+'/'+clientKey).remove();
        }); 
      })
      this.af.database.list('clientTasks/'+clientKey).remove(); 
      this.deleteLocalClient(clientKey);
    }
}
export class Client{
  key;
  name;
  email;
  email2;
  email3;
  phoneNumber;
  phoneNumber2;
  phoneNumber3;
  address;
  address2;
  constructor(key,
              name,
              email,
              email2,
              email3,
              phoneNumber,
              phoneNumber2,
              phoneNumber3,
              address,
              address2){
    this.key=key;
    this.name=name;
    this.email=email;
    this.email2=email2;
    this.email3=email3;
    this.phoneNumber=phoneNumber;
    this.phoneNumber2=phoneNumber2;
    this.phoneNumber3=phoneNumber3;
    this.address=address;
    this.address2=address2;
  }
}