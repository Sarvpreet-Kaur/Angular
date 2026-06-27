import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports:[FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  loginObj = {
    userName: '',
    password: ''
  };
  
  // UI Variables
  

  showPassword = false;

  rememberMe = false;

  isLoading = false;

  errorMessage = '';

  
  // Constructor
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  
  // Toggle Password
  togglePassword(): void {

    this.showPassword = !this.showPassword;

  }

  
  // Login
  onLogin() {

  this.loginService.login().subscribe({

    next: (employees) => {

      const user = employees.find(emp =>
        emp.email === this.loginObj.userName &&
        emp.password === this.loginObj.password
      );

      if (user) {

        localStorage.setItem(
          'loggedUser',
          JSON.stringify(user)
        );

        this.router.navigate(['/dashboard']);

      } else {

        this.errorMessage = 'Invalid username or password';

      }

    },

    error: () => {

      this.errorMessage = 'Unable to connect to the server';

    }

  });

}

}