import { TestBed } from '@angular/core/testing';

import { StatisticsHandlerService } from './statistics-handler.service';

describe('StatisticsHandlerService', () => {
  let service: StatisticsHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
