import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { WalletService } from '../../wallet.service';
import { TranslationService } from '../../translation.service';

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
})
export class AddWalletComponent implements OnInit {
  @ViewChild('editForm') form: any;
  constructor(private router: Router, private location: Location, private walletService: WalletService, public translationService: TranslationService) { }

  ngOnInit() {
  }

  close() {
    this.location.back();
  }

  next() {
    if (this.form.valid) {
      this.walletService.setAccountDetail({ name: this.form.value.walletName, password: this.form.value.password });
      this.router.navigate([{ outlets: { popup: ['mnemonic'] } }]);
    }
  }
}
