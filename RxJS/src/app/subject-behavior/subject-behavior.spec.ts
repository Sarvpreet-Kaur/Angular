import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectBehavior } from './subject-behavior';

describe('SubjectBehavior', () => {
  let component: SubjectBehavior;
  let fixture: ComponentFixture<SubjectBehavior>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectBehavior]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectBehavior);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
