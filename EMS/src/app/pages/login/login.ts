import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  loginObj = {
    userName: '',
    password: ''
  };

  showPassword = false;
  rememberMe = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) { }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {

    this.errorMessage = '';
    this.isLoading = true;

    this.employeeService.getEmployees().subscribe({

      next: (employees) => {

        const user = employees.find(emp =>
          emp.email === this.loginObj.userName &&
          emp.password === this.loginObj.password
        );

        this.isLoading = false;

        if (user) {

          // Save logged-in user
          this.authService.login(user);

          // Navigate
          this.router.navigate(['/dashboard']);

        } else {

          this.errorMessage = 'Invalid username or password';

        }

      },

      error: () => {

        this.isLoading = false;

        this.errorMessage = 'Unable to connect to the server';

      }

    });

  }

}