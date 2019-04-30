import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadComponent } from './head.component';
import { Router, NavigationEnd } from '@angular/router';
import { WalletService } from '../wallet.service';
import { TranslationService } from '../translation.service';
import { Web3Service } from '../web3.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('HeadComponent', () => {
  let component: HeadComponent;
  let fixture: ComponentFixture<HeadComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
    events: Observable.of({ url: '/create' })
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeadComponent],
      providers: [WalletService, TranslationService, Web3Service, HttpClient, HttpHandler, { provide: Router, useValue: mockRouter }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
