import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EditUserComponent, selectUser, UserResponse } from '@commons-lib';
import { Store } from '@ngrx/store';
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

  user$ = this.store.select(selectUser);

  constructor(private http: HttpClient, private dialogService: DialogService, private confirmationService: ConfirmationService, private store: Store) { }

  ngOnInit() {
    this.searchOnUsers();
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
        this.http.delete<any>(process.env['urlBase'] + 'administration/delete-user/' + id).subscribe({
          next: (data) => {
            if(data.status_code === 200) this.searchOnUsers();
          },
          error: () => {
            this.users = [];
          }
        });
      }
    });
  }

  private searchOnUsers(){
    this.http.get<UserResponse[]>(process.env['urlBase'] + 'administration/list-users').subscribe({
      next: (data) => {
        this.users = data
      },
      error: () => {
        this.users = [];
      }
    });
  }

}
