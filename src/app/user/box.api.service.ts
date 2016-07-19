import {Injectable,OnInit} from '@angular/core';
import {FirebaseAuth} from 'angularfire2';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {Observable} from 'rxjs/Rx';
import {Http, HTTP_PROVIDERS} from '@angular/http';



@Injectable()
export class BoxApiService implements OnInit{
	af: AngularFire;
    constructor(af: AngularFire) {
    	this.af = af;
    }
    ngOnInit(){
    }
}