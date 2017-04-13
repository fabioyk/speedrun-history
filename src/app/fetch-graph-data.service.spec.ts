import { TestBed, inject } from '@angular/core/testing';

import { FetchGraphDataService } from './fetch-graph-data.service';

describe('FetchGraphDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchGraphDataService]
    });
  });

  it('should ...', inject([FetchGraphDataService], (service: FetchGraphDataService) => {
    expect(service).toBeTruthy();
  }));
});
