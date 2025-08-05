import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginSuccess, User } from '@commons-lib';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-remote-entry',
  templateUrl: './remote-entry.component.html',
  styleUrls: ['./remote-entry.component.scss']
})
export class RemoteEntryComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private store: Store) { }

  ngOnInit() {
    sessionStorage.setItem('mock', JSON.stringify({ id: '1', name: 'John Doe', email: 'doe@gmail.com', token: '1223344', role: 'admin' }));
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const session: User = JSON.parse(sessionStorage.getItem('mock')!);
    const { email } = this.loginForm.value;

    if (email === session.email) {
      this.store.dispatch(loginSuccess({ user: session }));
      this.router.navigate(['/']);
    } else {
      console.warn('El email ingresado no coincide con la sesión almacenada.');
    }
  }

  public navigateCreateAccount() {
    this.router.navigate(['/auth/crear-cuenta']);
  }

}
