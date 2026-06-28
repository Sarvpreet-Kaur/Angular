import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, forkJoin, takeUntil } from 'rxjs';

import { Employee } from '../../../shared/models/employee.model';
import { Project } from '../../../shared/models/project.model';

import { EmployeeService } from '../../services/employee.service';
import { ProjectService } from '../../services/project.service';

import { EmployeeCard } from '../../../shared/components/employee-card/employee-card';
import { EmployeeForm } from '../../../shared/components/employee-form/employee-form';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, EmployeeCard, EmployeeForm],
  templateUrl: './employee.html',
  styleUrls: ['./employee.css'],
})
export class EmployeeComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  projects: Project[] = [];

  selectedEmployee: Employee | null = null;

  loading = false;

  searchText = '';

  isFormOpen = false;
  formMode: 'add' | 'edit' | 'view' = 'add';

  private destroy$ = new Subject<void>();

  constructor(
    private employeeService: EmployeeService,
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): void {
    this.loading = true;

    forkJoin({
      employees: this.employeeService.getEmployees(),
      projects: this.projectService.getProjects(),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ employees, projects }) => {
          console.log('Employees:', employees);
          console.log('Projects:', projects);
          this.employees = employees;

          this.filteredEmployees = [...employees];
          console.log(this.filteredEmployees);

          this.projects = projects;

          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error(error);

          this.loading = false;
        },
      });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.searchText = value;

    if (!value) {
      this.filteredEmployees = [...this.employees];

      return;
    }

    this.filteredEmployees = this.employees.filter((employee) =>
      `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(value),
    );
  }

  get totalEmployees(): number {
    return this.filteredEmployees.length;
  }

  get activeEmployees(): number {
    return this.filteredEmployees.filter((employee) => employee.status === 'Active').length;
  }

  get onLeaveEmployees(): number {
    return this.filteredEmployees.filter((employee) => employee.status === 'On Leave').length;
  }

  trackByEmployee(index: number, employee: Employee): string {
    return employee.id;
  }
  openAddForm(): void {
    this.selectedEmployee = null;
    this.isFormOpen = true;
    this.formMode = 'add'
  }

  openEditForm(employee: Employee): void {
    this.selectedEmployee = employee;
    this.isFormOpen = true;
    this.formMode = 'edit'
  }

  closeForm(): void {
    this.selectedEmployee = null;
    this.isFormOpen = false;
    this.formMode = 'add'
  }

  viewForm(employee: Employee): void{
    this.selectedEmployee = employee;
    this.isFormOpen = true;
    this.formMode = 'view'
  }

  saveEmployee(employee: Employee): void {
    if (this.selectedEmployee) {
      this.employeeService
        .updateEmployee(employee)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (updatedEmployee) => {
            const index = this.employees.findIndex((e) => e.id === updatedEmployee.id);

            if (index !== -1) {
              this.employees[index] = updatedEmployee;
            }

            this.filteredEmployees = [...this.employees];

            if (this.searchText) {
              this.filteredEmployees = this.employees.filter((emp) =>
                `${emp.firstName} ${emp.lastName}`
                  .toLowerCase()
                  .includes(this.searchText.toLowerCase()),
              );
            }

            this.closeForm();
          },
          error: (error) => console.error(error),
        });

      return;
    }

    this.employeeService
      .addEmployee(employee)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (newEmployee) => {
          this.employees.unshift(newEmployee);

          if (!this.searchText) {
            this.filteredEmployees = [...this.employees];
          } else {
            this.filteredEmployees = this.employees.filter((emp) =>
              `${emp.firstName} ${emp.lastName}`
                .toLowerCase()
                .includes(this.searchText.toLowerCase()),
            );
          }

          this.closeForm();
        },
        error: (error) => console.error(error),
      });
  }

  deleteEmployee(employee: Employee): void {
    const confirmed = confirm(`Delete ${employee.firstName} ${employee.lastName}?`);

    if (!confirmed) {
      return;
    }

    this.employeeService
      .deleteEmployee(employee.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.employees = this.employees.filter((e) => e.id !== employee.id);

          if (!this.searchText) {
            this.filteredEmployees = [...this.employees];
          } else {
            this.filteredEmployees = this.employees.filter((emp) =>
              `${emp.firstName} ${emp.lastName}`
                .toLowerCase()
                .includes(this.searchText.toLowerCase()),
            );
          }
        },
        error: (error) => console.error(error),
      });
  }

  refreshEmployees(): void {
    this.loadData();
  }
}
