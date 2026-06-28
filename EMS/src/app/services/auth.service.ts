import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../../shared/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject =
    new BehaviorSubject<Employee | null>(null);

  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {

    const user = localStorage.getItem('loggedUser');

    if (user) {

      this.currentUserSubject.next(JSON.parse(user));

    }

  }

  login(user: Employee) {

    localStorage.setItem(
      'loggedUser',
      JSON.stringify(user)
    );

    this.currentUserSubject.next(user);

  }

  logout() {

    localStorage.removeItem('loggedUser');

    this.currentUserSubject.next(null);

  }

  getCurrentUser() {

    return this.currentUserSubject.value;

  }

  isLoggedIn(): boolean {

    return this.currentUserSubject.value != null;

  }

}