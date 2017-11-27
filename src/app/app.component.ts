import { Component } from '@angular/core';
import { Task } from './model/task.model';
import { isEmpty } from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {

  activatedTasks: Array<Task> = [];
  completedTasks: Array<Task> = [];
  currentTaskInTextInput: String;

  addNewtask(newTaskName: String) {
    const addedTask = new Task(newTaskName, 'Active');
    if (!isEmpty(newTaskName)) {
      this.activatedTasks.push(addedTask);
      this.currentTaskInTextInput = '';
    }
  }

  removeTaskFromActiveTasks(taskToCompleteName: String) {
    const indexOfTask = this.findIndexOfTaskByName(taskToCompleteName);
    const taskToComplete = this.activatedTasks.splice(indexOfTask, 1);
    return taskToComplete[0];
  }

  removeTaskFromCompletedTasks(taskToActivateName: String) {
    const indexOfTask = this.findIndexOfTaskByName(taskToActivateName);
    const taskToActivate = this.completedTasks.splice(indexOfTask, 1);
    return taskToActivate[0];
  }

  setAsComplete(completedTaskName: String) {
    const taskToComplete = this.removeTaskFromActiveTasks(completedTaskName);
    taskToComplete.setStatus('Completed');
    this.completedTasks.push(taskToComplete);
  }

  setAsActive(activatedTaskName: String) {
    const taskToActivate = this.removeTaskFromCompletedTasks(activatedTaskName);
    taskToActivate.setStatus('Active');
    this.activatedTasks.push(taskToActivate);
  }

  findIndexOfTaskByName(taskName: String) {
    return this.activatedTasks.findIndex(task => task.name === taskName);
  }

}
