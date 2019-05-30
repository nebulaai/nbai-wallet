import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';
//import { TranslateService } from '@ngx-translate/core';
import { WalletService } from '../wallet.service';
import { TranslationService } from '../translation.service';
import { Web3Service } from '../web3.service';
import { Observable } from 'rxjs';
declare let require: any;
const Web3 = require('web3');


@Component({
  selector: 'app-head',
  templateUrl: './head.component.html'
})
export class HeadComponent implements OnInit {
  private nodeAddress: string;
  settingShow: boolean = false;
  ifCreate: boolean = false;
  currentLang: string;
  showPopup: boolean = false;
  validNode: boolean = true;
  private wasInside = false;
  constructor(private router: Router,
    private walletService: WalletService,
    public translationService: TranslationService,
    private web3Service: Web3Service) {
    this.currentLang = 'en';
  }

  ngOnInit() {
    this.getPage();
    this.getNodeAddress();
    this.checkNote();
  }

  getNodeAddress() {
    this.web3Service.noteAddress$.subscribe(
      res => {
        this.nodeAddress = res;
      }
    )    
  }

  private checkNote(){
    let currentWeb3 = new Web3(this.nodeAddress);
    Observable.fromPromise(currentWeb3.eth.getBlockNumber()).subscribe(
      res => {
        this.validNode = true;
      }, err => {
        this.validNode = false;
      }
    );
  }

  private setNode(){
    this.web3Service.setNode(this.nodeAddress);
    this.showPopup = false;;
  }

  getPage(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {       //console.log(event.url)
        if (event.url.startsWith('/create')) {
          this.ifCreate = true;
          this.changeLogo();
        }
        else {
          this.ifCreate = false;
        }
      }
    });
  }

  private changeLogo(): void {
    if (this.ifCreate) {
      $('#logo').attr('src', 'assets/imgs/icons/wallet_logo_blk.png');
    }
  }
  toggleSetting() {
    this.settingShow = !this.settingShow;
    this.wasInside = true;
  }
  setLang(lang: string) {
    this.currentLang = lang;
    this.settingShow = false;
    if (lang === 'en') {
      this.translationService.isEn = true;
    }
    if (lang === 'cn') {
      this.translationService.isEn = false;
    }
  }

  clickedInside($event: Event) {
    this.wasInside = true;
  }
  @HostListener('document:click', ['$event']) clickedOutside($event) {
    if (!this.wasInside) {
      if (this.settingShow) this.settingShow = false;
    }
    this.wasInside = false;
  }
}
