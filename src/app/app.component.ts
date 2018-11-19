import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { Canvas } from './canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  @ViewChild('container') containerDiv: ElementRef;

  title = 'Drawing';
  private canvas: Canvas;
  private default = 'C 200 200';
  inputText = this.default;

  ngOnInit(): void {
    this.canvas = new Canvas(this.containerDiv.nativeElement);
  }

  executeCommand(): void {
    const input: string = this.inputText;
    if (input) {
      this.displayMessage(this.canvas.draw(input));
    } else {
      this.displayMessage(0);
    }
    // reset the input on quit;
    const ch = input.charAt(0);
    if (ch === 'Q') {
      this.inputText = this.default;
    }
  }

  displayMessage(code): void {
    switch (code) {
      case 0:
        alert('Please choose a valid command');
        break;
      case 1:
        alert('Please first create canvas');
        break;
      case 2:
        alert('Recreate rect to play around');
        break;
      case 3:
        alert('Invalid argument, Please check instructions');
        break;
      default:
        console.log('thing done!');
    }
  }
}
