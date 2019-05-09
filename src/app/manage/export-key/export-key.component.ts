import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { WalletService } from '../../wallet.service';
import { Account } from '../../account';
import { TranslationService } from '../../translation.service';

@Component({
  selector: 'app-export-key',
  templateUrl: './export-key.component.html',
})

export class ExportKeyComponent implements OnInit {
  @ViewChild('editForm') form: any;
  sendPassword: boolean = true;
  address: string;
  privateKey: string;
  constructor(private location: Location,
    private walletService: WalletService,
    public translationService: TranslationService) {
  }

  ngOnInit() {
    if (this.location.path().match('(0x)[0-9a-zA-Z]{40}')) {
      this.address = this.location.path().match('(0x)[0-9a-zA-Z]{40}')[0];
    }
  }

  close() {
    this.location.back();
  }
  copyPK() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.privateKey;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  submit() {
    if (this.sendPassword) {
      this.walletService.getAccounts().subscribe(
        (res: Account[]) => {
          const wallet: Account = res.filter(w => w.address == this.address && w.password == this.form.value.password)[0];
          if (wallet) {
            this.privateKey = wallet.privateKey;
            this.sendPassword = false;
          } else {
            this.form.controls['password'].setErrors({ 'incorrect': true });
          }
        }
      )
    } else {

    }
  }
}
