/*
 * Numeric keyboard : A reusable component to implement a numeric simple keyboard
 * Author: Mojdeh Bahadorpour
 */

import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import Keyboard from 'simple-keyboard';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-numeric-keyboard',
  templateUrl: './numeric-keyboard.component.html',
  styleUrls: [
    '../../../../../node_modules/simple-keyboard/build/css/index.css',
    './numeric-keyboard.component.css'
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NumericKeyboardComponent implements AfterViewInit {

  value = '';
  keyboard: Keyboard;

  constructor(private shareDataService: ShareDataService) { }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      theme: 'hg-theme-default grayTheme',
      layout: {
        default: ['7 8 9', '4 5 6', '1 2 3', '{bksp} 0']
      },
      display: {
        '{bksp}': '⌫'
      },
      maxLength: 6
    });
  }

  onChange = (input: string) => {
    this.value = input;
    this.shareDataService.updateNumKeyboards(input);
  }

  onKeyPress = (button: string) => {
    // console.log('Button pressed', button);

    // If you want to handle the shift and caps lock buttons
    if (button === '{shift}' || button === '{lock}') { this.handleShift(); }
  }

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  }

  handleShift = () => {
    const currentLayout = this.keyboard.options.layoutName;
    const shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  }
}
