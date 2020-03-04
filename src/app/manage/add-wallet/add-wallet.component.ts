import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Account } from '../../account';
import { WalletService } from '../../wallet.service';
import { Web3Service } from '../../web3.service';
import { TranslationService } from '../../translation.service';

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
  constructor(
    private router: Router, 
    private location: Location, 
    private walletService: WalletService, 
    private web3Service: Web3Service,
    public translationService: TranslationService) 
    { }

  words: any;
  private newAccount: any;

  ngOnInit() {
    this.words = bip39.generateMnemonic();
    this.walletService.getAccountDetail().subscribe(
      res => {
        this.newAccount = <Account>res;
      }, err => console.log(err)
    );
  }

  close() {
    this.location.back();
  }

  next() {
    if (this.form.valid) {
      this.walletService.setAccountDetail({ name: this.form.value.walletName, password: this.form.value.password });
      this.generateWords();
      this.generateWallet()

    }
  }

  generateWords() {
    try {
      let newAccount = {}
      newAccount['mnemonic'] = this.words;
      this.walletService.setAccountDetail(newAccount);
    } catch (e) {
      console.error(e);
    }
  }

  generateWallet() {
    if (this.form.valid) {
 
      try {
        
        const seed = bip39.mnemonicToSeed(this.words);
        // console.log('seed', seed)
        const hdWallet = hdkey.fromMasterSeed(seed);
        // console.log('hdWallet', hdWallet)
        const key1 = hdWallet.derivePath("m/44'/60'/0'/0/0");
        // console.log('key1', key1)
        const address = util.pubToAddress(key1._hdkey._publicKey, true);
        // console.log('address', address)
        const pkey = util.toChecksumAddress(address.toString('hex'));
        // console.log('pkey', pkey)
        const privateKey = util.bufferToHex(key1._hdkey._privateKey);
        // console.log('privateKey', privateKey)
        const keystore = this.web3Service.encrypt(privateKey, this.newAccount['password']);
        // console.log('keystore', keystore)
        this.newAccount['address'] = pkey;
        this.newAccount['privateKey'] = privateKey;
        this.newAccount['keystore'] = keystore;
        // console.log('newAccount', this.newAccount)

        // console.log('0x95',this.newAccount['address'].substring(0,4))
        // this.newAccount['address']="0x959fd7ef9089b7142b6b908dc3a8af7aa8ff0fa1";
        if(this.newAccount['mnemonic']!=null && this.newAccount['mnemonic']!="" && this.newAccount['address'].substring(0,4)!="0x95"){
          const newAcc = new Account(this.newAccount);
          this.walletService.addAccount(newAcc);
          this.walletService.clearAccountDetail();
          this.downloadKeystore(keystore);
          this.router.navigateByUrl('/dashboard/main');
        }
        else{
          alert("We are sorry. Create wallet failed, please try again.")
        }
      
      } catch (e) {
        console.error(e);
      }
    }
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

  valid() {
    this.form.controls['rePassword'].updateValueAndValidity();
  }
}
