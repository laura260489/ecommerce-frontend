import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { last } from 'rxjs';

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
      names: ['', [Validators.required], Validators.pattern(/^[^0-9]*$/)],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],   
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]]
    });
  }

  onSubmit() {
    if (this.createAccount.valid) {
      const { names, lastNames, email, phone, password } = this.createAccount.value;
      
    } else {
      this.createAccount.markAllAsTouched();
    }
  }
  navigateToLogin() {
    this.router.navigate(['/auth']);
  }    

}
