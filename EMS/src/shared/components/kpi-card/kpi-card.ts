import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-card.html',
  styleUrls: ['./kpi-card.css']
})
export class KpiCard {

  @Input({ required: true })
  title!: string;

  @Input({ required: true })
  value!: string | number;

  @Input()
  subtitle = '';

  @Input()
  trend = '';

  @Input()
  trendPositive = true;

  @Input()
  icon: 'employees' | 'projects' | 'active' | 'leave' | 'payroll' = 'employees';

}