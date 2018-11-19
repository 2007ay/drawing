import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should able to get default text`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const input = fixture.debugElement.nativeElement.querySelector('input');
    fixture.whenStable().then(() => {
      expect(input).toBeTruthy();
      expect(input.value).toBe('C 200 200');
    });
  }));

  it('should able to button click', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.debugElement.componentInstance;
    spyOn(component, 'executeCommand');
    component.inputTex = 'C 200 200';
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.executeCommand).toHaveBeenCalled();
    });
  }));

  it('should render canvas with default width and height', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.debugElement.componentInstance;
    component.inputTex = 'C 200 200';
    fixture.detectChanges();
    const code = component.canvas.draw(component.inputTex);
    expect(component.canvas.drawingBorad.width).toBe(200);
    expect(component.canvas.drawingBorad.width).toBe(200);
    expect(code).toBeUndefined();
  }));

  it('should not render canvas', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.debugElement.componentInstance;
    component.inputTex = 'C200 200';
    fixture.detectChanges();
    const code = component.canvas.draw(component.inputTex);
    expect(code).toBe(3);
  }));

  it('should not render the line, thorow the error code 1', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.debugElement.componentInstance;
    component.inputTex = 'L 0 0 200 200';
    fixture.detectChanges();
    const code = component.canvas.draw(component.inputTex);
    expect(code).toBe(1);
  }));

  it('should render the line', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.debugElement.componentInstance;

    // render the canvas
    component.inputTex = 'C 200 200';
    fixture.detectChanges();
    let code = component.canvas.draw(component.inputTex);
    expect(code).toBeUndefined(1);

    component.inputTex = 'L 0 0 200 200';
    fixture.detectChanges();
    code = component.canvas.draw(component.inputTex);
    expect(code).toBeUndefined();

    const ctx = component.canvas.drawingBorad.getContext('2d');
    const canvas = component.canvas.drawingBorad;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let isData = false;

    for (let i = 0; i < data.length; i++) {
      if (data[i] > 0) {
        isData = true;
        break;
      }
    }
    expect(isData).toBeTruthy();
  }));

  it('should fill with red color', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.debugElement.componentInstance;

    // render the canvas
    component.inputTex = 'C 200 200';
    fixture.detectChanges();
    let code = component.canvas.draw(component.inputTex);
    expect(code).toBeUndefined(1);

    component.inputTex = 'B 200 200 red';
    fixture.detectChanges();
    code = component.canvas.draw(component.inputTex);
    expect(code).toBeUndefined();
    const ctx = component.canvas.drawingBorad.getContext('2d');
    expect(ctx.fillStyle).toBe('#ff0000');
  }));

  it('should rect to default state on Q command', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.debugElement.componentInstance;

    // render the canvas
    component.inputTex = 'Q';
    fixture.detectChanges();
    const code = component.canvas.draw(component.inputTex);
    expect(code).toBe(2);
    expect(component.inputTex).toBe('Q');
  }));
});
