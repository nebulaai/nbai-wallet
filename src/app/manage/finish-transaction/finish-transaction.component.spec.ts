import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FinishTransactionComponent } from './finish-transaction.component';
import { FormsModule } from '@angular/forms';
import { Location, LocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { TranslationService } from '../../translation.service';
import { WalletService } from '../../wallet.service';
import { Web3Service } from '../../web3.service';

describe('FinishTransactionComponent', () => {
  let component: FinishTransactionComponent;
  let fixture: ComponentFixture<FinishTransactionComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinishTransactionComponent],
      imports: [FormsModule],
      providers: [Location, LocationStrategy, TranslationService, WalletService, Web3Service, { provide: Router, useValue: mockRouter }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
