import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { EmployeeComponent } from './pages/employee/employee';
import { ProjectComponent } from './pages/project/project';
import { ProjectEmployeeComponent } from './pages/project-employee/project-employee';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch:'full'},
  {path: 'login', component: Login},
  {path: '', component: Layout,
    children:[
      {path: 'dashboard', component: Dashboard},
      {path: 'employee', component: EmployeeComponent},
      {path: 'project', component: ProjectComponent},
      {path: 'projectEmployee', component: ProjectEmployeeComponent}
    ]
  }
];
