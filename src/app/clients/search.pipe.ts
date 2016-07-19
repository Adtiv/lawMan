import {Pipe} from "@angular/core"

@Pipe({
	name:"search"
})
export class SearchPipe{
	transform(value,searchChars){
		return value.filter((item)=>
			item.name.toUpperCase().includes(searchChars.toUpperCase())||
			item.email.toUpperCase().includes(searchChars.toUpperCase())||
			item.phoneNumber.includes(searchChars));
	}
}