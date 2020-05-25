import { TestBed } from '@angular/core/testing';

import { SautService } from './saut.service';

describe('SautService', () => {
  let service: SautService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SautService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
