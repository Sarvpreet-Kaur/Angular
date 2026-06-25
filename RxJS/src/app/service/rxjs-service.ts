import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxjsService {
  constructor(private http: HttpClient){}

  getJSONUSers(){
    return this.http.get("https://jsonplaceholder.typicode.com/users").pipe(
      tap(userList=>{
        console.log(userList)
      }),
      map((userList: any)=> userList.map((user:any) => {
        return {id: user.id, name: user.name}
      }))
    )
  }

  getSingleUser(id: number){
    return this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`).pipe(
      map((userData: any)=> userData.address)
    )
  }
}
