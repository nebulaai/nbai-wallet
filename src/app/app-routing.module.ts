import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { AddWalletComponent } from './manage/add-wallet/add-wallet.component';
// import { MnemonicComponent } from './manage/mnemonic/mnemonic.component';
// import { VerifyMnemonicComponent } from './manage/verify-mnemonic/verify-mnemonic.component';
import { ImportWalletComponent } from './manage/import-wallet/import-wallet.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DetailsComponent } from './manage/details/details.component';
import { MainComponent } from './manage/main/main.component';
import { ExportKeyComponent } from './manage/export-key/export-key.component';
import { ExportKeystoreComponent } from './manage/export-keystore/export-keystore.component';
import { TransferComponent } from './manage/transfer/transfer.component';
import { FinishTransactionComponent } from './manage/finish-transaction/finish-transaction.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: ManageComponent, 
    children: [
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {path: 'main', component: MainComponent, data: { title: 'NBAI Wallet', description: "NBAI Wallet", keywords: "NBAI Wallet" }},
      {path: 'details/:key', component: DetailsComponent, data: { title: 'Accounts | NBAI Wallet', description: "Accounts | NBAI Wallet", keywords: "Accounts | NBAI Wallet" }},
      {path: 'transfer', component: TransferComponent, data: { title: 'Transfer | NBAI Wallet', description: "Transfer | NBAI Wallet", keywords: "Transfer | NBAI Wallet" }},
    ]
  },
  { path: 'add-wallet', component: AddWalletComponent, outlet: 'popup'},
  // { path: 'mnemonic', component: MnemonicComponent, outlet: 'popup'},
  // { path: 'verify-mnemonic', component: VerifyMnemonicComponent, outlet: 'popup'},
  { path: 'import-wallet', component: ImportWalletComponent, outlet: 'popup'},  
  { path: 'export-key', component: ExportKeyComponent, outlet: 'popup'},  
  { path: 'export-keystore', component: ExportKeystoreComponent, outlet: 'popup'}, 
  { path: 'finish-transaction', component: FinishTransactionComponent, outlet: 'popup'},  
  { path: '**', component: NotfoundComponent, data: { title: 'Not Found Page | NBAI Wallet', description: "Not Found Page", keywords: "not found page" } },
  
]
@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }