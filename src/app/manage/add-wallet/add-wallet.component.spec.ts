import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWalletComponent } from './add-wallet.component';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { TranslationService } from '../../translation.service';
import { WalletService } from '../../wallet.service';
import { Web3Service } from '../../web3.service';
import { HttpClient, HttpHandler } from '@angular/common/http';


describe('AddWalletComponent', () => {
  let component: AddWalletComponent;
  let fixture: ComponentFixture<AddWalletComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AddWalletComponent],
      providers: [{ provide: Router, useValue: mockRouter }, Location, { provide: LocationStrategy, useClass: PathLocationStrategy },
      { provide: APP_BASE_HREF, useValue: '/page' }, TranslationService, WalletService, Web3Service, HttpClient, HttpHandler,]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
