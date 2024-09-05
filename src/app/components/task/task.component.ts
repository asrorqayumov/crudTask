import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { TaskCreateResponse } from '../../models/ITask';
import { TaskService } from '../../services/task.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task',
  imports: [MatButtonModule],
  template: `
    <div class="task-item">
      <h1>{{ task?.title }}</h1>
      <p>{{ task?.description }}</p>

      <div>
        <button (click)="edit()" mat-stroked-button class="editBtn">
          Edit
        </button>
        <button (click)="delete()" mat-stroked-button class="deleteBtn">
          Delete
        </button>
      </div>
    </div>
  `,

  styleUrl: './task.component.css',
  standalone: true,
})
export class TaskComponent implements OnInit {
  @Input() task?: TaskCreateResponse;
  @Output() Deleteemitter = new EventEmitter();
  @Output() editEmitter = new EventEmitter();

  taskService = inject(TaskService);

  ngOnInit() {}

  delete(): void {
    if (this.task?.id) {
      this.Deleteemitter.next(this.task.id);
    }
  }

  edit(): void {
    if (this.task?.id) {
      this.editEmitter.next(this.task);
    }
  }

  
}
