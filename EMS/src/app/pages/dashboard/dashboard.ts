import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { ProjectService } from '../../services/project.service';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../../shared/models/employee.model';
import { Project } from '../../../shared/models/project.model';

import { KpiCard } from '../../../shared/components/kpi-card/kpi-card';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, KpiCard],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
  private employeeService = inject(EmployeeService);
  private projectService = inject(ProjectService);
  private router = inject(Router);
  // State

  loading = false;
  employees: Employee[] = [];
  projects: Project[] = [];
  activeProjects: Project[] = [];
  formMode: 'add' | 'edit' | 'view' = 'add';
  isModalOpen = false;

  editingProject: Project | null = null;

  // KPI

  totalEmployees = 0;
  totalProjects = 0;
  activeEmployees = 0;
  completedProjects = 0;

  // Lifecycle
  constructor(private cdr: ChangeDetectorRef) {
    console.log('Dashboard constructor');
  }

  ngOnInit(): void {
    console.log('Dashboard ngOnInit');
    this.loadDashboard();
  }

  // Data

  // loadDashboard(): void {
  //   this.loading = true;
  //   forkJoin({
  //     employees: this.employeeService.getEmployees(),
  //     projects: this.projectService.getProjects(),
  //   }).subscribe({
  //     next: ({ employees, projects }) => {
  //       this.employees = employees;
  //       this.projects = projects;
  //       this.calculateStatistics();
  //       this.loading = false;
  //     },

  //     error: () => {
  //       this.loading = false;
  //     },
  //   });
  // }
  loadDashboard(): void {
    console.log('Dashboard loading...');

    forkJoin({
      employees: this.employeeService.getEmployees(),
      projects: this.projectService.getProjects(),
    }).subscribe({
      next: ({ employees, projects }) => {
        console.log('Employees received:', employees);
        console.log('Projects received:', projects);

        this.employees = employees;
        this.projects = projects;

        console.log('Calling calculateStatistics()');

        this.calculateStatistics();

        console.log('Finished calculateStatistics()');

        this.loading = false;
        console.log('_Loading = false');
        // alert('Loading value after assignment = ' + this.loading);
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('Dashboard Error:', err);
        alert('ERROR: ' + JSON.stringify(err));
        this.loading = false;
      },
    });
  }
  // Dashboard Stats

  calculateStatistics(): void {
    this.totalEmployees = this.employees.length;
    this.totalProjects = this.projects.length;
    this.activeEmployees = this.employees.filter((employee) => employee.status === 'Active').length;
    this.completedProjects = this.projects.filter(
      (project) => project.status === 'Completed',
    ).length;

    // this.recentEmployees = [...this.employees]
    //   .sort((a, b) => (b.joiningDate).getTime() - (a.joiningDate).getTime())
    //   .slice(0, 4);

    this.activeProjects = this.projects
      .filter((project) => project.status !== 'Completed')
      .slice(0, 4);
  }

  // Helpers

  // getManagerName(managerId: string): string {
  //   const manager = this.employees.find((employee) => employee.id === managerId);
  //   if (!manager) {
  //     return 'Unknown';
  //   }
  //   return `${manager.firstName} ${manager.lastName}`;
  // }

  getTeamSize(project: Project): number {
    return project.teamSize;
  }

  get employeeGrowth(): string {
    return '+12%';
  }

  get projectGrowth(): string {
    return '+6%';
  }

  // Navigation

  goToEmployees(): void {
    this.router.navigate(['/employees']);
  }

  goToProjects(): void {
    this.router.navigate(['/projects']);
  }

  openCreateModal(): void {
    this.editingProject = null;
    this.formMode='add'
    this.isModalOpen = true;
  }

  viewProject(project: Project): void {
    this.editingProject=project;
    this.isModalOpen=true
    this.formMode='view'

  }

  openEditModal(project: Project): void {
    this.editingProject = project;
    this.isModalOpen = true;
    this.formMode='edit'
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.formMode='add'
    this.editingProject = null;
  }

  
}
