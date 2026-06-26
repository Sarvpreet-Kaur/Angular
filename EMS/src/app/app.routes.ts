import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Employee } from './pages/employee/employee';
import { Project } from './pages/project/project';
import { ProjectEmployee } from './pages/project-employee/project-employee';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch:'full'},
  {path: 'login', component: Login},
  {path: '', component: Layout,
    children:[
      {path: 'dashboard', component: Dashboard},
      {path: 'employee', component: Employee},
      {path: 'project', component: Project},
      {path: 'projectEmployee', component: ProjectEmployee}
    ]
  }
];
