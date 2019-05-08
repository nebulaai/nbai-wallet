import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageComponent } from './manage.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslationService } from '../translation.service';
import { WalletService } from '../wallet.service';
import { Web3Service } from '../web3.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ManageComponent', () => {
  let component: ManageComponent;
  let fixture: ComponentFixture<ManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [TranslationService, WalletService, Web3Service, HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
