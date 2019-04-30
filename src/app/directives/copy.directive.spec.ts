import { copyDirective } from './copy.directive'
import { Component, DebugElement } from "@angular/core";
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from "@angular/platform-browser";

@Component({
    template: '<a href="javascript:;" id = "copyTest" copyValue = "test"></a>'
})
class TestCopyComponent {
}

describe('copyDirective', () => {
    let fixture: ComponentFixture<TestCopyComponent>;
    let clickEl: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestCopyComponent, copyDirective]
        });
        fixture = TestBed.createComponent(TestCopyComponent);
        clickEl = fixture.debugElement.query(By.css('#copyTest'));
    });

    it('should get the copy value', () => {
        expect(clickEl.attributes.copyValue).toBe('test');
    });
})