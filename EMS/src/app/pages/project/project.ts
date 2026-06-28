import { Component, ChangeDetectorRef, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Project } from '../../../shared/models/project.model';
import { Employee } from '../../../shared/models/employee.model';

import { ProjectService } from '../../services/project.service';
import { EmployeeService } from '../../services/employee.service';

import { ProjectCard } from '../../../shared/components/project-card/project-card';
import { ProjectForm } from '../../../shared/components/project-form/project-form';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, ProjectCard, ProjectForm],
  templateUrl: './project.html',
  styleUrls: ['./project.css'],
})
export class ProjectComponent implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly employeeService = inject(EmployeeService);
  private readonly cdr = inject(ChangeDetectorRef);

  private syncEmployeeProjects(oldProject: Project | null, newProject: Project | null): void {
    console.log('SYNC CALLED');
    console.log('Old:', oldProject);
    console.log('New:', newProject);

    this.employees.forEach((employee) => {
      console.log('Employee:', employee.firstName);
      console.log('Before:', employee.projectId);
      let projectIds = [...employee.projectId];

      // Remove old assignment
      if (oldProject) {
        const wasAssigned = oldProject.employeeIds.includes(employee.id);

        if (wasAssigned) {
          projectIds = projectIds.filter((id) => id !== oldProject.id);
        }
      }

      // Add new assignment
      if (newProject) {
        const isAssigned = newProject.employeeIds.includes(employee.id);

        if (isAssigned && !projectIds.includes(newProject.id)) {
          projectIds.push(newProject.id);
        }
      }
      console.log('After:', projectIds);
      employee.projectId = projectIds;
      console.log('After:', employee.projectId);

      this.employeeService.updateEmployee(employee).subscribe({
        next: (updated) => console.log('Updated', updated),
        error: (err) => console.error(err),
      });
      this.cdr.detectChanges();
    });
  }

  loading = true;

  projects: Project[] = [];
  filteredProjects: Project[] = [];

  employees: Employee[] = [];

  searchText = '';
  selectedStatus = '';
  selectedPriority = '';

  isModalOpen = false;

  editingProject: Project | null = null;
  formMode: 'add' | 'edit' | 'view' = 'add';

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;

        this.projectService.getProjects().subscribe({
          next: (projects) => {
            this.projects = projects;
            this.filteredProjects = [...projects];

            this.loading = false;

            this.cdr.detectChanges();
          },
        });
      },
    });
  }

  filterProjects(): void {
    this.filteredProjects = this.projects.filter((project) => {
      const matchesSearch =
        project.projectName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        project.client.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus = !this.selectedStatus || project.status === this.selectedStatus;

      const matchesPriority = !this.selectedPriority || project.priority === this.selectedPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }

  openCreateModal(): void {
    this.editingProject = null;
    this.formMode = 'add';
    this.isModalOpen = true;
  }

  viewProject(project: Project): void {
    this.editingProject = project;
    this.isModalOpen = true;
    this.formMode = 'view';
  }

  openEditModal(project: Project): void {
    console.log('Original project from modal', project);
    this.editingProject = project;
    this.isModalOpen = true;
    this.formMode = 'edit';
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.formMode = 'add';
    this.editingProject = null;
  }

  saveProject(project: Project): void {
    console.log('Original project', this.editingProject);
    const oldProject = this.editingProject;
    console.log(oldProject);

    if (oldProject) {

      console.log("In if block")
      
      this.projectService.updateProject(project).subscribe({
        next: (updated) => {
          console.log('editingProject before sync', oldProject);
          console.log('updated', updated);
          // Sync employee assignments
          this.syncEmployeeProjects(oldProject, updated);

          const index = this.projects.findIndex((p) => p.id === updated.id);

          if (index !== -1) {
            this.projects[index] = updated;
          }

          this.filterProjects();
          this.cdr.detectChanges();
          this.closeModal();
        },
      });
    } else {
      this.projectService.addProject(project).subscribe({
        next: (created) => {
          // Now the project has a valid ID
          this.syncEmployeeProjects(null, created);

          this.projects.unshift(created);

          this.filterProjects();
          this.cdr.detectChanges();
          this.closeModal();
        },
      });
    }
  }

  deleteProject(project: Project): void {
    if (!confirm(`Delete ${project.projectName}?`)) {
      return;
    }

    this.projectService.deleteProject(project.id).subscribe({
      next: () => {
        // Remove this project from all employees
        this.syncEmployeeProjects(project, null);

        this.projects = this.projects.filter((p) => p.id !== project.id);

        this.filterProjects();
      },
    });
  }

  // getManagerName(id: string): string {

  //   const manager = this.employees.find(
  //     employee => employee.id === id
  //   );

  //   if (!manager) {
  //     return 'Unknown';
  //   }

  //   return `${manager.firstName} ${manager.lastName}`;

  // }

  get totalProjects(): number {
    return this.projects.length;
  }

  get activeProjects(): number {
    return this.projects.filter((p) => p.status === 'In Progress').length;
  }

  get completedProjects(): number {
    return this.projects.filter((p) => p.status === 'Completed').length;
  }

  get onHoldProjects(): number {
    return this.projects.filter((p) => p.status === 'On Hold').length;
  }
}
