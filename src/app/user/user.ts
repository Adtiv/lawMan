export class User{
	fName: string;
	lName: string;
	email: string;
	constructor(fName: string,
				 lName: string,
				 email: string){
		this.fName = fName;
		this.lName = lName;
		this.email = email;
	}
}