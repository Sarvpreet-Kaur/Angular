import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelEmployeeDialog } from './del-employee-dialog';

describe('DelEmployeeDialog', () => {
  let component: DelEmployeeDialog;
  let fixture: ComponentFixture<DelEmployeeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelEmployeeDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DelEmployeeDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
