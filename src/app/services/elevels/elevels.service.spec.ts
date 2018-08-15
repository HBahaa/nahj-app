import { TestBed, inject } from '@angular/core/testing';

import { ELevelsOneService } from './elevelsOne.service';

describe('ELevelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ELevelsOneService]
    });
  });

  it('should be created', inject([ELevelsOneService], (service: ELevelsOneService) => {
    expect(service).toBeTruthy();
  }));
});
