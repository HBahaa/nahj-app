import { TestBed, inject } from '@angular/core/testing';

import { ELevelsService } from './elevels.service';

describe('ELevelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ELevelsService]
    });
  });

  it('should be created', inject([ELevelsService], (service: ELevelsService) => {
    expect(service).toBeTruthy();
  }));
});
