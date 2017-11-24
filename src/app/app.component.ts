import { Component } from '@angular/core';
import { Task } from './model/task.model';
import { isEmpty } from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {

  tasks: Array<Task> = [];
  currentTaskInTextInput: String;

  addNewtask (newTaskName: String) {
    const addedTask = new Task(newTaskName, 'Active');
    if (!isEmpty(newTaskName)) {
      this.tasks.push(addedTask);
      this.currentTaskInTextInput = '';
    }
  }

  removeTask(taskToRemove: String) {
    const indexOfTask = this.tasks.findIndex(task => task.name === taskToRemove);
    this.tasks.splice(indexOfTask, 1);
  }

}
