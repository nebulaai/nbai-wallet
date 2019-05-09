import { HostListener, ElementRef, Directive, Attribute, Renderer2 } from '@angular/core'

@Directive({
    selector: "[navLink]"
})
export class navLinkDirective {
    constructor(private el: ElementRef,
        private renderer: Renderer2,
        @Attribute('navLink') public toClass: string) {
    }

    @HostListener('click') click() {                //console.log('toClass', this.toClass);
        let links = document.querySelectorAll('.' + this.toClass);
        for (let i = 0; i < links.length; i++) {
            this.renderer.removeClass(links[i], 'active');
        }
        if (this.el.nativeElement.classList.contains(this.toClass))
            this.renderer.addClass(this.el.nativeElement, 'active');
        else this.renderer.addClass(links[1], 'active');
    }

}