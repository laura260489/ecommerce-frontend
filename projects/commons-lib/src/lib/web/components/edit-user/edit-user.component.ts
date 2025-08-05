import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalInformationService, selectUser, updateUser, User, UserResponse } from '@commons-lib';
import { Store } from '@ngrx/store';
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
    { name: 'Cliente', code: 'client', disabled: true }
  ];

  user$ = this.store.select(selectUser);

  constructor(private fb: FormBuilder, private http: HttpClient, public config: DynamicDialogConfig, private modalInformationService: ModalInformationService, private store: Store) { }

  ngOnInit() {

    this.idUser = this.config.data?.idUser;

    this.editUser = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      roles: [[], Validators.required],
    });

    this.user$.subscribe((user: User)=>{
      if(user.role.includes('admin')) this.availableRoles.push({ name: 'Administrador', code: 'admin' })
    })

    if (this.idUser != undefined) {
      this.searchOnUser(this.idUser);
    }
  }

  private searchOnUser(id: string) {
    this.http.get<UserResponse>(process.env['urlBase'] + 'administration/get-user/' + id).subscribe({
      next: (data) => {
        this.user = data;
        this.editUser.patchValue({
          name: data.first_name,
          lastName: data.last_name,
          email: data.email,
          phone: data.phone,
          roles: data.roles
        });
      },
      error: () => {

      }
    });
  }

  isRoleDisabled(role: any): boolean {
    return role.code === 'client';
  }

  onSubmit() {
    if (this.editUser.valid) {
      const { name, lastName, phone, email, roles } = this.editUser.value;

      const body = {
        first_name: name,
        last_name: lastName,
        email: email,
        phone: phone,
        roles: roles
      };

      this.http.put<UserResponse>(
        `${process.env['urlBase']}administration/update-user/${this.idUser}`,
        body,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }
      ).subscribe({
        next: (response) => {
          if(response){ 
            const user: User = {
              id: response.id,
              firstName: response.first_name,
              lastName: response.last_name,
              frecuent: response.frecuent,
              sub: response.email,
              role: response.roles
            }
            this.store.dispatch(updateUser({ user: user }));
            this.showModal();
          }
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
        }
      });

    } else {
      this.editUser.markAllAsTouched();
    }
  }

  public showModal(): void {
    this.modalInformationService.setConfigModal({
      message: "Usuario actualizado de manera exitosa",
      showButton: true,
      buttonConfig: {
        label: "Aceptar",
        navigate: "/portal-usuario/mi-cuenta"
      }
    });
  }

  public modalClose(event: boolean) {
    this.modalInformationService.setConfigModal(null);
  }
}
