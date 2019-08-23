import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Account } from './account';
import { environment } from '../environments/environment';
import { Web3Service } from './web3.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const API_URL = environment.apiUrl;
@Injectable()
export class WalletService {
  private walletSubject: Subject<Account[]> = new BehaviorSubject([]);
  private accountSubject: Subject<Account> = new BehaviorSubject(new Account({}));
  private totalSubject: Subject<number> = new BehaviorSubject(0);
  private totalStrSubject: Subject<string> = new BehaviorSubject('0');
  private total: number = 0;
  private totalStr: string = '0';
  private accounts: Account[] = [];
  private account: Account = new Account({});
  private index: number = 1;
  constructor(
    private web3Service: Web3Service,
    private http: HttpClient
  ) {
    this.walletSubject = new BehaviorSubject(this.accounts);
  }
  public addAccount(acc: Account) {

    let found: boolean = false;
    for (let account of this.accounts) {
      if (account.address == acc.address) found = true;
    }
    if (found) return;
    if (!acc.name) {
      acc.name = `Wallet ${this.index}`;
      this.index += 1;
    }
    this.accounts.push(acc);
    this.web3Service.getBalanceSpecial(acc).subscribe(
      res => {
        const balance = 0.000000000000000001 * res;
        this.total += balance;
        this.totalStr = this.bigAdd(this.totalStr, balance);
        // console.log('total str', this.totalStr);
        this.totalSubject.next(this.total);
        this.totalStrSubject.next(this.totalStr);
      },
      err => {
        console.log('err', err);
      });
    // this.getAccountBalance(acc, (balance) => {
    //   this.total += parseFloat(balance);
    //   this.totalStr = this.bigAdd(this.totalStr, balance);
    //   // console.log('old total', this.totalBig);
    //   // let balanceBig = NP.times(balance, 1e18);
    //   // this.totalBig = NP.plus(this.totalBig, balanceBig); 
    //   // console.log('total', NP.divide(this.totalBig, 1e18), 'balance', balanceBig, NP.divide(balanceBig, 1e18));
    //   this.totalSubject.next(this.total);
    //   this.totalStrSubject.next(this.totalStr);
    // });
    this.walletSubject.next(this.accounts);
  }
  public removeAccount(acc: Account) {

    this.accounts = this.accounts.filter((account: Account) => account.address != acc.address);
    this.getAccountBalance(acc, (balance) => {
      this.total -= parseFloat(balance);
      this.totalSubject.next(this.total);
    });
    this.walletSubject.next(this.accounts);
  }
  public refreshAccount(acc: Account) {
    const oldBalance: number = acc.balance;
    // console.log('old balance', oldBalance);
    this.web3Service.getBalanceSpecial(acc).subscribe(
      res => {
        const balance = 0.000000000000000001 * res;
        // const balance = Number(this.web3Service.fromWei(res));
        acc.balance = balance;
        const diff: number = balance - oldBalance;
        if (diff > 0) {
          const diffStr = this.bigSub(balance, oldBalance);
          this.totalStr = this.bigAdd(this.totalStr, diffStr);
        }
        else {
          const diffStr = this.bigSub(oldBalance, balance);
          this.totalStr = this.bigSub(this.totalStr, diffStr);
        }
        // console.log('diff', diff);
        this.total += diff;
        this.totalSubject.next(this.total);
        this.totalStrSubject.next(this.totalStr);
      },
      err => {
        console.log('err', err);
      });
  }
  public getAccounts(): Observable<Account[]> {
    // console.log('accounts', this.accounts);
    if (this.accounts.length) {
      this.total = 0;
      this.totalStr = '0';
      let count = 0;
      for (let account of this.accounts) {
        // console.log('account', count, account);
        count++;
        this.web3Service.getBalanceSpecial(account).subscribe(
          res => {
            // const balance = Number(this.web3Service.fromWei(res));
            const balance = 0.000000000000000001 * res;
            account.balance = balance;
            this.total += balance;
            this.totalStr = this.bigAdd(this.totalStr, balance);
            console.log('total', this.totalStr, 'balance', balance);
            this.totalSubject.next(this.total);
            this.totalStrSubject.next(this.totalStr);
          },
          err => {
            console.log('err', err);
          });
        // this.web3Service.getBalance(account, (balance)=>{
        //   account.balance = balance;         console.log('balance', balance)
        //   this.total += parseFloat(balance);
        //   this.totalSubject.next(this.total);
        //   // console.log(this.total, this.totalSubject)
        // });
      }
    }
    return this.walletSubject;

  }
  public getAccountDetail(): Observable<Account> {
    return this.accountSubject;
  }
  public clearAccountDetail(): void {
    this.account = new Account({});
    this.accountSubject.next(this.account);
  }
  public setAccountDetail(acc: Object) {
    this.account = Object.assign({}, this.account, acc);
    this.accountSubject.next(this.account);
  }

  public getTotal(): Observable<number> {
    // console.log('total return', this.totalSubject);
    return this.totalSubject;
  }

  public getTotalStr(): Observable<string> {
    // console.log('total return', this.totalSubject);
    return this.totalStrSubject;
  }

  public setTotal(n: number) {
    this.total = n;
    this.totalSubject.next(this.total);
  }

  public recoverMneomic(mnemonic: string) {
  }

  getRecentTransaction(addresses, limit, offset) {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get(API_URL + '/transactions?addresses=' + addresses + '&limit=' + limit + '&offset=' + offset);

  }
  private getAccountBalance(acc: Account, callback) {
    this.web3Service.getBalance(acc, (balance) => {
      callback(balance);
    });
  }

  private bigAdd(num1, num2) {
    const num1Str = num1.toString();
    const num2Str = num2.toString();
    let num1Int = this.int(num1Str);
    let num1Dec = this.dec(num1Str);
    let num2Int = this.int(num2Str);
    let num2Dec = this.dec(num2Str);
    const diffInt = num1Int.length - num2Int.length;
    const diffDec = num1Dec.length - num2Dec.length;
    if (diffInt < 0) {
      for (let i = 0; i < Math.abs(diffInt); i++) {
        num1Int = '0' + num1Int;
      }
    }
    else {
      for (let i = 0; i < Math.abs(diffInt); i++) {
        num2Int = '0' + num2Int;
      }
    }
    if (diffDec < 0) {
      for (let i = 0; i < Math.abs(diffDec); i++) {
        num1Dec = num1Dec + '0';
      }
    }
    else {
      for (let i = 0; i < Math.abs(diffDec); i++) {
        num2Dec = num2Dec + '0'
      }
    }
    // console.log('dec', num1, num2, num1Dec, num2Dec);
    let sumDecArr = [];
    let sumIntArr = [];
    const num1DecArr = num1Dec.split('');
    const num2DecArr = num2Dec.split('');
    const num1IntArr = num1Int.split('');
    const num2IntArr = num2Int.split('');
    let upToInt = 0;
    for (let i = num1Dec.length - 1; i >= 0; i--) {
      let sum = Number(num1DecArr[i]) + Number(num2DecArr[i]);
      // console.log('sum', i, sum, num1DecArr[i], num2DecArr[i]);
      if (sum >= 10) {
        let up = (sum - sum % 10) / 10;
        sum = sum % 10;
        if (i == 0) {
          upToInt = up;
        }
        else {
          num1DecArr[i - 1] = Number(num1DecArr[i - 1]) + up;
        }
      }
      sumDecArr.unshift(sum);
      // console.log('str', sumDecArr);
    }
    num1IntArr[num1IntArr.length - 1] = Number(num1IntArr[num1IntArr.length - 1]) + upToInt;
    for (let i = num1Int.length - 1; i >= 0; i--) {
      let sum = Number(num1IntArr[i]) + Number(num2IntArr[i]);
      // console.log('sum', i, sum, num1IntArr[i], num2IntArr[i]);
      if (sum >= 10) {
        let up = (sum - sum % 10) / 10;
        sum = sum % 10;
        if (i == 0) {
          sumIntArr.unshift(up);
        }
        else {
          num1IntArr[i - 1] = Number(num1IntArr[i - 1]) + up;
        }
      }
      sumIntArr.unshift(sum);
      // console.log('str', sumDecArr);
    }
    if (sumDecArr.length != 0) {
      return sumIntArr.join('') + '.' + sumDecArr.join('');
    }
    return sumIntArr.join('');
  }

  private bigSub(num1, num2) {
    const num1Str = num1.toString();
    const num2Str = num2.toString();
    let num1Int = this.int(num1Str);
    let num1Dec = this.dec(num1Str);
    let num2Int = this.int(num2Str);
    let num2Dec = this.dec(num2Str);
    const diffInt = num1Int.length - num2Int.length;
    const diffDec = num1Dec.length - num2Dec.length;
    if (diffInt < 0) {
      for (let i = 0; i < Math.abs(diffInt); i++) {
        num1Int = '0' + num1Int;
      }
    }
    else {
      for (let i = 0; i < Math.abs(diffInt); i++) {
        num2Int = '0' + num2Int;
      }
    }
    if (diffDec < 0) {
      for (let i = 0; i < Math.abs(diffDec); i++) {
        num1Dec = num1Dec + '0';
      }
    }
    else {
      for (let i = 0; i < Math.abs(diffDec); i++) {
        num2Dec = num2Dec + '0'
      }
    }
    // console.log('dec', num1, num2, num1Dec, num2Dec);
    let diffDecArr = [];
    let diffIntArr = [];
    const num1DecArr = num1Dec.split('');
    const num2DecArr = num2Dec.split('');
    const num1IntArr = num1Int.split('');
    const num2IntArr = num2Int.split('');
    let upToInt = 0;
    for (let i = num1Dec.length - 1; i >= 0; i--) {
      let diff = Number(num1DecArr[i]) - Number(num2DecArr[i]);
      // console.log('sum', i, sum, num1DecArr[i], num2DecArr[i]);
      if (diff < 0) {
        diff = diff + 10;
        if (i == 0) {
          num1IntArr[num1IntArr.length - 1] = Number(num1IntArr[num1IntArr.length - 1]) - 1;
        }
        else {
          num1DecArr[i - 1] = Number(num1DecArr[i - 1]) - 1;
        }
      }
      diffDecArr.unshift(diff);
      // console.log('str', sumDecArr);
    }
    num1IntArr[num1IntArr.length - 1] = Number(num1IntArr[num1IntArr.length - 1]) + upToInt;
    for (let i = num1Int.length - 1; i >= 0; i--) {
      let diff = Number(num1IntArr[i]) - Number(num2IntArr[i]);
      // console.log('sum', i, sum, num1IntArr[i], num2IntArr[i]);
      if (diff < 0) {
        diff = diff + 10;
        num1IntArr[i - 1] = Number(num1IntArr[i - 1]) - 1;
      }
      diffIntArr.unshift(diff);
      // console.log('str', sumDecArr);
    }
    // console.log('str', sumDecArr);
    if (diffDecArr.length != 0) {
      return diffIntArr.join('') + '.' + diffDecArr.join('');
    }
    return diffIntArr.join('');
  }

  private int(num) {
    if (num.indexOf('.') !== -1) {
      return num.substring(0, num.indexOf('.'));
    }
    return num;
  }

  private dec(num) {
    if (num.indexOf('.') !== -1) {
      return num.substring(num.indexOf('.') + 1);
    }
    return '';
  }
}
