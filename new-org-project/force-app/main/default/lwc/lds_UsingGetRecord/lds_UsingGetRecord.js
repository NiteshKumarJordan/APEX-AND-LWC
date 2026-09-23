import { LightningElement, api, wire } from 'lwc';
import {getRecord, getFieldValue} from 'lightning/uiRecordApi';


import AccountId from '@salesforce/schema/Opportunity.AccountId';
import Name from '@salesforce/schema/Opportunity.Name';
import Amount from '@salesforce/schema/Opportunity.Amount';
import StageName from '@salesforce/schema/Opportunity.StageName';




export default class Lds_UsingGetRecord extends LightningElement {

    @api recordId;
    fields = [AccountId, Name, Amount, StageName ];

    @wire(getRecord, { recordId: '$recordId', fields: '$fields' }) 
    opptyVar;

    get accountId() {
        return getFieldValue(this.opptyVar.data, AccountId);
    }

    get name() {
        return getFieldValue(this.opptyVar.data, Name);
    }

    get stageName() {
        return getFieldValue(this.opptyVar.data, StageName);
    }

    get amount() {
        return getFieldValue(this.opptyVar.data, Amount);
    }


    



}