import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private subject = new Subject<any>();
  constructor() { }

sendMessage(message: number) {
    this.subject.next({ text: message});
}

clearMessages() {
    this.subject.next();
}

getMessage(): Observable<any> {
    return this.subject.asObservable();
}
}
