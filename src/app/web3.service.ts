import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Account } from './account';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare let require: any;
declare let window: any;
declare const Buffer;
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const bip39 = require("bip39");
const hdkey = require('ethereumjs-wallet/dist/hdkey');
const util = require('ethereumjs-util');
const NETWORK = environment.network;

@Injectable()
export class Web3Service {
  private web3: any = window.web3;
  public txHash: string = '';
  private note: Subject<string> = new BehaviorSubject<string>(environment.network);
  noteAddress$ = this.note.asObservable();

  constructor() {
    this.web3 = new Web3(this.note['_value']);
  }

  setNode(data: string): void {
    this.note.next(data);
    // console.log('new', this.note['_value']);
    this.web3 = new Web3(this.note['_value']);
  }

  importWallet(keystore: Object, password: string): any {
    const wallet = this.web3.eth.accounts.decrypt(keystore, password);
    return wallet;
  }

  importByPrivateKey(privateKey: string): any {
    const wallet = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    return wallet;
  }

  getBalance(acc: Account, callback): boolean {
    Observable.fromPromise(this.web3.eth.getBalance(acc.address)).subscribe(
      res => {
        const balance = this.web3.utils.fromWei(res, 'ether');
        callback(balance);
        return true;
      }, err => { return false; }
    );
    return false;
  }
  encrypt(privateKey, password): any {
    return this.web3.eth.accounts.encrypt(privateKey, password);
  }

  sendSignedTransaction(address, etx, privateKey, callback) {
    this.web3.eth.getTransactionCount(address, (err, txCount) => {       //console.log(txCount)
      const txObject = {
        nonce: this.web3.utils.toHex(txCount),
        to: etx['to'],
        value: this.web3.utils.toHex(this.web3.utils.toWei(etx['value'], 'ether')),
        gasLimit: this.web3.utils.toHex(etx['gasLimit']),
        gasPrice: this.web3.utils.toHex(this.web3.utils.toWei(etx['gasPrice'] + '', 'gwei'))
      };
      const tx = new Tx(txObject);
      const key = new Buffer(privateKey, 'hex');
      tx.sign(key);
      const serializedTx = '0x' + tx.serialize().toString('hex');
      this.web3.eth.sendSignedTransaction(serializedTx, (err, txHash) => callback(err, txHash));
    });
  }

  getTransactionReceipt(txHash) {
    return Observable.fromPromise(this.web3.eth.getTransactionReceipt(txHash));
  }

  deleteAccount(account: object) {
    this.web3.eth.accounts.wallet.remove(account);
  }

  getBalanceSpecial(acc: Account): any {
    return Observable.fromPromise(this.web3.eth.getBalance(acc.address));
  }

  getTransactionCount(address) {
    return this.web3.eth.getTransactionCount(address);
  }

  checkAddress(address) {
    return this.web3.utils.isAddress(address);
  }

  generateAddressesFromSeed(seed, startingPosition) {

    let hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(seed));
    let wallet_hdpath = "m/44'/60'/0'/0/";
    const key = hdwallet.derivePath("m/44'/60'/0'/0/0");

    const address = util.pubToAddress(key._hdkey._publicKey, true);
    const addressHex = util.toChecksumAddress(address.toString('hex'));
    const privateKey = util.bufferToHex(key._hdkey._privateKey);

    let accounts = [];
    for (let i = startingPosition; i < startingPosition + 8; i++) {

      let wallet = hdwallet.derivePath(wallet_hdpath + i).getWallet();
      let address = '0x' + wallet.getAddress().toString("hex");
      let privateKey = '0x' + wallet.getPrivateKey().toString("hex");
      accounts.push({ address: address, privateKey: privateKey });

    }

    return accounts;
  }


}
