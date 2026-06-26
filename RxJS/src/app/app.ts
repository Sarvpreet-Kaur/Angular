import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { RxJSOperator } from './rx-jsoperator/rx-jsoperator';
import { RxjsDemo } from './rxjs-demo/rxjs-demo';
import { CombinedObservable } from "./combined-observable/combined-observable";
import { ReactiveForm } from './reactive-form/reactive-form';
import { Unsubscribe } from './unsubscribe/unsubscribe';

@Component({
  selector: 'app-root',
  imports: [RxJSOperator, RxjsDemo, CombinedObservable, ReactiveForm, Unsubscribe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('RxJS');
}
