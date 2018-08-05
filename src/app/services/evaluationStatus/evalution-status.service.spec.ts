import { TestBed, inject } from '@angular/core/testing';

import { EvalutionStatusService } from './evalution-status.service';

describe('EvalutionStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvalutionStatusService]
    });
  });

  it('should be created', inject([EvalutionStatusService], (service: EvalutionStatusService) => {
    expect(service).toBeTruthy();
  }));
});
