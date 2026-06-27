import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Holds the logged-in user
  private currentUserSignal = signal<any | null>(null);

  // Readonly signal for components
  readonly currentUser = this.currentUserSignal.asReadonly();

  // Whether user is logged in
  readonly isLoggedIn = computed(() => this.currentUser() !== null);

  constructor() {
    // Restore user after page refresh
    const storedUser = localStorage.getItem('loggedUser');

    if (storedUser) {
      this.currentUserSignal.set(JSON.parse(storedUser));
    }
  }

  /**
   * Save logged-in user
   */
  login(user: any): void {
    this.currentUserSignal.set(user);

    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  /**
   * Returns current user
   */
  getCurrentUser() {
    return this.currentUser();
  }

  /**
   * Update user details
   * Useful when profile gets edited
   */
  updateCurrentUser(user: any): void {
    this.currentUserSignal.set(user);

    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  /**
   * Logout
   */
  logout(): void {
    this.currentUserSignal.set(null);

    localStorage.removeItem('loggedUser');
  }
}
