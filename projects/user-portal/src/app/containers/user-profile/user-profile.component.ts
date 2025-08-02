import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EditUserComponent, selectUser } from '@commons-lib';
import { Store } from '@ngrx/store';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user$ = this.store.select(selectUser);

  public ref!: DynamicDialogRef;

  public userData: any;

  constructor(private store: Store, private http: HttpClient, private dialogService: DialogService,) { }

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user == null) return;

      this.http.get<any>('https://api.escuelajs.co/api/v1/users/' + user.id).subscribe({
        next: (data) => {
          console.log(data);
          this.userData = data
        },
        error: () => {

        }
      });
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

}
