import { TestBed, inject } from '@angular/core/testing';

import { StudyYearsService } from './study-years.service';

describe('StudyYearsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudyYearsService]
    });
  });

  it('should be created', inject([StudyYearsService], (service: StudyYearsService) => {
    expect(service).toBeTruthy();
  }));
});
