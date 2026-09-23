import { LightningElement } from 'lwc';

export default class LifeCycleHooks extends LightningElement {

    userName = 'Nitesh';

    handleNameChange(){
        this.userName = 'JORDAN';
    }

    constructor(){
        super();
        console.log('constructor is called');

    }

    connectedCallback(){
        console.log('connected call back is executed');
    }

    renderedCallback(){

        console.log('rendered callback is executed');
    }

    disconnectedCallback(){
        console.log('disconnected callback is executed');
    }

    errorCallback(){
        console.log(stack + '---' + trace);
    }
}