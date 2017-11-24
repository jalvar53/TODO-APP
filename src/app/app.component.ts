import { Component } from '@angular/core';
import { Task } from './model/task.model';
import { isEmpty } from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {

  tasks: Array<Task> = [];

  addNewtask (newTaskName: String) {
    const addedTask = new Task(newTaskName, 'Active');
    if (!isEmpty(newTaskName)) {
      this.tasks.push(addedTask);
    }
  }

  removeTask(taskToRemove: String) {
    const indexOfTask = this.tasks.findIndex(task => task.name === taskToRemove);
    this.tasks.splice(indexOfTask, 1);
  }

}
