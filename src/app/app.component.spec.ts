import { AppComponent } from './app.component';
import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';
import { Task } from './model/task.model';

describe('AppComponent created correctly', () => {

  let component: AppComponent;
  let componentFixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    });

    componentFixture = TestBed.createComponent(AppComponent);
    component = componentFixture.componentInstance;
  });

  describe('Given a main component', () => {
    describe('When creating the component', () => {
      it('Then, the TODO title have to be in the h1 element', () => {
        debugElement = componentFixture.debugElement.query(By.css('h3'));
        htmlElement = debugElement.nativeElement;
        expect(htmlElement.textContent).toContain('TODO App');
      });
    });
  });

  describe('Given a text input', () => {
    describe('When the user types "Call Susan"', () => {
      it('Then, it should appear in a list item', () => {
        component.addNewtask('Call Susan');

        componentFixture.detectChanges();

        debugElement = componentFixture.debugElement.query(By.css('li'));
        const itemList: HTMLElement = debugElement.nativeElement;
        expect(itemList.textContent).toContain('Call Susan');
      });
    });
  });

  describe('Given a text input', () => {
    describe('When the user doesn\'t enter anything', () => {
      it('Then, nothing should be added', () => {

        const tasksBeforeAddedBlank: Task[] = component.tasks.slice(0);

        component.addNewtask('');

        componentFixture.detectChanges();

        expect(component.tasks).toEqual(tasksBeforeAddedBlank);
      });
    });
  });

  describe('Givena task', () => {
    describe('When the user clic on the X next to the task', () => {
      it('Then, it should remove the task from the view', () => {
        const taskToRemove = '10AM meeting';

        component.addNewtask(taskToRemove);
        componentFixture.detectChanges();

        component.removeTask(taskToRemove);
        componentFixture.detectChanges();

        const removedTask = new Task(taskToRemove, '');

        expect(component.tasks).not.toContain(removedTask);
      });
    });
  });

});
