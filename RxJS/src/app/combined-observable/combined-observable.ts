import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { concatMap, exhaustMap, forkJoin, mergeMap, of, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-combined-observable',
  imports: [ReactiveFormsModule],
  templateUrl: './combined-observable.html',
  styleUrl: './combined-observable.css',
})
export class CombinedObservable {
  cityData$ = of(["Kanpur", "Delhi", "Gurgaon"])
  stateData$ = of(["UP", "Delhi", "Assam"])

  http = inject(HttpClient)
  searchControl: FormControl=new FormControl()

  loginClick$ = new Subject<void>();

  constructor(){

    //trigger api call on every char change
    // this.searchControl.valueChanges.subscribe((search: string)=>{
    //   debugger
    //   this.http.get("https://dummyjson.com/products/search?q="+search).subscribe(
    //     (res: any)=>{
    //       debugger
    //       console.log(res)
    //     }
    //   )
    // })

    //only consider the latest api call
    // this.searchControl.valueChanges.pipe(
    //   switchMap((search: String)=> this.http.get("https://dummyjson.com/products/search?q="+search))
    // ).subscribe((res: any)=> {
    //   console.log(res)
    // })

    //does not cancel out the - it allows all to work parallely
    // this.searchControl.valueChanges.pipe(
    //   mergeMap((search: String)=> this.http.get("https://dummyjson.com/products/search?q="+search))
    // ).subscribe((res: any)=> {
    //   console.log(res)
    // })

    //does not cancel out the - it allows all to work sequentially
    // this.searchControl.valueChanges.pipe(
    //   concatMap((search: String)=> this.http.get("https://dummyjson.com/products/search?q="+search))
    // ).subscribe((res: any)=> {
    //   console.log(res)
    // })



    const $users = this.http.get("https://jsonplaceholder.typicode.com/users")
    const $posts = this.http.get("https://jsonplaceholder.typicode.com/posts")

    //All observables should work
    forkJoin([$users, $posts]).subscribe((res: any)=>{
      console.log(res)
      debugger;
    }, error=>{
      debugger;
    })
    forkJoin([this.stateData$, this.cityData$]).subscribe((res: any)=> {
      console.log(res);
      debugger;
    })

    this.stateData$.subscribe((res:any)=>{
      debugger;
    })

    this.loginClick$.pipe(
      exhaustMap(()=>{
        return this.http.get("https://jsonplaceholder.typicode.com/users")
      })
    ).subscribe((res:any)=>{
    })
  }

  //does not trigger api, if one is in progress

  // onLogin(){
  //   this.loginClick$.pipe(
  //     exhaustMap(()=>{
  //       return this.http.get("https://jsonplaceholder.typicode.com/users")
  //     })
  //   ).subscribe((res:any)=>{
  //   })


  //   // this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((res:any)=>{
  //   //   console.log(res)
  //   // })

  // }

  onBtnClick(){
    this.loginClick$.next()
  }
}
