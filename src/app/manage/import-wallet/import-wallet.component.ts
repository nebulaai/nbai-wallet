import { Component, OnInit, ViewChild } from '@angular/core';
import { Web3Service } from '../../web3.service';
import { WalletService } from '../../wallet.service';
import { Account } from '../../account';
import { Location } from '@angular/common';
import { TranslationService } from '../../translation.service';

@Component({
  selector: 'app-import-wallet',
  templateUrl: './import-wallet.component.html',
})
export class ImportWalletComponent implements OnInit {

  @ViewChild('editForm') form: any;
  @ViewChild('editForm2') form2: any;
  @ViewChild('editForm3') form3: any;
  incorrect: boolean = false;
  file: object = {};
  keyStore: string = null;
  mode: number = 1;
  pagePosition: number = 0;
  accounts = ["ss", "Aa"];
  mnemonicDerivedPk: string;
  mnemonicRestoreClicked: boolean = false;
  mnemonicAccountSelected: boolean = false;


  constructor(private web3Service: Web3Service,
    private walletService: WalletService,
    private location: Location,
    public translationService: TranslationService) { }

  ngOnInit() {
  }
  close() {
    this.location.back();
  }
  submit() {
    if (this.form.valid && this.keyStore) {
      this.addAccount(this.keyStore, null, this.form.value.password);
    }
  }

  submit2() {
    if (this.form2.valid) {
      this.addAccount(null, this.form2.value.privateKey, this.form2.value.password2);
    }
  }

  submit3() {
    if (this.form3.valid && this.mnemonicDerivedPk) {
      this.addAccount(null, this.mnemonicDerivedPk, this.form3.value.password3);
    }
  }

  addAccount(keyStore, privateKey, password) {
    try {
      let account: Account;
      if (keyStore) {
        const keystore: Object = JSON.parse(keyStore.toLowerCase());
        const wallet = this.web3Service.importWallet(keystore, password);
        account = new Account({ address: wallet.address, keystore: keyStore, privateKey: wallet.privateKey, password: password });
      } else if (privateKey) {
        const wallet = this.web3Service.importByPrivateKey(privateKey);
        account = new Account({
          address: wallet.address, keystore: this.web3Service.encrypt(wallet.privateKey,
            password), privateKey: wallet.privateKey, password: password
        });
      }
      this.web3Service.getBalanceSpecial(account).subscribe(
        res => {
          const balance = 0.000000000000000001 * res;
          // console.log('balance', balance);
          account.balance = balance;
            this.walletService.addAccount(account);
        },
        err => {
          this.walletService.addAccount(account);
        });
      this.location.back();
    } catch (e) {
      console.log(e);
      this.incorrect = true;
    }
  }

  handleFileInput(files: FileList) {
    if (files[0] && files[0]['name']) {
      this.file['name'] = files[0]['name'];
      const reader = new FileReader();
      reader.onloadend = (evt) => {
        let binary = ""
        let bytes = new Uint8Array(evt.target['result']);
        let length = bytes.byteLength;
        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        this.keyStore = binary;
      }
      reader.readAsArrayBuffer(files[0]);
      if (files[0]['size'] > 1024 * 1024) {
        this.file['valid'] = false;
      } else this.file['valid'] = true;
    }
  }

  restoreMnemonic() {
    let mnemonic = this.form3.value.mnemonic;
    this.accounts = this.web3Service.generateAddressesFromSeed(mnemonic, this.pagePosition);
    this.accounts.forEach(element => {
      let account: Account = new Account();
      account['address'] = element['address'];
      this.getAccountBalance(account, balance => {
        element['balance'] = balance;
      })
    });
  }


  toPrevious() {
    if (this.pagePosition >= 1) {
      this.pagePosition--;
    }
  }

  toNext() {
    this.pagePosition++;
  }

  selectAccount(account: any) {
    this.mnemonicAccountSelected = true;
    this.mnemonicDerivedPk = account.privateKey;
  }

  private getAccountBalance(acc: Account, callback) {
    this.web3Service.getBalance(acc, (balance) => {
      callback(balance);
    });
  }

  clearError(){
    if(this.incorrect){
      this.incorrect = false;
    }
  }


  
}
