import { LightningElement } from 'lwc';
export default class EventHandler_DataBinding extends LightningElement {
    amount = 0;

    handleAmountChange(event){

        this.amount = event.target.value;
    }

}