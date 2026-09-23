import { LightningElement, wire} from 'lwc';
import getHighRevenueAccountRecords from '@salesforce/apex/AccountController.getHighRevenueAccountRecords';

export default class HighRevenueAccount extends LightningElement {
    accounts;
    error;
    
    @wire(getHighRevenueAccountRecords)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
            this.error = undefined;
        }

        else if (error) {
            this.error = error;
            this.accounts = undefined;
        }

    }

}