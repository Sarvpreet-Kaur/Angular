import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './modal.html',

  styleUrls: ['./modal.css'],
})
export class Modal {
  @Input()
  title = '';

  @Input()
  isOpen = false;

  @Input()
  width = '650px';

  @Input()
  closeOnBackdrop = true;

  @Output()
  closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }

  onBackdropClick() {
    if (this.closeOnBackdrop) {
      this.close();
    }
  }
}
