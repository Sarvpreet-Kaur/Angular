import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';

@Component({
  selector: 'app-status-pill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-pill.html',
  styleUrls: ['./status-pill.css']
})
export class StatusPill {

  private readonly _status = signal('');

  @Input({ required: true })
  set status(value: string) {
    this._status.set(value ?? '');
  }

  readonly statusText = computed(() => this._status());

  readonly statusClass = computed(() => {
    switch (this._status().toLowerCase()) {
      case 'active':
        return 'active';

      case 'inactive':
        return 'inactive';

      case 'on leave':
        return 'leave';

      case 'completed':
        return 'completed';

      case 'pending':
        return 'pending';

      case 'in progress':
        return 'progress';

      case 'delayed':
        return 'delayed';

      default:
        return 'default';
    }
  });

}