import { navLinkDirective } from './nav-click.directive';
import { Component, DebugElement } from "@angular/core";
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from "@angular/platform-browser";

@Component({
    template: `<li class="navLink active" navLink="navLink">1</li>
    <li class="navLink" id = "click" navLink="navLink">2</li>
    <li class="navLink" navLink="navLink">3</li>
    <li class="navLink" navLink="navLink">4</li>`
})
class TestNavLinkComponent {
}

describe('navLinkDirective', () => {
    let component: TestNavLinkComponent;
    let fixture: ComponentFixture<TestNavLinkComponent>;
    let clickEl: DebugElement;
    let testEl: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestNavLinkComponent, navLinkDirective]
        });
        fixture = TestBed.createComponent(TestNavLinkComponent);
        component = fixture.componentInstance;
        clickEl = fixture.debugElement.query(By.css('#click'));
    });

    it('click element has class name "active"', () => {
        clickEl.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(clickEl.nativeElement.classList).toContain('active');
    });


})