import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-priority-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './priority-badge.html',
  styleUrls: ['./priority-badge.css']
})
export class PriorityBadge {

  @Input({ required: true })
  priority!: 'High' | 'Medium' | 'Low';

}