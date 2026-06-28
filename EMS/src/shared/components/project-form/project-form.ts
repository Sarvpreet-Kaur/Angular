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

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { Modal } from '../modal/modal';

import { Project } from '../../models/project.model';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Modal],
  templateUrl: './project-form.html',
  styleUrls: ['./project-form.css'],
})
export class ProjectForm implements OnChanges {
  private readonly fb = inject(FormBuilder);

  // ============================
  // Inputs
  // ============================

  @Input()
  isOpen = false;

  @Input()
  project?: Project | null;

  @Input()
  employees: Employee[] = [];


  // ============================
  // Outputs
  // ============================

  @Output()
  save = new EventEmitter<Project>();

  @Output()
  cancel = new EventEmitter<void>();

  // ============================
  // Managers
  // ============================

  // get managers(): Employee[] {
  //   const managerIds = new Set(
  //     this.projects.map(project => project.projectManager)
  //   );

  //   return this.employees.filter(employee =>
  //     managerIds.has(employee.id)
  //   );
  // }

  // ============================
  // Form
  // ============================

  projectForm: FormGroup = this.fb.group(
    {
      projectName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],

      description: ['', [Validators.required, Validators.minLength(20)]],

      clientName: ['', Validators.required],

      managerId: [null, Validators.required],

      employeeIds: [[]],

      priority: ['Medium', Validators.required],

      status: ['Planning', Validators.required],

      startDate: ['', Validators.required],

      endDate: ['', Validators.required],

      progress: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    },

    {
      validators: this.dateRangeValidator,
    },
  );

  // ============================
  // Lifecycle
  // ============================

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project']) {
      if (this.project) {
        this.projectForm.patchValue({
          projectName: this.project.projectName,

          description: this.project.description,

          client: this.project.client,

          employeeIds: this.project.employeeIds,

          priority: this.project.priority,

          status: this.project.status,

          startDate: this.project.startDate,

          endDate: this.project.endDate,

        });
      } else {
        this.resetForm();
      }
    }
  }

  // ============================
  // Custom Validator
  // ============================

  dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const start = control.get('startDate')?.value;

    const end = control.get('endDate')?.value;

    if (!start || !end) {
      return null;
    }

    return new Date(end) >= new Date(start)
      ? null
      : {
          invalidDateRange: true,
        };
  }

  // ============================
  // Helpers
  // ============================

  get isEditMode(): boolean {
    return !!this.project;
  }

  get modalTitle(): string {
    return this.isEditMode ? 'Edit Project' : 'Create Project';
  }

  get submitButtonText(): string {
    return this.isEditMode ? 'Update Project' : 'Create Project';
  }

  get teamSize(): number {
    return this.projectForm.value.employeeIds?.length ?? 0;
  }

  // ============================
  // Validation
  // ============================

  isInvalid(controlName: string): boolean {
    const control = this.projectForm.get(controlName);

    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  // ============================
  // Save
  // ============================

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();

      return;
    }

    const value = this.projectForm.value;

    const payload: Project = {
      id: this.project?.id ?? "",

      projectName: value.projectName.trim(),

      description: value.description.trim(),

      client: value.client.trim(),

      employeeIds: [...new Set((value.employeeIds ?? []) as number[])],

      priority: value.priority,

      status: value.status,

      startDate: value.startDate,

      endDate: value.endDate,

      teamSize: value.teamSize,

      projectManager: value.projectManager

    };

    this.save.emit(payload);
  }

  // ============================
  // Cancel
  // ============================

  onCancel(): void {
    this.resetForm();

    this.cancel.emit();
  }

  // ============================
  // Reset
  // ============================

  private resetForm(): void {
    this.projectForm.reset({
      projectName: '',

      description: '',

      clientName: '',

      managerId: null,

      employeeIds: [],

      priority: 'Medium',

      status: 'Planning',

      startDate: '',

      endDate: '',

      progress: 0,
    });
  }
}
