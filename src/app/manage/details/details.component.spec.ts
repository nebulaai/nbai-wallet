import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details.component';
import { AddressPipe } from '../../directives/address.pipe';
import { Router, RouterModule, ActivatedRoute, convertToParamMap } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
import { TranslationService } from '../../translation.service';
import { WalletService } from '../../wallet.service';
import { Web3Service } from '../../web3.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { copyDirective } from '../../directives/copy.directive';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  let mockRouter = jasmine.createSpyObj('mockRouter', ['navigateByUrl']);

  let mockActivateRouter = {
    snapshot: {
      paramMap: convertToParamMap({
        key: '1234'
      })
    }
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsComponent, AddressPipe, copyDirective],
      providers: [{ provide: Router, useValue: mockRouter }, { provide: ActivatedRoute, useValue: mockActivateRouter },
        TranslationService, WalletService, Web3Service, HttpClient, HttpHandler,],
      imports: [QRCodeModule, RouterModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
