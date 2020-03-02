import { TestBed, async, inject } from '@angular/core/testing';

import { FeatureGuard } from './feature.guard';
import {Router} from '@angular/router';

describe('FeatureGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeatureGuard, Router]
    });
  });

});
