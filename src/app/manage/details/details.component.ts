import { Component, OnInit } from '@angular/core';
import { Account } from '../../account';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletService } from '../../wallet.service';
import { TranslationService } from '../../translation.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
  account: Account = new Account();
  scanUrl: String = environment.scanUrl;
  constructor(private route: ActivatedRoute,
    private walletService: WalletService,
    private router: Router,
    public translationService: TranslationService) { }

  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('key');
    if (!key) this.router.navigateByUrl("/dashboard/main");
    this.walletService.getAccounts().subscribe(
      (res: Account[]) => {
        if (res && res.length) this.account = res.filter(w => w.address == key)[0];
        else this.router.navigateByUrl("/dashboard/main");
      }, err => this.router.navigateByUrl("/dashboard/main")
    )
  }
  copy(address: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = address;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
