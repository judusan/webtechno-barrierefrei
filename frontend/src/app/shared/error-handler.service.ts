import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private errorSubject = new Subject<string>();
  error$ = this.errorSubject.asObservable();

  constructor() { }

  showError(message: string) {
    this.errorSubject.next(message);
  }
}
