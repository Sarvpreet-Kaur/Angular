import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserService{

    courseDuration = new BehaviorSubject<string>("2 months")
    $roleBeh = new BehaviorSubject<string>("")
    $roleSub = new Subject<string>();
    constructor(){}

    getUser(){
        return {
            id: 1,
            name: "Reet",
            email: "reet1@gmail.com"
        }
    }
}