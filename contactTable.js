import { LightningElement,wire, track } from "lwc";
import {refreshApex} from '@salesforce/apex';
import getContactList from "@salesforce/apex/ContactController.getContactList";
import getContactListWire from "@salesforce/apex/ContactController.getContactListWire"
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

const CONTACT_COLUMNS = [
    {label: "FIRST NAME", fieldName: "FirstName", type: "text"},
    {label: "LAST NAME", fieldName: "LastName"},
    {label: "EMAIL", fieldName: "Email", type: "email"},
    {label: "ACCOUNT NAME", fieldName: "AccountId", type: "url", typeAttributes: {label: { fieldName: "AccountName"}}},
    {label: "MOBILE PHONE", fieldName: "Phone", type: "phone"},
    {label: "CREATED DATE", fieldName: "CreatedDate", type: "date", typeAttributes: {value:"1547250828000", year:"numeric",
     month:"numeric", day:"numeric", hour:"2-digit", minute:"2-digit", hour12:"true"}}

export default class ContactTable extends LightningElement {
    columns = CONTACT_COLUMNS;
    searchKey = "";
    error;
    @track data;
    @track refreshTable;

    @wire(getContactListWire)
    contacts(result) {
        this.refreshTable = result;
        if (result.data) {
            this.data = result.data.map(this.AccountNames);
            this.error = undefined;

        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }

    searchKeyword(event) {
        this.searchKey = event.target.value;
    }
    //Search by name
    handleSearchKeyword(){
        getContactList ({ searchKey: this.searchKey })
            .then((result) => {
                    this.data = result.map(this.AccountNames);
                    this.error = undefined;  
            })
            .catch((error) => {
                const event = new ShowToastEvent({
                    title: 'Error',
                    variant: 'error',
                    message: error.body.message,
                });
                this.dispatchEvent(event);
                this.data = null;
            });
        }

    //Detail account name
        AccountNames(row) {
            let contacts = {
                ...row,
                AccountName: row.Account?.Name,
                AccountId: `/${row.AccountId}`
            };
            return contacts;
        }   

    //Delete  currentRow 
    handleRowAction(event) {
        let buttonName = event.detail.action.name;
        console.log('buttonName ====> ' + buttonName);
        let row = event.detail.row;
        console.log('row ====> ' + row);
        switch (buttonName) {
            case 'delete':
                this.deleteRow(row);
                break;
                }
       }
