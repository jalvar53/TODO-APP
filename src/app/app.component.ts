import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  tasks: Array<String> = [];

  addNewtask (newTask: String) {
    this.tasks.push(newTask);
  }

}
