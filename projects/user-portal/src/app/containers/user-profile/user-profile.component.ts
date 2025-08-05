import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EditUserComponent, selectUser, User } from '@commons-lib';
import { Store } from '@ngrx/store';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user$ = this.store.select(selectUser);

  public ref!: DynamicDialogRef;

  private destroy$ = new Subject<void>();

  constructor(private store: Store, private http: HttpClient, private dialogService: DialogService,) { }

  ngOnInit() {
    this.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (user == null) return;
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
