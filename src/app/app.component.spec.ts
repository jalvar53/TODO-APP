import { AppComponent } from "./app.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement } from "@angular/core/src/debug/debug_node";
import { By } from "@angular/platform-browser";

describe('AppComponent created correctly', () => {

  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent]
    })

    fixture = TestBed.createComponent(AppComponent);

    comp = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  })

  it('Should check if the component exists', () => {
    expect(comp).toBeDefined();
  })

  it('Should have a TODO title', () => {
    expect(el.textContent).toContain('TODO App');
  })

})
