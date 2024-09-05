import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TaskService } from '../../services/task.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TaskCreateResponse } from '../../models/ITask';

@Component({
  selector: 'app-modaldialog',
  templateUrl: 'modaldialog.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    RouterLink,
    ReactiveFormsModule,
    MatError,
    FormsModule,
    MatIconModule,
    MatDividerModule,
    NavbarComponent,
  ],
  styleUrl:'./modaldialog.component.css',
})
export class ModalDialogComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  taskService = inject(TaskService);
  data = inject(MAT_DIALOG_DATA);
  dialog = inject(MatDialog);
  dialogRef = inject(MatDialogRef<ModalDialogComponent>);

  task: TaskCreateResponse = this.data.task;
  form!: FormGroup;

  ngOnInit(): void {
    if (this.data.clickedPlace === 'editTask') {
      this.form = this.formBuilder.group({
        title: [this.task.title, [Validators.required]],
        description: [this.task.description, [Validators.required]],
      });
    }
  }

  onSubmit(): void {
    this.taskService.update(this.task.id, this.form.value).subscribe((res) => {
      if (res) {
        this.dialogRef.close({ newTask: res });
      }
    });
  }
}
