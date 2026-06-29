import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Employee } from '../../models/employee.model';
import { Project } from '../../models/project.model';

import { Modal } from '../modal/modal';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Modal],
  templateUrl: './employee-form.html',
  styleUrls: ['./employee-form.css'],
})
export class EmployeeForm implements OnChanges {
  private fb = inject(FormBuilder);

  // Inputs

  @Input()
  isOpen = false;

  @Input()
  employee?: Employee | null;

  @Input()
  projects: Project[] = [];

  @Input()
  mode: 'add' | 'edit' | 'view' = 'add';
  // Outputs

  @Output()
  save = new EventEmitter<Employee>();

  @Output()
  cancel = new EventEmitter<void>();

  @Output()
  edit = new EventEmitter<void>();

  // Form

  employeeForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    designation: ['', Validators.required],
    department: ['', Validators.required],
    salary: [null, [Validators.required, Validators.min(1000)]],
    joiningDate: ['', Validators.required],
    status: ['Active', Validators.required],
    address: ['', Validators.required],
    profileImage: [''],
    password: [''],
    projectId: [[]],
  });

  // Lifecycle

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee']) {
      if (this.employee) {
        this.employeeForm.patchValue({
          firstName: this.employee.firstName,

          lastName: this.employee.lastName,

          email: this.employee.email,

          designation: this.employee.designation,

          department: this.employee.department,

          salary: this.employee.salary,

          phone: this.employee.phone,

          joiningDate: this.formatDate(this.employee.joiningDate),

          status: this.employee.status,

          address: this.employee.address,

          profileImage: this.employee.profileImage,

          password: '',

          projectIds: this.employee.projectId,
        });
      } else {
        this.resetForm();
      }
    }
    if (changes['mode']) {
      if (this.mode === 'view') {
        this.employeeForm.disable();
      } else {
        this.employeeForm.enable();
      }
    }
  }

  // Getters

  get isEditMode(): boolean {
    return this.mode === 'edit';
  }

  get modalTitle(): string {
    if (this.mode === 'view') {
      return 'View Employee';
    }
    return this.isEditMode ? 'Edit Employee' : 'Add Employee';
  }

  get submitButtonText(): string {
    if (this.mode === 'view') {
      return 'View Employee';
    }
    return this.isEditMode ? 'Update Employee' : 'Add Employee';
  }

  // Save

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();

      return;
    }

    const formValue = this.employeeForm.value;

    const payload: Employee = {
      id: this.employee?.id ?? crypto.randomUUID(),

      firstName: formValue.firstName,

      lastName: formValue.lastName,

      email: formValue.email,

      phone: formValue.phone,

      designation: formValue.designation,

      department: formValue.department,

      status: formValue.status,

      joiningDate: new Date(formValue.joiningDate),

      salary: Number(formValue.salary),

      address: formValue.address,

      profileImage: formValue.profileImage,

      password: formValue.password,

      projectId: formValue.projectId ?? [],
    };

    this.save.emit(payload);
    this.cancel.emit();
  }

  // Cancel

  onCancel(): void {
    this.resetForm();

    this.cancel.emit();
  }

  // Reset

  private resetForm(): void {
    this.employeeForm.reset({
      firstName: '',

      lastName: '',

      email: '',

      phone: '',

      designation: '',

      department: '',

      salary: null,

      joiningDate: '',

      status: 'Active',

      address: '',

      profileImage: '',

      password: '',

      projectIds: [],
    });
  }

  // Validation Helper

  isInvalid(controlName: string): boolean {
    const control = this.employeeForm.get(controlName);

    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  private formatDate(date: Date | string): string {
    return new Date(date).toISOString().split('T')[0];
  }
}
