import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EditUserComponent, UserResponse } from '@commons-lib';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  public ref!: DynamicDialogRef;

  public users: UserResponse[];

  constructor(private http: HttpClient, private dialogService: DialogService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.http.get<UserResponse[]>('https://api.escuelajs.co/api/v1/users').subscribe({
      next: (data) => {
        this.users = data
      },
      error: () => {
        this.users = [];
      }
    });
  }

  editUser(id: string) {
    this.ref = this.dialogService.open(EditUserComponent, {
      header: 'Editar usuario',
      width: '50%',
      data: {
        idUser: id
      }
    });
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  confirm(id: string) {
    this.confirmationService.confirm({
      message: '¿Desea eliminar al usuario?',
      accept: () => {
        
      }
    });
  }

}
