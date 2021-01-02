import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Keyboard from 'simple-keyboard';

@Component({
  selector: 'app-numeric-keyboard',
  templateUrl: './numeric-keyboard.component.html',
  styleUrls: [
    "../../../../../node_modules/simple-keyboard/build/css/index.css",
    './numeric-keyboard.component.css'
  ],
  encapsulation: ViewEncapsulation.None,

})
export class NumericKeyboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  value = "";
  keyboard: Keyboard;

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      theme: "hg-theme-default myTheme1",
      layout: {
        default: ['1 2 3', '4 5 6', '7 8 9', '. 0 {bksp}']
      },
      display: {
        '{bksp}': '⌫'
      },

    });
  }

  onChange = (input: string) => {
    this.value = input;
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

}
