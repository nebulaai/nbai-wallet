import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferComponent } from './transfer.component';
import { FormsModule } from '@angular/forms';
import { AddressPipe } from '../../directives/address.pipe';
import { TranslationService } from '../../translation.service';
import { WalletService } from '../../wallet.service';
import { Web3Service } from '../../web3.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

describe('TransferComponent', () => {
  let component: TransferComponent;
  let fixture: ComponentFixture<TransferComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }
  let mockActivateRouter = {
    queryParams: Observable.of({params: {address: '1234'}})
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransferComponent, AddressPipe],
      imports: [FormsModule],
      providers: [TranslationService, WalletService, Web3Service, HttpClient, HttpHandler, { provide: Router, useValue: mockRouter }
        , { provide: ActivatedRoute, useValue: mockActivateRouter }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
