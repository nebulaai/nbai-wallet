export class Account{
    name: string;  // as primary key
    password: string;
    privateKey: string;
    address: string;
    mnemonic: string;
    keystore: any;
    balance: number;
    constructor(values: Object = {}) {
        Object.assign(this, values);
        this.balance = 0; 
    }
}