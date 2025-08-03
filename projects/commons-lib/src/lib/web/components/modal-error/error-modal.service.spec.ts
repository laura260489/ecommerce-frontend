import { TestBed } from '@angular/core/testing';
import { ErrorModalService } from './error-modal.service';
import { IModalErrorConfig } from '@commons-lib';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ErrorModalService', () => {
  let service: ErrorModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorModalService],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    service = TestBed.inject(ErrorModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable from getConfigModal', (done) => {
    const mockConfig: IModalErrorConfig = {
      title: 'Error',
      message: 'An error occurred',
      icon: 'error'
    };

    service.setConfigModal(mockConfig);

    service.getConfigModal().subscribe((config) => {
      expect(config).toEqual(mockConfig);
      done();
    });
  });

  it('should update the modal configuration when setConfigModal is called', () => {
    const mockConfig: IModalErrorConfig = {
      title: 'Warning',
      message: 'This is a warning',
      icon: 'warning'
    };

    service.setConfigModal(mockConfig);

    service.getConfigModal().subscribe((config) => {
      expect(config).toEqual(mockConfig);
    });
  });

  it('should emit null when setConfigModal is called with null', () => {
    service.setConfigModal(null);

    service.getConfigModal().subscribe((config) => {
      expect(config).toBeNull();
    });
  });
});