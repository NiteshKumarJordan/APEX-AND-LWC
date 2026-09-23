import { LightningElement, track, wire } from 'lwc';
import Opportunity from '@salesforce/schema/Opportunity';
import Name from '@salesforce/schema/Opportunity.Name';
import Amount from '@salesforce/schema/Opportunity.Amount';
import StageName from '@salesforce/schema/Opportunity.StageName';
import { getListUi } from 'lightning/uiListApi';

import { updateRecord } from 'lightning/uiRecordApi';
import ID_FIELD from '@salesforce/schema/Opportunity.Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


const COLUMNS = [
    { label: 'Opportunity Name', fieldName: 'Name', type: 'text' },
    { label: 'Amount', fieldName: 'Amount', type: 'currency' },
    { label: 'Status', fieldName: 'StageName', type: 'text' },
    {
        type: 'action',
        typeAttributes: {
            rowActions: [
                { label: 'Closed Won', name: 'closed_won' },
                { label: 'Closed Lost', name: 'closed_lost' }
            ]
        }
    }
];

export default class OpportunityStatusUpdater extends LightningElement {
    @track opportunities = [];
    columns = COLUMNS; 
    isLoading = true;

    @wire(getListUi, {
        objectApiName: Opportunity,
        listViewApiName: 'AllOpportunities',
        fields: [Name, Amount, StageName],
        sortBy: ['-CreatedDate'],
        pageSize: 200
    })


    wiredListView({ error, data }) {
        if (data) {
            this.opportunities = data.records.records
                .filter((record) => {
                    const stage = record.fields.StageName.value;
                    return stage !== 'Closed Won' && stage !== 'Closed Lost';
                })
                .map((record) => {
                    return {
                        Id: record.id,
                        Name: record.fields.Name.value,
                        Amount: record.fields.Amount.value,
                        StageName: record.fields.StageName.value
                    };
                });

             this.isLoading = false;
        } else if (error) {
            console.error('getListUi Error: ', JSON.stringify(error));
            this.isLoading = false;
        }
    }


    handleRowAction(event) {

        console.log('BUTTON CLICKED - Action: ', JSON.stringify(event.detail.action));
    console.log('BUTTON CLICKED - Row: ', JSON.stringify(event.detail.row));

        const action = event.detail.action;
        const row = event.detail.row;

        let newStage;
        if (action.name === 'closed_won') {
            newStage = 'Closed Won';
        } else if (action.name === 'closed_lost') {
            newStage = 'Closed Lost';
        }

        const fields = {};
        fields[ID_FIELD.fieldApiName] = row.Id;
       fields[StageName.fieldApiName] = newStage;

        const recordInput = { fields };

        updateRecord(recordInput)
        
            .then(() => {
                console.log('UPDATE SUCCESS!');
                this.opportunities = this.opportunities.filter((opp) => opp.Id !== row.Id);

                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Opportunity updated successfully!',
                        variant: 'success'
                    })
                );
            })

         .catch((error) => {
                console.error('Update Error: ', JSON.stringify(error));
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error updating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }


}