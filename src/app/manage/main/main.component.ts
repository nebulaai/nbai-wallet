import { Component, OnInit, Output } from '@angular/core';
import { WalletService } from '../../wallet.service';
import { Account } from '../../account';
<<<<<<< HEAD
import { ActivatedRoute, Router } from '@angular/router';
import { Web3Service } from '../../web3.service';
=======
import { Router } from '@angular/router';
>>>>>>> 18ec62eb8acb39b975e60d24909df21fd721b0a9
import { EventEmitter } from 'events';
import { environment } from '../../../environments/environment';
import { TranslationService } from '../../translation.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  accounts: Array<Account>;
  linkNum: number = 1;
  transactions: Array<object> = [];
  names: String[] = [];
  empty: boolean = true;
  isMore: boolean = false;
  scanUrl: String = environment.scanUrl;

  @Output() open = new EventEmitter();
<<<<<<< HEAD
  constructor(private route: ActivatedRoute, 
              private walletService: WalletService, 
              private web3Service: Web3Service, 
              private router: Router,
              public translationService: TranslationService) { 
              }
=======
  constructor(private walletService: WalletService,
    private router: Router,
    public translationService: TranslationService) {
  }
>>>>>>> 18ec62eb8acb39b975e60d24909df21fd721b0a9

  ngOnInit() {

    this.walletService.getAccounts().subscribe(
      (res: Account[]) => {
        if (res.length) {
          this.accounts = res;
          this.transactions = [];
          let addresses = '';
          let names = [];
          for (let account of this.accounts) {
            addresses += account.address + ',';
            names.push(account.name);
          }
          addresses = addresses.substring(0, addresses.length - 1);
          this.walletService.getRecentTransaction(addresses, 20, 0).subscribe(
            res => {
              if (res && res['result']) {
                this.isMore = res['tx_count'] > 20 ? true : false;
                res['result'].forEach(transaction => {
                  transaction['value'] = transaction['value'] / 1000000000000000000
                  this.accounts.forEach(account => {
                    if (account['address'].toLowerCase() == transaction['t_from'].toLowerCase()) {
                      transaction['fromNick'] = account['name'];
                      if (transaction['type'] == 1 || transaction['type'] == 3) {
                        transaction['name'] = account['name'];
                      }
                    }
                    if (account['address'].toLowerCase() == transaction['t_to'].toLowerCase()) {
                      transaction['toNick'] = account['name'];
                      if (transaction['type'] == 2) {
                        transaction['name'] = account['name'];
                      }
                    }
                  });
                  this.transactions.push(transaction);
                })

              }
            }, err => console.log(err)
          );
        } else this.accounts = [];
      }, err => console.error(err)
    );

  }
  openPopup(url, num) {
    this.linkNum = num;
    this.router.navigate([{ outlets: { popup: [url] } }]);
  }
  refresh(acc: Account) {
    this.walletService.refreshAccount(acc);
  }

  refreshTransaction() {
    this.walletService.getAccounts().subscribe(
      (res: Account[]) => {
        if (res.length) {
          this.transactions = [];
          let addresses = '';
          for (let account of this.accounts) {
            addresses += account.address + ',';
          }
          addresses = addresses.substring(0, addresses.length - 1);
          this.walletService.getRecentTransaction(addresses, 20, 0).subscribe(
            res => {
              if (res && res['result']) {
                this.isMore = res['tx_count'] > 20 ? true : false;
                res['result'].forEach(transaction => {
                  transaction['value'] = transaction['value'] / 1000000000000000000
                  this.accounts.forEach(account => {
                    if (account['address'].toLowerCase() == transaction['t_from'].toLowerCase()) {
                      transaction['fromNick'] = account['name'];
                      if (transaction['type'] == 1 || transaction['type'] == 3) {
                        transaction['name'] = account['name'];
                      }
                    }
                    if (account['address'].toLowerCase() == transaction['t_to'].toLowerCase()) {
                      transaction['toNick'] = account['name'];
                      if (transaction['type'] == 2) {
                        transaction['name'] = account['name'];
                      }
                    }

                  });
                  this.transactions.push(transaction);
                })
              }
            }, err => console.log(err)
          );
        }
      }, err => console.error(err)
    );
  }
}
