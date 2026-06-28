import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../shared/models/project.model';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = environment.apiUrl + '/Projects';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${project.id}`, project);
  }

  deleteProject(id: string): Observable<Project> {
    return this.http.delete<Project>(`${this.apiUrl}/${id}`);
  }
}
