import { Component } from '@angular/core';
import { from, interval, Observable, of, timer } from 'rxjs';

@Component({
  selector: 'app-rxjs-demo',
  templateUrl: './rxjs-demo.html',
  styleUrl: './rxjs-demo.css',
})

export class RxjsDemo {

  cityList: string[] = ["Pune", "Delhi", "Gurgaon", "Kanpur"]
  cityList$ = of(["Pune", "Delhi", "Gurgaon", "Kanpur"])
  cityListCont$ = from(["Pune", "Delhi", "Gurgaon", "Kanpur"])
  myInterval$ = interval(2000)
  timer$ = timer(2000)

  constructor(){
    // this.myInterval$.subscribe((res: number)=>{
    //   console.log('Timer'+res)
    // })

    this.timer$.subscribe(res=>{
      console.log("Timer executed - 2sec")
    })

    const myObservable$ = new Observable(value=>{
      value.next("This is Demo Text")
    })

    myObservable$.subscribe(message=> {
      // debugger;
      console.log(message)
    })

    this.cityList$.subscribe((cityData: string[])=>{
      // debugger;
      console.log(cityData)
    })

    this.cityListCont$.subscribe((cityData: string)=>{
      // debugger;
      console.log(cityData)
    })

  }
}
