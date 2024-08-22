import { TestBed } from '@angular/core/testing';

import { TransferenciaDatosService } from './transferencia-datos.service';

describe('TransferenciaDatosService', () => {
  let service: TransferenciaDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferenciaDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
