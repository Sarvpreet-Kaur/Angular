import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-card.html',
  styleUrls: ['./employee-card.css']
})
export class EmployeeCard {

  @Input({ required: true })
  employee!: Employee;

}