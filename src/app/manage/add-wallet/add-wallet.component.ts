import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location, APP_BASE_HREF } from '@angular/common';
import { WalletService } from '../../wallet.service';
import { TranslationService } from '../../translation.service';
import { Account } from '../../account';
import { Web3Service } from '../../web3.service';


declare let require: any;
const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/dist/hdkey');
const util = require('ethereumjs-util');

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
})
export class AddWalletComponent implements OnInit {
  @ViewChild('editForm') form: any;
  words: any;
  loading: boolean = false;
  errMsg: string;
  private newAccount: any;
  constructor(private router: Router, 
              private web3Service: Web3Service,
              private location: Location, 
              private walletService: WalletService, 
              public translationService: TranslationService) { }

  ngOnInit() {
    this.walletService.getAccountDetail().subscribe(
      res => {
        this.newAccount = <Account>res;
      }, err => console.log(err)
    );
  }

  close() {
    this.location.back();
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
    window.location.reload()
  }

  autoLogout() {
    let lastTime = new Date().getTime();
    let currentTime = new Date().getTime();
    let timeOut = 30 * 60 * 1000;   //set period is 30 mins;
    // let timeOut =  2*5000;   //set period is 10 seconds;
    document.onmouseover = function() {
      lastTime = new Date().getTime();
    };
    let interTime = setInterval(() => {
      currentTime = new Date().getTime();
      if (currentTime - lastTime > timeOut) {
        clearInterval(interTime);
        // console.log('timeout, leave!');
        window.location.reload();
      }
    }, 1000);

}

  next() {
    if (this.form.valid) {
      this.walletService.setAccountDetail({ name: this.form.value.walletName, password: this.form.value.password });
      // this.router.navigate([{ outlets: { popup: ['mnemonic'] } }]);
      this.words = bip39.generateMnemonic();
      this.walletService.getAccountDetail().subscribe(
        res => {
          this.newAccount = <Account>res;
        }, err => console.log(err)
      );
      try {
        let newAccount = {}
        newAccount['mnemonic'] = this.words;
        this.walletService.setAccountDetail(newAccount);
        // this.router.navigate([{ outlets: { popup: ['verify-mnemonic'] } }]);
      } catch (e) {
        console.error(e);
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
        // this.router.navigateByUrl('/dashboard/main');
        window.location.reload()
      } catch (e) {
        console.error(e);
        this.loading = false;
      }

    }
  }
  valid() {
    this.form.controls['rePassword'].updateValueAndValidity();
  }
}
