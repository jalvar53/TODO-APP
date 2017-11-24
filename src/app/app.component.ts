import { Component } from '@angular/core';
import { Task } from './model/task.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {

  tasks: Array<Task> = [];

  addNewtask (newTaskName: String) {
    const addedTask = new Task(newTaskName, 'Active');
    if (!this.inputIsEmpty(newTaskName)) {
      this.tasks.push(addedTask);
    }
  }

  removeTask(taskToRemove: String) {
    const indexOfTask = this.tasks.findIndex(x => x.name === taskToRemove);
    this.tasks.splice(indexOfTask, 1);
  }

  inputIsEmpty(input: String) {
    if (input === '') {
      return true;
    }
    return false;
  }

}
