import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { loginSuccess } from './auth.actions';

@Injectable()
export class AuthEffects {
    saveUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginSuccess),
            tap(({ user }) => {
                sessionStorage.setItem('user', JSON.stringify(user));
            })
        ),
        { dispatch: false }
    );

    constructor(private actions$: Actions) { }
}
