import { Injectable } from '@angular/core';
import Auth0Lock from 'auth0-lock';
import { Observable } from 'rxjs/Observable';
import * as Cookies from 'js-cookie';
import { login, logout } from './index';
import { Store } from '@ngrx/store';
import { AppState } from '../models';

const lockOptions = {
  auth: {
    params: {
      state: window.location.pathname,
      scope: 'openid profile',
      responseType: 'id_token token'
    },
  }
};

@Injectable()
export class AuthService {
  
  lock = new Auth0Lock('qABnu0H00Ak22t04NYpE1U5wc0SSRoYv', 'derpy-test.auth0.com', lockOptions);
  
  constructor(private store: Store<AppState>) {
    this.lock.on('authenticated', ({ accessToken, idToken }) => {
      Cookies.set('pp-auth-token', idToken);
      this.lock.getUserInfo(accessToken, (err, profile) => {
        if (err) {
          console.log('this error!', err)
        } else {
          console.log('profile', profile);
          this.store.dispatch(login(profile));
        }

      })
    })
  }
  
  login () {
    this.lock.show();
  }

  logout () {
    this.lock.logout({ returnTo: 'http://localhost:4200' });
    this.store.dispatch(logout());
    Cookies.remove('pp-auth-token')
  }
}
