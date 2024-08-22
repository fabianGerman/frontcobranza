import { TestBed } from '@angular/core/testing';

import { ServiciosErrorService } from './servicios-error.service';

describe('ServiciosErrorService', () => {
  let service: ServiciosErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
