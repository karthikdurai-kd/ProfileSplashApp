import { TestBed } from '@angular/core/testing';

import { ProfilesfetchService } from './profilesfetch.service';

describe('ProfilesfetchService', () => {
  let service: ProfilesfetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilesfetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
