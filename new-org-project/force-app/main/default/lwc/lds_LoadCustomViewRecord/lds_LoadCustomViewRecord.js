import { LightningElement, api,track } from 'lwc';
export default class Lds_LoadCustomViewRecord extends LightningElement {
    recordId = '006dL00000QSWlxQAH';
    objectApiName = 'Opportunity';

     @track value = '';

    get statusOptions() {
        return [
            { label: 'Closed Lost', value: 'Closed Lost' },
            { label: 'Prospecting', value: 'Prospecting' },
            { label: 'Qualification', value: 'Qualification' },
            { label: 'Needs Analysis', value: 'Needs Analysis' },
            { label: 'Value Proposition', value: 'Value Proposition' },
            { label: 'Id. Decision Makers', value: 'Id. Decision Makers' },
            { label: 'Perception Analysis', value: 'Perception Analysis' },
            { label: 'Proposal/Price Quote', value: 'Proposal/Price Quote' },
            { label: 'Negotiation/Review', value: 'Negotiation/Review' },
            { label: 'Closed Won', value: 'Closed Won' }
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }
   

}