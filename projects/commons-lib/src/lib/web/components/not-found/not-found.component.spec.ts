import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Se debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe hacer click en el botón', () => {
    const spyOnCLick = jest.spyOn(component.customAnswerState.libTbButton, 'libTbClick');
    component.customAnswerState.libTbButton.libTbClick(null);
    expect(spyOnCLick).toHaveBeenCalled();
  });

});
