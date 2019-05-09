import { Component, OnInit, ViewChild } from '@angular/core';
import { WalletService } from '../../wallet.service';
import { Account } from '../../account';
import { Web3Service } from '../../web3.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from '../../translation.service';
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  // styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  @ViewChild('editForm') form: any;
  @ViewChild('confirmForm') confirmForm: any;
  accounts: Account[];
  popupConfirm: boolean = false;
  errMsg: string;
  loading: boolean = false;
<<<<<<< HEAD
  showDropDownFrom: boolean = false;
  showDropDownTo: boolean = false;
  counter: number;
  transferAddress: string;
  currentAccount: Account;
  fx: any = { gasLimit: '21000', gasPrice: '10', from: '', value: '', data: '', display: '' };
  tx: any = { gasLimit: '21000', gasPrice: '10', to: '', value: '', data: '', display: '' };

  fromAddress: string;
  toAddress: string;
=======
  showDropDown: boolean = false;
  counter: number;
  transferAddress: string;
  currentAccount: Account;
  tx: any = { gasLimit: '21000', gasPrice: '10', to: '', value: '', data: '', display: '' };

>>>>>>> 18ec62eb8acb39b975e60d24909df21fd721b0a9
  private curAccount: Account;
  private txHash: string;
  constructor(private walletService: WalletService, private web3Service: Web3Service, private router: Router, public translationService: TranslationService, private route: ActivatedRoute) { }

  ngOnInit() {
<<<<<<< HEAD

    this.route.queryParams.subscribe(
      params => {
        if (params['address']) {
          this.transferAddress = params['address'];
          this.walletService.getAccounts().subscribe(
            (wallet: Account[]) => {
              if (wallet.length) {
                this.accounts = wallet;
                this.currentAccount = wallet.filter(w => w.address == this.transferAddress)[0];
                // this.needInput = false;
              }
            }
          );
        } else if (params['addressFrom']) {
          this.transferAddress = params['addressFrom'];
          this.walletService.getAccounts().subscribe(
            (wallet: Account[]) => {
              if (wallet.length) {
                this.accounts = wallet;
                this.currentAccount = wallet.filter(w => w.address == this.transferAddress)[0];
                // console.log('ada', this.currentAccount);                
                // this.needInput = false;
              }
            }
          );
          // if (params['nameTo'] == undefined) {
            this.tx['display'] = params['addressTo'];
          // } 
        }
        else {
          this.walletService.getAccounts().subscribe(
            (wallet: Account[]) => {
              if (wallet.length) {
                this.accounts = wallet;
                // this.currentAccount = wallet.filter(w => w.address == this.transferAddress)[0];              
                // this.needInput = false;
              }
            }
          );
        }
=======
    this.route.queryParams.subscribe(
      params => {
        this.transferAddress = params['address'];
        this.walletService.getAccounts().subscribe(
          (wallet: Account[]) => {
            if (wallet.length) {
              this.accounts = wallet;
              this.currentAccount = wallet.filter(w => w.address == this.transferAddress)[0];
            }
          }
        );
>>>>>>> 18ec62eb8acb39b975e60d24909df21fd721b0a9
      }
    )
  }



  selectAccount() {
  }
  close() {
    this.popupConfirm = false;
  }
  submit() {
    this.curAccount = <Account>this.form.value['account'];
    if (this.form.valid) {
      if (this.tx.display.indexOf(' ') == -1) {
        this.tx.to = this.tx.display;
      }
      this.tx.to = this.tx.to.toLowerCase().indexOf('0x') == 0 ? this.tx.to.trim() : '0x' + this.tx.to.trim();
      if (!this.web3Service.checkAddress(this.tx.to)) {
        this.form.controls['to'].setErrors({ 'incorrect': true });
        return false;
      }
      const amount: number = <number>this.form.value['amount'];
      if (amount > Number(this.curAccount['balance'])) {
        this.form.controls['amount'].setErrors({ 'incorrect': true })
        return false;
      }
      if (this.tx.gasLimit < 21000) {
        this.form.controls['gasLimit'].setErrors({ 'incorrect': true });
        return false;
      }
      this.tx['value'] = amount;

      this.popupConfirm = true;
    }
  }
  confirm() {
    if (this.confirmForm.valid) {
      if (this.confirmForm.value['password'].trim() == this.curAccount['password'].trim()) {
        try {
          this.loading = true;
          this.web3Service.sendSignedTransaction(this.curAccount['address'], this.tx, this.curAccount['privateKey'].substr(2),
            (err, txHash) => {
              if (err) {
                console.log(err);
                this.errMsg = err;
                this.confirmForm.controls['password'].setErrors({ 'incorrect': true });
                this.loading = false;
              }
              this.web3Service.txHash = txHash;
              this.checkTransaction(txHash);
            });
        } catch (e) {
          console.log(e);
          this.loading = false;
        }

      } else this.confirmForm.controls['password'].setErrors({ 'incorrect': true });
    }
  }

  private checkTransaction(txHash) {
    this.web3Service.getTransactionReceipt(txHash).subscribe(
      res => {
        console.log('checking ... ');
        if (!res) { return setTimeout(() => { this.checkTransaction(txHash); }, 2000); }
        else {
          this.loading = false;
          this.router.navigate([{ outlets: { popup: ['finish-transaction'] } }]);
        }
      },
      err => { console.error(err); }
    );
  }


<<<<<<< HEAD
  toggleDropDownFrom(): void {
    this.showDropDownFrom = !this.showDropDownFrom;
  }
  toggleDropDownTo(): void {
    this.showDropDownTo = !this.showDropDownTo;
=======
  toggleDropDown(): void {
    this.showDropDown = !this.showDropDown;
>>>>>>> 18ec62eb8acb39b975e60d24909df21fd721b0a9
  }

  private updateTextBox(index): void {
    let account = this.accounts[index];
    // console.log('account', account);
    this.tx.to = account.address;
    this.tx.display = account.name + '  ' + this.filter(account.address, 10, 10) + '  ' + Number(account.balance).toFixed(2) + ' NBAI';
<<<<<<< HEAD
    this.showDropDownTo = false;
=======
    this.showDropDown = false;
>>>>>>> 18ec62eb8acb39b975e60d24909df21fd721b0a9
  }

  private filter(str: string, first: number, last: number): string {
    if (!str) return '';

    const len = str.length;
    if (first + last >= len) return str;

    const starting = str.substring(0, first);
    const ending = str.substring(len - last, len);
    return `${starting}...${ending}`;
  }

}
