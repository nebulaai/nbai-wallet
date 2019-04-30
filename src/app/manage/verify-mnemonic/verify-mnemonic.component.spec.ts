import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyMnemonicComponent } from './verify-mnemonic.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationService } from '../../translation.service';
import { WalletService } from '../../wallet.service';
import { Web3Service } from '../../web3.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('VerifyMnemonicComponent', () => {
  let component: VerifyMnemonicComponent;
  let fixture: ComponentFixture<VerifyMnemonicComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyMnemonicComponent],
      imports: [FormsModule],
      providers: [{ provide: Router, useValue: mockRouter }, TranslationService, WalletService, Web3Service, HttpClient, HttpHandler]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyMnemonicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
