import { Task } from './model/task.model';
import { Weather } from './model/weather.model';
import { isEmpty } from 'underscore';
import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { OnInit, AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit, AfterViewChecked {

  weatherInformation: Weather;
  activatedTasks: Task[] = [];
  completedTasks: Task[] = [];
  currentTaskInTextInput: string;
  newCity: string;
  dataLoaded: boolean = false;
  newCityIdEntered: boolean;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.setCityWeather();
  }

  ngAfterViewChecked(): void {
    if (this.newCityIdEntered) {
      this.setCityWeather();
    }
  }

  setCityWeather(): void {
    this.weatherService.fetchCityWeather()
    .subscribe((weather: Weather) => {
      this.weatherInformation = weather;
      this.dataLoaded = true;
      this.newCityIdEntered = false;
    });
  }

  setNewCity(city: string): void {
    this.newCity = city;
    this.weatherService.setCity(city);
    this.newCity = '';
    this.newCityIdEntered = true;
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
