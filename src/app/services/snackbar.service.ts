import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SnackbarMessage } from '../models/Snackbar';

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  snackBar$ = new BehaviorSubject<SnackbarMessage | null>(null);
}
