import { HostListener, ElementRef, Directive, Attribute, Input } from '@angular/core'

@Directive({
    selector: "[copy]"
})
export class copyDirective {
    @Input() copyValue: string;
    constructor(private el: ElementRef,
    ) {
    }

    @HostListener('click') click() {
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.copyValue;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }
}
