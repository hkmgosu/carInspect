
import { Directive, HostListener, ElementRef } from '@angular/core';
@Directive({
    selector: '[upperCase]'
})
export class UppercaseDirective{

    constructor(
        private el: ElementRef
    ){}
  
    @HostListener('keydown') onKeyDown() {
      let input = this.el.nativeElement.querySelector("input");
      input.value = input.value.toUpperCase();
    }
    @HostListener('keyup') onKeyUp() {
      let input = this.el.nativeElement.querySelector("input");
      input.value = input.value.toUpperCase();
    }
}