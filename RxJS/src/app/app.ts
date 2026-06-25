import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { RxJSOperator } from './rx-jsoperator/rx-jsoperator';
import { RxjsDemo } from './rxjs-demo/rxjs-demo';

@Component({
  selector: 'app-root',
  imports: [RxJSOperator, RxjsDemo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('RxJS');
}
