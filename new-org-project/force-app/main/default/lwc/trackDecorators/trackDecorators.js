import { LightningElement,track } from 'lwc';
export default class TrackDecorators extends LightningElement {

    @track FullName = { firstname:"" , lastname:""}



    handleChange(event){

        const field =event.traget.name;


        if (field ==='firstName'){

            this.FullName.firstname = event.traget.value;

        }
        
        else if (field ==='lastName'){

            this.FullName.firstname = event.traget.value;
 


        }
    }

}