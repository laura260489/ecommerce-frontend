import { TestBed } from '@angular/core/testing';

import { LoaderSpinnerService } from './loader-spinner.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoaderSpinnerService', () => {
  let service: LoaderSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(LoaderSpinnerService);
  });

  it('Se debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener variable isShow', () => {
    service['isShow'] = true;
    service.getIsShow();

    expect(service['isShow']).toBeTruthy();
  });

  it('debe asignarle un valor a la variable isShow', () => {
    service.setIsShow(false);
    expect(service['isShow']).toBeFalsy();
  });
});
