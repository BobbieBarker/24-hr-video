import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';

import { Store } from '@ngrx/store';
import { AppState } from '../../models';

@Component({
  selector: 'pp-login',
  templateUrl: 'login.html',
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  login$ = new Subject<void>();
  logOut$ = new Subject<void>();
  session: Observable<any>;

  constructor(private auth: AuthService, private store: Store<AppState>) {}

  ngOnInit() {
    this.login$
    .subscribe(() => this.auth.login());

    this.session = this.store.select('currentSession');

    this.logOut$.subscribe(() => this.auth.logout());
  }
}
