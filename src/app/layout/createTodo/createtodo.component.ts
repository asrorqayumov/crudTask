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

@Component({
  selector: 'app-create-todo',
  templateUrl: 'createTodo.component.html',
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
 NavbarComponent
  ],
})
export class CreateTodoComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  taskService = inject(TaskService);

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.taskService.create(this.form.value).subscribe((res) => {
        console.log(res);

        if (res) {
            alert('Task created successfully ');
           
        }

    });
  }
}
