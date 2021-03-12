import { TestBed } from '@angular/core/testing';

import { EnemyLogicService } from './enemy-logic.service';

describe('EnemyLogicService', () => {
  let service: EnemyLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnemyLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
