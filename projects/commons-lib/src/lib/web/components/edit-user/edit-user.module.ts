import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from './edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ErrorsFormModule } from '../errors-form/errors-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DividerModule,
    ReactiveFormsModule,
    CheckboxModule,
    InputTextModule,
    MultiSelectModule,
    ErrorsFormModule
  ],
  declarations: [EditUserComponent],
  exports: [EditUserComponent]
})
export class EditUserModule { }
