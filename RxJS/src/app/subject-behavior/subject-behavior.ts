import { Component, inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-subject-behavior',
  imports: [],
  templateUrl: './subject-behavior.html',
  styleUrl: './subject-behavior.css',
})
export class SubjectBehavior implements OnInit {
  studentName$ = new Subject()
  rollNo$ = new Subject<number>()
  takeTill = new Subject<void>() //not emitting any value

  courseName: Subject<string> = new Subject<string>()


  //Behavior subjects
  userSrv = inject(UserService)


  constructor(){
    
    setTimeout(()=>{
      this.studentName$.next("Angular")
      this.rollNo$.next(123)
      this.takeTill.next()
      this.userSrv.courseDuration.next("3 months + 2 weeks")
    }, 4000)
  }

  ngOnInit(): void{
      this.studentName$.subscribe((res: any)=> {
        debugger
      })
      this.rollNo$.subscribe((res: any)=> {
        debugger
      })
      this.userSrv.courseDuration.subscribe((res: any)=>{
        debugger;
      })
    }
}
