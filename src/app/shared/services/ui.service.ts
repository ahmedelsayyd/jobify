import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  isLoading$ = new BehaviorSubject(false)
  constructor() { }
}
