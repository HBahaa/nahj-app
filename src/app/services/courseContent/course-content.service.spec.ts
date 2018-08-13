import { TestBed, inject } from '@angular/core/testing';

import { CourseContentService } from './course-content.service';

describe('CourseContentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseContentService]
    });
  });

  it('should be created', inject([CourseContentService], (service: CourseContentService) => {
    expect(service).toBeTruthy();
  }));
});
