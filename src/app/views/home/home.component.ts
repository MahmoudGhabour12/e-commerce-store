import { Component, OnDestroy, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Role } from 'models/role';
import { User } from 'models/user';

import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, OnDestroy {
  loading = false;
  user: User;
  userFromApi: User;

  /**
   * The set of subscriptions on this components,
   * these subscriptions must be unsubscribed before this component got destroyed.
   */
  subscriptions = new Subscription();

  constructor(private authenticationService: AuthService) {
    this.user = this.authenticationService.userValue;
  }

  ngOnInit() {
    this.loading = true;

    /**
     * Get the current logged in user.
     */
    this.subscriptions.add(
      this.authenticationService
        .getById(this.user.id)
        .pipe(first())
        .subscribe((user) => {
          this.loading = false;
          this.userFromApi = user;
        })
    );
  }

  /**
   * Destroy component data
   */
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  /**
   * Check if the current logged in user is admin or not.
   */
  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }
}
