import { Component, OnInit, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task, TaskResponse } from '../../models/ITask';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TaskComponent } from '../../components/task/task.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../../components/modaldialogcomponent/modaldialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, TaskComponent],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  taskService = inject(TaskService);
  tasks!: TaskResponse[];
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getAll().subscribe((res) => {
      this.tasks = res;
    });
  }
  handleDeleteTask(event: number): void {
    this.taskService.delete(event).subscribe((res) => {
      this.getTasks();
    });
  }

  handleEditTask(task: TaskResponse) {
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: {
        clickedPlace: 'editTask',
        task: task,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (
          task.title == result.title &&
          task.description == result.description
        ) {
          return;
        }
  
       this.getTasks()
      }
    });
  }
}
