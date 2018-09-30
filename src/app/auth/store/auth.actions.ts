import {Action} from '@ngrx/store';

export const SIGNIN = 'SIGNIN';
export const SIGNUP = 'SIGNUP';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class Signin implements Action {
  readonly type = SIGNIN;
}

export class Signup implements Action {
  readonly type = SIGNUP;
}

export class LogOut implements Action {
  readonly type = LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {
  }
}

export type AuthActions = Signin | Signup | LogOut | SetToken;