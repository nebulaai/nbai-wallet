import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { WalletService } from '../../wallet.service';
import { Account } from '../../account';
import { TranslationService } from '../../translation.service';


@Component({
  selector: 'app-export-keystore',
  templateUrl: './export-keystore.component.html',
})
export class ExportKeystoreComponent implements OnInit {
  @ViewChild('editForm') form: any;
  sendPassword: boolean = true;
  keystore: string;
  fileUrl: any;
  download: any;
  private address: string;

  constructor(private location: Location, private walletService: WalletService, public translationService: TranslationService) { }

  ngOnInit() {
    if (this.location.path().match('(0x)[0-9a-zA-Z]{40}')) {
      this.address = this.location.path().match('(0x)[0-9a-zA-Z]{40}')[0];
    }

  }
  close() {
    this.location.back();
  }
  submit() {
    if (this.sendPassword) {
      this.walletService.getAccounts().subscribe(
        (res: Account[]) => {
          const account: Account = res.filter(w => w.address == this.address && w.password == this.form.value.password)[0];
          if (account) {
            this.keystore = JSON.stringify(account.keystore);
            this.sendPassword = false;
          } else {
            this.form.controls['password'].setErrors({ 'incorrect': true });
          }
        }
      );
    } else {
      let keyClose = JSON.parse(this.keystore);
      if (typeof keyClose == 'string') {
        keyClose = JSON.parse(JSON.parse(this.keystore));
      }else{
        keyClose = JSON.parse(this.keystore);
      }
      const keyObject = keyClose;
      window.console.log("123", keyObject.address)
      const blob = new Blob([this.keystore], { type: 'application/json' });
      const file = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const date = new Date();
      const m = date.getMonth() >= 9 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1);
      const d = date.getDate() >= 10 ? date.getDate().toString() : "0" + date.getDate();
      const h = date.getHours() >= 10 ? "h" + date.getHours() : "h0" + date.getHours();
      const min = date.getMinutes() >= 10 ? "m" + date.getMinutes() : "m0" + date.getMinutes();
      const sDate = date.getFullYear().toString() + m + d + h + min;
      link.href = file;
      link.download = `NBAI-UTC-${sDate}-${keyObject.address}`;
      link.click;
      link.dispatchEvent(new MouseEvent('click'));
      window.URL.revokeObjectURL(link.href);
    }
  }
}
