import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { filter, from, interval, map, of, take } from 'rxjs';
import { RxjsService } from '../service/rxjs-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-rx-jsoperator',
  imports: [ReactiveFormsModule],
  templateUrl: './rx-jsoperator.html',
  styleUrl: './rx-jsoperator.css',
})
export class RxJSOperator {
  noList$ = from([1,2,3,4,5,6,7,8,9,0])
  rollList$ = of([1,2,3,4,5,6,7,8,9,0])
  rxService = inject(RxjsService)
  timeInterval = interval(1000)
  searchControl = new FormControl();

  constructor(){
    this.timeInterval.pipe(
      take(6)
    ).subscribe((res: number)=>{
      console.log(res)
    })

    // this.searchControl.valueChanges.pipe(
    //   filter(searchText => searchText.length >= 3)
    // ).subscribe((res:any)=>{
    //   console.log(res)
    // })

    // this.timeInterval.pipe(
    //   filter(num=>num%2 == 0)
    // ).subscribe((res: number)=>{
    //   console.log(res)
    // })

    // this.noList$.pipe(
    //   filter(num=>num%2==0)
    // ).subscribe((res:number)=>{
    //   console.log(res)
    // })

    // this.rollList$.pipe(
    //   map((result)=> result.filter(num=>num%2==0))
    // ).subscribe((result)=>{
    //   console.log(result)
    // })


    this.rxService.getJSONUSers().subscribe((res: any)=>{
      console.log(res)
    })

    this.rxService.getSingleUser(3).subscribe((res: any)=>{
      console.log(res)
    })
  }

  userSrv = inject(UserService)


  onRoleChange(events: any){
    this.userSrv.$roleBeh.next(events.target.value)
    this.userSrv.$roleSub.next(events.target.value)
  }
}
