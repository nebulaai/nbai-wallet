import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../translation.service';
import { Web3Service } from '../../web3.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-finish-transaction',
  templateUrl: './finish-transaction.component.html'
})
export class FinishTransactionComponent implements OnInit {
  scanUrl: String = environment.scanUrl;

  constructor(private router: Router, public translationService: TranslationService, public web3Service: Web3Service) { }

  ngOnInit() {
  }

  close() {
    this.router.navigateByUrl('/dashboard/main');
    this.web3Service.txHash = '';
  }
}
