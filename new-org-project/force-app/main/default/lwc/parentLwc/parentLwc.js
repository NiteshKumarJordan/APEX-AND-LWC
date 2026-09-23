import { LightningElement } from 'lwc';

export default class ParentLwc extends LightningElement {

    countValue= 0;

    handleDecrease(){
        this.countValue--;
    }
    handleIncrease(){
        this.countValue++;
           }
}