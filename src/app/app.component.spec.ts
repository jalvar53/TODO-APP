import { AppComponent } from './app.component';
import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';
import { Task } from './model/task.model';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './services/weather.service';

describe('AppComponent created correctly', () => {

  let component: AppComponent;
  let componentFixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  const htmlElement: HTMLElement = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [WeatherService],
    });

    componentFixture = TestBed.createComponent(AppComponent);
    component = componentFixture.componentInstance;
  });

  describe('Given a text input', () => {
    describe('When the user types "Call Susan"', () => {
      it('Then, it should appear in a list item', () => {
        component.addNewtask('Call Susan');

        componentFixture.detectChanges();

        debugElement = componentFixture.debugElement.query(By.css('.active-tasks-container'));
        const itemList: HTMLElement = debugElement.nativeElement;
        expect(itemList.textContent).toContain('Call Susan');
      });
    });
  });

  describe('Given a text input', () => {
    describe('When the user doesn\'t enter anything', () => {
      it('Then, nothing should be added', () => {

        const tasksBeforeAddedBlank: Task[] = component.activatedTasks.slice(0);

        component.addNewtask('');

        componentFixture.detectChanges();

        expect(component.activatedTasks).toEqual(tasksBeforeAddedBlank);
      });
    });
  });

  describe('Given a task', () => {
    describe('When the user click on the X next to the task', () => {
      it('Then, it should remove the task from the view', () => {
        const taskToRemove = '10AM meeting';

        component.addNewtask(taskToRemove);
        componentFixture.detectChanges();

        component.removeTaskFromActiveTasks(taskToRemove);
        componentFixture.detectChanges();

        const removedTask = new Task(taskToRemove, '');

        expect(component.activatedTasks).not.toContain(removedTask);
      });
    });
  });

  describe('Given a task', () => {
    describe('When the user clicks on the "Completed" button', () => {
      it('Then, it should add it to the completed task list', () => {

        const taskToComplete = new Task('Do the sales report', 'Active');
        const taskName = taskToComplete.name;
        component.addNewtask(taskToComplete.name);
        componentFixture.detectChanges();

        component.setAsComplete(taskToComplete.name);
        componentFixture.detectChanges();

        const completedTask = new Task(taskName, 'Completed');

        expect(component.completedTasks).toContain(completedTask);
      });
    });
  });

  describe('Given a task', () => {
    describe('When the user clicks on the "Active" button', () => {
      it('Then, it should add it to the Active task list', () => {

        const taskToActivate = new Task('Wash the car', 'Completed');
        const taskName = taskToActivate.name;
        component.addNewtask(taskName);
        component.setAsComplete(taskName);
        componentFixture.detectChanges();

        component.setAsActive(taskName);
        componentFixture.detectChanges();

        const activatedTast = new Task(taskName, 'Active');

        expect(component.activatedTasks).toContain(activatedTast);
      });
    });
  });

  describe('Given a task', () => {
    describe('When the user clicks on the "Delete" button from the Active List', () => {
      it('Then, it should remove the task from the list', () => {

        let taskToARemove = new Task('Wash the car', 'Active');
        const taskName = taskToARemove.name;
        component.addNewtask(taskName);
        componentFixture.detectChanges();

        taskToARemove = component.removeTaskFromActiveTasks(taskName);
        componentFixture.detectChanges();

        expect(component.activatedTasks).not.toContain(taskToARemove);
      });
    });
  });

  describe('Given a task', () => {
    describe('When the user clicks on the "Delete" button from the Completed List', () => {
      it('Then, it should remove the task from the list', () => {

        let taskToARemove = new Task('Wash the car', 'Active');
        taskToARemove.setStatus('Completed');
        const taskName = taskToARemove.name;
        component.addNewtask(taskName);
        componentFixture.detectChanges();

        taskToARemove = component.removeTaskFromCompletedTasks(taskName);
        componentFixture.detectChanges();

        expect(component.completedTasks).not.toContain(taskToARemove);
      });
    });
  });

});
