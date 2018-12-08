/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SeasonTeamsService } from './seasonTeams.service';

describe('Service: SeasonTeams', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeasonTeamsService]
    });
  });

  it('should ...', inject([SeasonTeamsService], (service: SeasonTeamsService) => {
    expect(service).toBeTruthy();
  }));
});
