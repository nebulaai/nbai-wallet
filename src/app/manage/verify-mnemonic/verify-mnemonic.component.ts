import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WalletService } from '../../wallet.service';
import { Account } from '../../account';
import { Web3Service } from '../../web3.service';
import { TranslationService } from '../../translation.service';

declare let require: any;
const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/dist/hdkey');
const util = require('ethereumjs-util');

@Component({
  selector: 'app-verify-mnemonic',
  templateUrl: './verify-mnemonic.component.html',
})
export class VerifyMnemonicComponent implements OnInit {
  @ViewChild('editForm') form: any;
  loading: boolean = false;
  errMsg: string;
  private newAccount: any;
  constructor(
    private router: Router,
    private walletService: WalletService,
    private web3Service: Web3Service,
    public translationService: TranslationService) { }

  ngOnInit() {
    this.walletService.getAccountDetail().subscribe(
      res => {
        this.newAccount = <Account>res;
      }, err => console.log(err)
    );

  }
  close() {
    this.router.navigateByUrl('/dashboard/main');
  }
  next() {
    if (this.form.valid) {
      if (!this.compareStr(this.form.value.mnemonic, this.newAccount['mnemonic'])) {
        this.errMsg = "mnemonic invalid";
        return;
      }
      try {
        this.loading = true;
        const seed = bip39.mnemonicToSeed(this.form.value.mnemonic);
        const hdWallet = hdkey.fromMasterSeed(seed);
        const key1 = hdWallet.derivePath("m/44'/60'/0'/0/0");
        const address = util.pubToAddress(key1._hdkey._publicKey, true);
        const pkey = util.toChecksumAddress(address.toString('hex'));
        const privateKey = util.bufferToHex(key1._hdkey._privateKey);
        const keystore = this.web3Service.encrypt(privateKey, this.newAccount['password']);
        this.newAccount['address'] = pkey;
        this.newAccount['privateKey'] = privateKey;
        this.newAccount['keystore'] = keystore;
        const newAcc = new Account(this.newAccount);
        this.walletService.addAccount(newAcc);
        this.walletService.clearAccountDetail();
        this.downloadKeystore(keystore);
        this.loading = false;
        this.router.navigateByUrl('/dashboard/main');
      } catch (e) {
        console.error(e);
        this.loading = false;
      }
    }
  }

  private compareStr(m1: string, m2: string): boolean {
    const mArr1 = m1.trim().split(/\s+/g);
    const mArr2 = m2.trim().split(/\s+/g);
    if (mArr1.length !== mArr2.length) return false;
    for (let i = 0; i < mArr1.length; i++) {
      if (mArr1[i] !== mArr2[i]) return false;
    }
    return true;
  }
  private downloadKeystore(keystore: object) {
    const keystring = JSON.stringify(keystore);
    const blob = new Blob([keystring], { type: 'application/json' });
    const file = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = file;
    const date = new Date();
    const m = date.getMonth() >= 9 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1);
    const d = date.getDate() >= 10 ? date.getDate().toString() : "0" + date.getDate();
    const h = date.getHours() >= 10 ? "h" + date.getHours() : "h0" + date.getHours();
    const min = date.getMinutes() > 10 ? "m" + date.getMinutes() : "m0" + date.getMinutes();
    const sDate = date.getFullYear().toString() + m + d + h + min;
    link.download = `NBAI-UTC-${sDate}-${keystore['address']}`;
    link.dispatchEvent(new MouseEvent('click'));
    window.URL.revokeObjectURL(link.href);
  }

}
