import { Task } from './model/task.model';
import { Weather } from './model/weather.model';
import { isEmpty } from 'underscore';
import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit {

  weatherInformation: Weather;
  activatedTasks: Task[] = [];
  completedTasks: Task[] = [];
  currentTaskInTextInput: string = '';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    const initialCity: string = 'Rio de Janeiro';
    this.setCityWeather(initialCity);
  }

  setCityWeather(newCity : string): void {
    this.weatherService.fetchCityWeather(newCity)
    .subscribe((weather: Weather) => {
      this.weatherInformation = weather;
    });
  }

  addNewtask(newTaskName: string): void {
    const addedTask = new Task(newTaskName, 'Active');
    if (!isEmpty(newTaskName)) {
      this.activatedTasks.push(addedTask);
      this.currentTaskInTextInput = '';
    }
  }

  removeTaskFromActiveTasks(taskToCompleteName: string): Task {
    const indexOfTask = this.findIndexOfTaskByName(taskToCompleteName);
    const taskToComplete = this.activatedTasks.splice(indexOfTask, 1);
    return taskToComplete[0];
  }

  removeTaskFromCompletedTasks(taskToActivateName: string): Task {
    const indexOfTask = this.findIndexOfTaskByName(taskToActivateName);
    const taskToActivate = this.completedTasks.splice(indexOfTask, 1);
    return taskToActivate[0];
  }

  setAsComplete(completedTaskName: string): void {
    const taskToComplete = this.removeTaskFromActiveTasks(completedTaskName);
    taskToComplete.setStatus('Completed');
    this.completedTasks.push(taskToComplete);
  }

  setAsActive(activatedTaskName: string): void {
    const taskToActivate = this.removeTaskFromCompletedTasks(activatedTaskName);
    taskToActivate.setStatus('Active');
    this.activatedTasks.push(taskToActivate);
  }

  findIndexOfTaskByName(taskName: string): number {
    return this.activatedTasks.findIndex(task => task.name === taskName);
  }

}
