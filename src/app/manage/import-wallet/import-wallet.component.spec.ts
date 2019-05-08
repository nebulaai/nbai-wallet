import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportWalletComponent } from './import-wallet.component';
import { FormsModule } from '@angular/forms';
import { AddressPipe } from '../../directives/address.pipe';
import { Router } from '@angular/router';
import { TranslationService } from '../../translation.service';
import { WalletService } from '../../wallet.service';
import { Web3Service } from '../../web3.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Location, LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';


describe('ImportWalletComponent', () => {
  let component: ImportWalletComponent;
  let fixture: ComponentFixture<ImportWalletComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImportWalletComponent, AddressPipe],
      imports: [FormsModule],
      providers: [{ provide: Router, useValue: mockRouter }, TranslationService, WalletService, Web3Service, HttpClient, HttpHandler, Location,
      { provide: LocationStrategy, useClass: PathLocationStrategy },
      { provide: APP_BASE_HREF, useValue: '/page' },]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
