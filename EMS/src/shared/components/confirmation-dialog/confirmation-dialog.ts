import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Modal } from '../modal/modal';

@Component({
  selector: 'app-confirmation-dialog',

  standalone: true,

  imports: [
    CommonModule,
    Modal
  ],

  templateUrl: './confirmation-dialog.html',

  styleUrls: ['./confirmation-dialog.css']
})
export class ConfirmationDialog {

  @Input()
  isOpen = false;

  @Input()
  title = 'Delete Item';

  @Input()
  message = 'Are you sure you want to delete this item?';

  @Input()
  confirmText = 'Delete';

  @Input()
  cancelText = 'Cancel';

  @Input()
  loading = false;

  @Output()
  confirmed = new EventEmitter<void>();

  @Output()
  cancelled = new EventEmitter<void>();

  onConfirm(): void {

    if (!this.loading) {
      this.confirmed.emit();
    }

  }

  onCancel(): void {

    if (!this.loading) {
      this.cancelled.emit();
    }

  }

}