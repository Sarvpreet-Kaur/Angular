import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-unsubscribe',
  imports: [AsyncPipe],
  templateUrl: './unsubscribe.html',
  styleUrl: './unsubscribe.css',
})
export class Unsubscribe implements OnInit, OnDestroy {
  http = inject(HttpClient)
  userList: any[]=[]

  //subscription object - for single sub
  //!: - initialize later
  subscription!: Subscription

  subList: Subscription[] = []

  subjectUntil!: Subject<void>

  userList$ = new Observable<any[]>

  getUsers(){
    this.subscription = this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((res: any)=>{
      this.userList = res
    })
    this.subList.push(this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((res: any)=>{
      this.userList = res
    })
    )


    //way 3
    this.http.get("https://jsonplaceholder.typicode.com/users").pipe(
      takeUntil(this.subjectUntil)
    ).subscribe((res: any)=>{
      this.userList = res
    })

    //way 4 - only subscriobe once
    this.http.get("https://jsonplaceholder.typicode.com/users").pipe(
      take(1)
    ).subscribe((res: any)=>{
      this.userList = res
    })

    //way 5 using async pipe
    this.userList$ = this.http.get<any[]>("https://jsonplaceholder.typicode.com/users");

  }

  getPost(){
    const sub=this.http.get("https://jsonplaceholder.typicode.com/posts").subscribe((res: any)=>{
      this.userList = res
    })
    this.subList.push(sub)
  }

  ngOnInit(): void {
    this.getUsers()
    this.getPost()
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()

    this.subList.forEach(sub=>{sub.unsubscribe()})

    this.subjectUntil.next()
  }
}
