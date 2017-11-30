import { Component } from '@angular/core';
import { Task } from './model/task.model';
import { isEmpty } from 'underscore';
import { WeatherService } from './services/weather.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit{

  weather: Object;
  activatedTasks: Task[] = [];
  completedTasks: Task[] = [];
  currentTaskInTextInput: String;
  newCityId: String;
  dataLoaded: boolean = false;
  newCityIdEntered: boolean;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getCityWeatherAsync();
  }

  ngAfterViewChecked(): void {
    if (this.newCityIdEntered) {
      this.getCityWeatherAsync();
    }
  }

  getCityWeatherAsync(): void {
    this.weatherService.getCityWeather()
    .subscribe((weatherData: any) => {
      this.weather = weatherData;
      this.dataLoaded = true;
      this.newCityIdEntered = false;
    });
  }

  setNewCityId(newCityId: String): void {
    this.newCityId = newCityId;
    this.weatherService.setCity(newCityId);
    this.newCityId = '';
    this.newCityIdEntered = true;
  }

  addNewtask(newTaskName: String): void {
    const addedTask = new Task(newTaskName, 'Active');
    if (!isEmpty(newTaskName)) {
      this.activatedTasks.push(addedTask);
      this.currentTaskInTextInput = '';
    }
  }

  removeTaskFromActiveTasks(taskToCompleteName: String): Task {
    const indexOfTask = this.findIndexOfTaskByName(taskToCompleteName);
    const taskToComplete = this.activatedTasks.splice(indexOfTask, 1);
    return taskToComplete[0];
  }

  removeTaskFromCompletedTasks(taskToActivateName: String): Task {
    const indexOfTask = this.findIndexOfTaskByName(taskToActivateName);
    const taskToActivate = this.completedTasks.splice(indexOfTask, 1);
    return taskToActivate[0];
  }

  setAsComplete(completedTaskName: String): void {
    const taskToComplete = this.removeTaskFromActiveTasks(completedTaskName);
    taskToComplete.setStatus('Completed');
    this.completedTasks.push(taskToComplete);
  }

  setAsActive(activatedTaskName: String): void {
    const taskToActivate = this.removeTaskFromCompletedTasks(activatedTaskName);
    taskToActivate.setStatus('Active');
    this.activatedTasks.push(taskToActivate);
  }

  findIndexOfTaskByName(taskName: String): number {
    return this.activatedTasks.findIndex(task => task.name === taskName);
  }

}
