import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExportKeyComponent } from './export-key.component';
import { FormsModule } from '@angular/forms';
import { Location, LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { TranslationService } from '../../translation.service';
import { WalletService } from '../../wallet.service';
import { Web3Service } from '../../web3.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';

describe('ExportKeyComponent', () => {
  let component: ExportKeyComponent;
  let fixture: ComponentFixture<ExportKeyComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExportKeyComponent],
      imports: [FormsModule],
      providers: [{ provide: Router, useValue: mockRouter }, Location, { provide: LocationStrategy, useClass: PathLocationStrategy },
      { provide: APP_BASE_HREF, useValue: '/page' }, TranslationService, WalletService, Web3Service, HttpClient, HttpHandler,]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
