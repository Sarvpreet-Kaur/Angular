import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedObservable } from './combined-observable';

describe('CombinedObservable', () => {
  let component: CombinedObservable;
  let fixture: ComponentFixture<CombinedObservable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombinedObservable],
    }).compileComponents();

    fixture = TestBed.createComponent(CombinedObservable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
