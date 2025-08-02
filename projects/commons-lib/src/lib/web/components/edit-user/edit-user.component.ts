import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserResponse } from '@commons-lib';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public idUser: string;

  public editUser: FormGroup;
  public user: UserResponse;

  public availableRoles: any[] = [
    { name: 'Administrador', code: 'admin' },
    { name: 'Cliente', code: 'client' }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient, public config: DynamicDialogConfig) { }

  ngOnInit() {

    this.idUser = this.config.data?.idUser;

    this.editUser = this.fb.group({
      names: ['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      roles: [[], Validators.required],
    });

    if (this.idUser != undefined) {
      this.searchOnUser(this.idUser);
    }
  }

  private searchOnUser(id: string) {
    this.http.get<UserResponse>('https://api.escuelajs.co/api/v1/users/' + id).subscribe({
      next: (data) => {
        this.user = data

        this.editUser.patchValue({
          names: this.user.name,
          email: this.user.email,
          phone: this.user.phone || '32145665556',
          roles: ['admin', 'client']
        });
      },
      error: () => {
        
      }
    });
  }

  onSubmit() {
    if (this.editUser.valid) {
      const { names, phone, email, rol } = this.editUser.value;

    } else {
      this.editUser.markAllAsTouched();
    }
  }

}
