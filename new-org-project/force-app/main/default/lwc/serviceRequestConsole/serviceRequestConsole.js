import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';

import getCases from '@salesforce/apex/ServiceRequestController.getCases';

const columns = [
    { label: 'Case Number', fieldName: 'CaseNumber' },
    { label: 'Subject', fieldName: 'Subject' },
    { label: 'Status', fieldName: 'Status' },
    { label: 'Priority', fieldName: 'Priority' }
];

export default class ServiceRequestConsole extends LightningElement {

    // Controls Create Case modal
    showCreateCase = false;

    // Datatable columns
    columns = columns;

    // Selected Status filter
    selectedStatus = '';

    // Status dropdown options
    statusOptions = [
        { label: 'All', value: '' },
        { label: 'New', value: 'New' },
        { label: 'Working', value: 'Working' },
        { label: 'Escalated', value: 'Escalated' },
        { label: 'Closed', value: 'Closed' }
    ];

    // Selected Priority filter
selectedPriority = '';

// Priority dropdown options
priorityOptions = [
    { label: 'All', value: '' },
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' }
];

    // Records
    allRecords = [];
    filteredRecords = [];
    visibleRecords = [];

    // Pagination
    pageSize = 5;
    currentPage = 1;
    totalPages = 0;

    // Search
    searchKey = '';

    // Error handling
    error;

    // Stores the wire result so refreshApex() can refresh it
    wiredCasesResult;


    // =========================================================
    // GET CASES
    // =========================================================

    @wire(getCases, { searchKey: '$searchKey' })
    wiredCases(result) {

        // Store complete wire response
        this.wiredCasesResult = result;

        const { data, error } = result;

        if (data) {

            // Store records returned from Apex
            this.allRecords = data;

            // Apply current Status filter
            this.applyFilters();

            this.error = undefined;

        } else if (error) {

            this.error = error;

            this.allRecords = [];
            this.filteredRecords = [];
            this.visibleRecords = [];
            this.totalPages = 0;
        }
    }


    // =========================================================
    // SEARCH
    // =========================================================

    handleSearch(event) {

        this.searchKey = event.target.value;
    }


    // =========================================================
    // CREATE CASE
    // =========================================================

    handleCreateCase() {

        this.showCreateCase = true;
    }


    // =========================================================
    // CANCEL CREATE CASE
    // =========================================================

    handleCancel() {

        this.showCreateCase = false;
    }


    // =========================================================
    // CASE CREATED
    // =========================================================

    handleCaseCreated() {

        // Close modal
        this.showCreateCase = false;

        // Refresh Case list
        refreshApex(this.wiredCasesResult);
    }

    handlePriorityChange(event){
        this.selectedPriority = event.detail.value;
        this.applyFilters();


    }


    // =========================================================
    // STATUS FILTER
    // =========================================================

    handleStatusChange(event) {

        // Get selected value from combobox
        this.selectedStatus = event.detail.value;

        // Apply filter
        this.applyFilters();
    }


    // =========================================================
    // APPLY FILTERS
    // =========================================================

      applyFilters() {

    // Start with all records returned from Apex
    let records = [...this.allRecords];

    // Apply Status filter
    if (this.selectedStatus) {

        records = records.filter(caseRecord => {
            return caseRecord.Status === this.selectedStatus;
        });
    }

    // Apply Priority filter
    if (this.selectedPriority) {

        records = records.filter(caseRecord => {
            return caseRecord.Priority === this.selectedPriority;
        });
         }

    // Store filtered records
    this.filteredRecords = records;

    // Whenever filter changes, return to page 1
    this.currentPage = 1;

    // Recalculate pagination
    this.calculatePagination();
     }


    // =========================================================
    // PAGINATION
    // =========================================================

    calculatePagination() {

        // Calculate total number of pages
        this.totalPages = Math.ceil(
            this.filteredRecords.length / this.pageSize
        );

        // Display records for current page
        this.updateVisibleRecords();
    }


    // =========================================================
    // UPDATE VISIBLE RECORDS
    // =========================================================

    updateVisibleRecords() {

        // Calculate starting record
        const start =
            (this.currentPage - 1) * this.pageSize;

        // Calculate ending record
        const end =
            start + this.pageSize;

        // Get only records for current page
        this.visibleRecords =
            this.filteredRecords.slice(start, end);
    }


    // =========================================================
    // NEXT PAGE
    // =========================================================

    handleNext() {

        if (this.currentPage < this.totalPages) {

            this.currentPage++;

            this.updateVisibleRecords();
        }
    }


    // =========================================================
    // PREVIOUS PAGE
    // =========================================================

    handlePrevious() {

        if (this.currentPage > 1) {

            this.currentPage--;

            this.updateVisibleRecords();
        }
    }


    // =========================================================
    // PREVIOUS BUTTON DISABLED
    // =========================================================

    get disablePrevious() {

        return this.currentPage === 1;
    }


    // =========================================================
    // NEXT BUTTON DISABLED
    // =========================================================

    get disableNext() {

        return (
            this.currentPage === this.totalPages ||
            this.totalPages === 0
        );
    }
}