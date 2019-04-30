import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { Account } from './account';
import { environment } from '../environments/environment';
import { Web3Service } from './web3.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

const API_URL = environment.apiUrl;
@Injectable()
export class WalletService {
  private walletSubject: Subject<Account[]> = new BehaviorSubject([]);
  private accountSubject: Subject<Account> = new BehaviorSubject(new Account({}));
  private totalSubject: Subject<number> = new BehaviorSubject(0);
  private total: number =0;
  private accounts: Account[] = [];
  private account: Account = new Account({});
  private index: number = 1;
  constructor(
    private web3Service: Web3Service,
    private http: HttpClient
  ) { 
    this.walletSubject = new BehaviorSubject(this.accounts);
  }
  public addAccount(acc:Account){

    let found: boolean = false; 
    for(let account of this.accounts){
      if(account.address==acc.address) found = true;
    }
    if(found) return;
    if(!acc.name){
      acc.name = `Wallet ${this.index}`; 
      this.index +=1;
    } 
    this.accounts.push(acc);
    this.getAccountBalance(acc, (balance)=>{
      this.total += parseFloat(balance);
      this.totalSubject.next(this.total);      
    });
    this.walletSubject.next(this.accounts);
  }
  public removeAccount(acc:Account){
    
    this.accounts = this.accounts.filter((account:Account)=> account.address!=acc.address);
    this.getAccountBalance(acc, (balance)=>{
      this.total -= parseFloat(balance);
      this.totalSubject.next(this.total);
    });
    this.walletSubject.next(this.accounts);
  }
  public refreshAccount(acc:Account){
    const oldBalance : number = acc.balance;
    this.web3Service.getBalance(acc, (balance)=>{
      acc.balance = balance;         //console.log(balance)
      const diff: number = balance - oldBalance;
      this.total += diff;
      this.totalSubject.next(this.total);
    });
  }
  public getAccounts():Observable<Account[]>{
    if(this.accounts.length){
      this.total = 0;
      

      for(let account of this.accounts){
        this.web3Service.getBalance(account, (balance)=>{
          account.balance = balance;         //console.log(balance)
          this.total += parseFloat(balance);
          this.totalSubject.next(this.total);
        });
      }
    }
    return this.walletSubject;
    
  }
  public getAccountDetail():Observable<Account>{
    return this.accountSubject;
  }
  public clearAccountDetail(): void{
    this.account = new Account({});
    this.accountSubject.next(this.account);
  }
  public setAccountDetail(acc:Object){
    this.account = Object.assign({}, this.account, acc);
    this.accountSubject.next(this.account);              
  }

  public getTotal():Observable<number>{
    return this.totalSubject;
  }
  public setTotal(n:number){
    this.total = n;
    this.totalSubject.next(this.total);
  }
 
  public recoverMneomic(mnemonic: string){
  }

  getRecentTransaction(addresses, limit, offset){
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
    return this.http.get(API_URL + '/transactions?addresses=' + addresses + '&limit=' + limit + '&offset=' + offset, );

  }
  private getAccountBalance(acc:Account, callback){
    this.web3Service.getBalance(acc, (balance)=>{
      callback(balance);
    });
  }


}
