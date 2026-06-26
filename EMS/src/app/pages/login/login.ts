import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginObj: any={
    userName: '',
    password: '',
  }
  selectedRole: 'admin'|'employee'='employee'

  router = inject(Router)

  onLogin(){
    //change
    if(this.selectedRole == 'admin' && this.loginObj.password=='1122'){
      this.router.navigateByUrl('dashboard')
    }
    else{
      //show side error
      alert("Wrong Credentials")
    }
  }
}
