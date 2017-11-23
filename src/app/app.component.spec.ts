import { AppComponent } from "./app.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement } from "@angular/core/src/debug/debug_node";
import { By } from "@angular/platform-browser";

describe('AppComponent created correctly', () => {

  let component: AppComponent;
  let componentFixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent]
    })

    componentFixture = TestBed.createComponent(AppComponent);
    component = componentFixture.componentInstance;
  })

  it('Given a main component', () => {
    it('When creating the component', () => {
      it('Then, the TODO title have to be in the h1 element'), () => {
        debugElement = componentFixture.debugElement.query(By.css('h1'));
        let h1Element = debugElement.nativeElement;
        expect(h1Element.textContent).toContain('TODO App');
      }
    })
  })

  it('Given a text input', () => {
    it('When the user types "Call Susan"', () => {
      it('Then, it should appear in a list item', () =>{
        component.addNewtask('Call Susan');

        componentFixture.detectChanges();
        debugElement = componentFixture.debugElement.query(By.css('li'));
        let listItem: HTMLElement = debugElement.nativeElement;

        expect(listItem.textContent).toContain('Call Susan');
      })
    })
  });
})
