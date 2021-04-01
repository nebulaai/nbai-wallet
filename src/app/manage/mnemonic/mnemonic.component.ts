import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WalletService } from '../../wallet.service';
import { TranslationService } from '../../translation.service';
declare let require: any;
const bip39 = require('bip39');

@Component({
  selector: 'app-mnemonic',
  templateUrl: './mnemonic.component.html'
})
export class MnemonicComponent implements OnInit {

  words: any;
  constructor(private router: Router, private walletService: WalletService, public translationService: TranslationService) { }

  ngOnInit() {
    this.words = bip39.generateMnemonic();
  }

  close() {
    this.router.navigateByUrl('/dashboard/main')
  }
  next() {
    try {
      let newAccount = {}
      newAccount['mnemonic'] = this.words;
      this.walletService.setAccountDetail(newAccount);
      this.router.navigate([{ outlets: { popup: ['verify-mnemonic'] } }]);
    } catch (e) {
      console.error(e);
    }
    
  }
}
