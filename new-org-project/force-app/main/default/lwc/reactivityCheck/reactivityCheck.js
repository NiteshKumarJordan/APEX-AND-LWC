import { LightningElement } from 'lwc';

export default class ReactivityCheck extends LightningElement {
    userAddress = 'AZ-500, New Ashok Nagar';
    
    
    personalDetails = '{ "result": [ { "message": "Hello, Eunice! Your order number is: #41", "phoneNumber": "656.988.3130 x81499" } ] }';

    updateAddress(){
        this.userAddress = "QWE-45, NEW VASANT BIHAR";
    }
}