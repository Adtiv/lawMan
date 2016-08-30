import {Injectable,OnInit} from '@angular/core';
import {FirebaseAuth} from 'angularfire2';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class UserService implements OnInit{
	af: AngularFire;
    uid: string;
    user: FirebaseObjectObservable<any[]>;
    users: FirebaseListObservable<any[]>;
    userTasks: FirebaseListObservable<any[]>;
    newUser;
    email;
    fName;
    lName;
    userEmail;
    loginStatus:string;
    constructor(af: AngularFire) {
    	this.af = af;
        //this.getCurrentUser();
        this.users = this.af.database.list('users');
        this.af.auth.subscribe((auth) => {
            if(auth==null){
                console.log("not logged in");
            }
            else{
                if(this.uid==null){
                    this.setUid(auth.uid);
                }
                else if(auth.uid!=this.uid){
                    this.setUid(auth.uid);
                }
                //this.setUser();
            }
        });
        this.af.database.list('users').subscribe(users=>console.log(users));
    }
    ngOnInit(){
        this.newUser=false;
        this.loginStatus="";
    }
    setUser(){
        this.user = this.af.database.object('users/'+this.uid);
        //this.user.subscribe((user)=>{console.log(user)});
    }
    setUid(uid){
        if(uid!=null){
            this.uid=uid;
            if(this.newUser==true){
                this.user = this.af.database.object('users/'+this.uid);
                console.log('new User');
                this.newUser=false;
                this.user.set({uid:this.uid,email:this.email,fName:this.fName,lName:this.lName});
            }
        }
        this.user = this.af.database.object('users/'+this.uid);

    }
    addUserTask(postId){

        //this.userTasks = this.af.database.list('users/:'+ this.userKey+'/tasks');   
        //this.userTasks.push({postId});
    }
    createUser(email, password, fName, lName){
        this.af.auth.createUser({ email: email, password: password });
        this.email=email;
        this.fName=fName;
        this.lName=lName;
        this.newUser=true;
        //this.users.push({uid:this.uid,email:email,fName:fName,lName:lName});
    }
    logout(){
        this.af.auth.logout();
        this.uid="";
        this.email="";
        this.fName="";
        this.lName="";
        //location.reload();
    }
    loginUser(email, password){
    	this.af.auth.login({ email: email, password: password }).then((success) => {
          //console.log("Firebase success: " + JSON.stringify(success));
          this.loginStatus = "success";
        })
        .catch((error) => {
          //console.log("Firebase failure: " + JSON.stringify(error.message));
          this.loginStatus = JSON.stringify(error.message);
        });
    }
}