import { TestBed, inject } from '@angular/core/testing';

import { FetchGameSearchService } from './fetch-game.service';

describe('FetchGameSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchGameSearchService]
    });
  });

  it('should ...', inject([FetchGameSearchService], (service: FetchGameSearchService) => {
    expect(service).toBeTruthy();
  }));
});
