import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';
import { combineLatest, debounceTime } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.css',
})
export class ReactiveForm implements OnInit{
  userForm: FormGroup;

  countries = [
    'India',
    'USA',
    'Canada',
    'Australia',
    'Germany'
  ];

  passwordMismatch = false

  constructor(private fb: FormBuilder) {

    this.userForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [''],
        age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
        country: ['', Validators.required],
        currency: ['', Validators.required],
        subscribe: [false],
        search: ['']
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  ngOnInit(): void {
    this.userForm.controls['confirmPassword'].disable()
    // this.userForm.controls['name'].valueChanges.subscribe((res:string)=>{
    //   debugger
    // })

    //Debouncing property on search - API call only when user is idle
    this.userForm.controls['search'].valueChanges.pipe(
      debounceTime(1000)
    ).subscribe((search: string)=>{
      console.log('Search changes '+search)
    })

    this.userForm.controls['password'].valueChanges.subscribe((Res: any)=>{
      if(Res != ''){
        this.userForm.controls['confirmPassword'].addValidators([Validators.required])
        this.userForm.controls['confirmPassword'].enable()
      }
    })

    this.userForm.statusChanges.subscribe((res: any)=>{
      // debugger;
    })

    //Combine multiple observables - executes if any one of observable changes
    combineLatest([
      this.userForm.controls['password'].valueChanges,
      this.userForm.controls['confirmPassword'].valueChanges
    ]).subscribe(([pwd, confirmPwd])=> {
      this.passwordMismatch = pwd && confirmPwd && pwd!==confirmPwd
    })
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  onSubmit() {

    if (this.userForm.valid) {
      console.log(this.userForm.value);
      alert("Form Submitted Successfully!");
    } else {
      this.userForm.markAllAsTouched();
    }
  }

}
