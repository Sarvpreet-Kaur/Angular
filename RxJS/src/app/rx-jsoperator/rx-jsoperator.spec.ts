import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxJSOperator } from './rx-jsoperator';

describe('RxJSOperator', () => {
  let component: RxJSOperator;
  let fixture: ComponentFixture<RxJSOperator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxJSOperator],
    }).compileComponents();

    fixture = TestBed.createComponent(RxJSOperator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
