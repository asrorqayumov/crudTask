import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../../services/task.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-create-todo',
  templateUrl: 'createTodo.component.html',
  standalone: true,
  styleUrl: './createTodo.component.css',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatError,
    FormsModule,
    NavbarComponent,
    TranslateModule
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
      if (res) {
        alert('Task created successfully ');
      }
    });
  }
}
