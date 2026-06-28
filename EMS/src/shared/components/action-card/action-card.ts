import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-card.html',
  styleUrls: ['./action-card.css']
})
export class ActionCard {

  @Input({ required: true })
  title!: string;

  @Input()
  description = '';

  @Input()
  actionText = 'Open';

  @Output()
  action = new EventEmitter<void>();

  onAction(): void {
    this.action.emit();
  }

}