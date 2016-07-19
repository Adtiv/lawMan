"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var angularfire2_1 = require('angularfire2');
var UserService = (function () {
    function UserService(af) {
        var _this = this;
        this.af = af;
        //this.getCurrentUser();
        this.users = this.af.database.list('users');
        this.af.auth.subscribe(function (auth) {
            if (auth == null) {
                console.log("not logged in");
            }
            else {
                if (_this.uid == null) {
                    _this.setUid(auth.uid);
                }
                else if (auth.uid != _this.uid) {
                    _this.setUid(auth.uid);
                }
            }
        });
        this.af.database.list('users').subscribe(function (users) { return console.log(users); });
    }
    UserService.prototype.ngOnInit = function () {
        this.newUser = false;
    };
    UserService.prototype.setUser = function () {
        this.user = this.af.database.object('users/' + this.uid);
        //this.user.subscribe((user)=>{console.log(user)});
    };
    UserService.prototype.setUid = function (uid) {
        if (uid != null) {
            this.uid = uid;
            if (this.newUser == true) {
                this.user = this.af.database.object('users/' + this.uid);
                console.log('new User');
                this.newUser = false;
                this.user.set({ uid: this.uid, email: this.email, fName: this.fName, lName: this.lName });
            }
        }
        this.user = this.af.database.object('users/' + this.uid);
    };
    UserService.prototype.addUserTask = function (postId) {
        //this.userTasks = this.af.database.list('users/:'+ this.userKey+'/tasks');   
        //this.userTasks.push({postId});
    };
    UserService.prototype.createUser = function (email, password, fName, lName) {
        this.af.auth.createUser({ email: email, password: password });
        this.email = email;
        this.fName = fName;
        this.lName = lName;
        this.newUser = true;
        //this.users.push({uid:this.uid,email:email,fName:fName,lName:lName});
    };
    UserService.prototype.logout = function () {
        this.af.auth.logout();
        this.uid = "";
        this.email = "";
        this.fName = "";
        this.lName = "";
        location.reload();
    };
    UserService.prototype.loginUser = function (email, password) {
        this.af.auth.login({ email: email, password: password });
        console.log("login");
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map