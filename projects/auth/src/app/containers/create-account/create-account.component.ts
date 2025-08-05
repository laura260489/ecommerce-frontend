import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  public createAccount: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createAccount = this.fb.group({
      name: ['', [Validators.required], Validators.pattern(/^[^0-9]*$/)],
      lastName: ['', [Validators.required], Validators.pattern(/^[^0-9]*$/)],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]]
    });
  }

  onSubmit() {
    if (this.createAccount.valid) {
      const { name, lastName, email, phone, password } = this.createAccount.value;

      let passwordHash = password.trim();
      let hash = CryptoJS.SHA3(passwordHash, { outputLength: 256 });
      passwordHash = hash.toString(CryptoJS.enc.Hex);

    } else {
      this.createAccount.markAllAsTouched();
    }
  }
  navigateToLogin() {
    this.router.navigate(['/auth']);
  }

}
