import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Project } from '../../models/project.model';
import { PriorityBadge } from '../priority-badge/priority-badge';
import { StatusPill } from '../status-pill/status-pill';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, PriorityBadge, StatusPill],
  templateUrl: './project-card.html',
  styleUrls: ['./project-card.css'],
})
export class ProjectCard {
  @Input({ required: true })
  project!: Project;

  @Input()
  managerName = '';

  @Input()
  teamSize = 0;

  @Output()
  view = new EventEmitter<Project>();

  @Output()
  edit = new EventEmitter<Project>();

  @Output()
  delete = new EventEmitter<Project>();
}
