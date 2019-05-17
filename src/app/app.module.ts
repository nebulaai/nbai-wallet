import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QRCodeModule } from 'angularx-qrcode';
import { AppComponent } from './app.component';
import { ManageComponent } from './manage/manage.component';
import { HeadComponent } from './head/head.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule } from '@angular/forms';
import { AddWalletComponent } from './manage/add-wallet/add-wallet.component';
import { MnemonicComponent } from './manage/mnemonic/mnemonic.component';
import { VerifyMnemonicComponent } from './manage/verify-mnemonic/verify-mnemonic.component';
import { ImportWalletComponent } from './manage/import-wallet/import-wallet.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DetailsComponent } from './manage/details/details.component';
import { MainComponent } from './manage/main/main.component';
import { ExportKeyComponent } from './manage/export-key/export-key.component';
import { ExportKeystoreComponent } from './manage/export-keystore/export-keystore.component';
import { TransferComponent } from './manage/transfer/transfer.component';
import { WalletService } from './wallet.service';
import { Web3Service } from './web3.service';
import { EqualValidatorDirective } from './directives/equal-validator.directive';
import { navLinkDirective } from './directives/nav-click.directive';
import { copyDirective } from './directives/copy.directive';
import { AddressPipe } from './directives/address.pipe';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FinishTransactionComponent } from './manage/finish-transaction/finish-transaction.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TranslationService } from './translation.service';


@NgModule({
  declarations: [
    AppComponent,
    ManageComponent,
    HeadComponent,
    AddWalletComponent,
    MnemonicComponent,
    VerifyMnemonicComponent,
    ImportWalletComponent,
    NotfoundComponent,
    DetailsComponent,
    MainComponent,
    ExportKeyComponent,
    ExportKeystoreComponent,
    TransferComponent,
    EqualValidatorDirective,
    navLinkDirective,
    copyDirective,
    AddressPipe,
    FinishTransactionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    QRCodeModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    AngularFontAwesomeModule,
  ],
  providers: [WalletService, Web3Service, TranslationService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
