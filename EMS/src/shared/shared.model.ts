import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from './components/modal/modal';
import { EmployeeCard } from './components/employee-card/employee-card';

@NgModule({
  declarations: [],
  imports: [CommonModule, Modal, EmployeeCard],
  exports: [CommonModule, Modal, EmployeeCard],
})
export class SharedModule {}
