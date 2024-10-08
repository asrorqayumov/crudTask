import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SnackBarService } from './services/snackbar.service';
import { SnackbarColors, SnackbarMessage } from './models/Snackbar';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'CRUD-task';
  private snackBar = inject(SnackBarService);
  snackbarMessage: SnackbarMessage | null = null;

  snackbarColors = SnackbarColors;

  
  ngOnInit(): void {

    this.snackBar.snackBar$.subscribe((snackbarMsg) => {
      this.snackbarMessage = snackbarMsg;
      setTimeout(() => {
        this.snackbarMessage = null;
      }, 5000);
    });
  }
}
