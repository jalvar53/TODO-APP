import { Component } from '@angular/core';

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
