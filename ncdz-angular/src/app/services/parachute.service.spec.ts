import { TestBed } from '@angular/core/testing';

import { ParachuteService } from './parachute.service';

describe('ParachuteService', () => {
  let service: ParachuteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParachuteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
