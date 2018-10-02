import {TestBed} from '@angular/core/testing';

import {GivelistService} from './givelist.service';

describe('GivelistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GivelistService = TestBed.get(GivelistService);
    expect(service).toBeTruthy();
  });
});
