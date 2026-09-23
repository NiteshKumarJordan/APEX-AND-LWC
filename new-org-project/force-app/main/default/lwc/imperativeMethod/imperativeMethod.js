import { LightningElement, track } from 'lwc';
import getAccountList from '@salesforce/apex/imperativeApexClass.getAccountList';


const columns =[
    {label : 'AccountId', fieldName : 'Id'},
    {label : 'AccountName', fieldName : 'Name'}


]

export default class ImperativeMethod extends LightningElement {

    @track columns = columns;
    @track data =[];

    connectedCallback(){
        getAccountList()
        .then(result =>{
            this.data = result;

        })
        .catch(error =>{
            console.log('error occurred');
        })


    }


}