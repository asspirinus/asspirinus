import { LightningElement, track, wire } from "lwc";
import {refreshApex} from '@salesforce/apex';
import getContactList from "@salesforce/apex/ContactController.getContactList";
import getContactListWire from "@salesforce/apex/ContactController.getContactListWire"
import deleteContact from "@salesforce/apex/ContactController.deleteContact";
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

const button_Delete = [
    { label: 'Delete', name: 'delete' },
];
const CONTACT_COLUMNS = [
    {label: "FIRST NAME", fieldName: "FirstName", type: "text"},
    {label: "LAST NAME", fieldName: "LastName"},
    {label: "EMAIL", fieldName: "Email", type: "email"},
    {label: "ACCOUNT NAME", fieldName: "AccountUrl", type: "url", typeAttributes: {label: { fieldName: 'AccountName'}}},
    {label: "MOBILE PHONE", fieldName: "Phone", type: "phone"},
    {label: "CREATED DATE", fieldName: "CreatedDate", type: "date", typeAttributes: {value:"1547250828000", year:"numeric",
     month:"numeric", day:"numeric", hour:"2-digit", minute:"2-digit", hour12:"true"}},
    {type: 'button', typeAttributes: { RowAction: button_Delete, variant:"destructive", label:"Delete",name: 'delete', iconName:"utility:delete", class: "slds-m-left_x-small"}}  
];

export default class ContactTable extends LightningElement {
    columns = CONTACT_COLUMNS;
    searchKey = "";
    error;
    @track row;
    @track record = [];
    @track openDeleteModal = false;
    @track data;
    @track refreshTable;
    @track currentRecordId;
    
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
            let contact = {
                ...row,
                AccountName: row.Account.Name,
                AccountUrl: `/${row.AccountId}`
            };
            return contact;
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
       //Open modal box
        deleteRow(currentRow) {
                this.openDeleteModal = true;
                this.currentRecordId = currentRow.Id;
        }

     //closing modal box
        closeDeleteModal() {
                 this.openDeleteModal = false;
               }

                //Calling Apex 
            deleteContactRow(currentRow){
                let currentRecord = [];
                currentRecord = currentRow.Id;
                deleteContact({contactIds: currentRecord})
                
                .then(result => {
                    window.console.log('result ====> ' + result);
                    this.closeDeleteModal();
                    refreshApex(this.refreshTable);

                    this.dispatchEvent(new ShowToastEvent({
                        title: 'Success!!!',
                        message: currentRow.FirstName + ' '+ currentRow.LastName +' Contact deleted.',
                        variant: 'success'
                    }));
                })
                .catch(error => {
                    window.console.log('Error ====> '+error);
                    this.dispatchEvent(new ShowToastEvent({
                        title: 'Error!!', 
                        message: error.message, 
                        variant: 'error'
                    }));
                });
            
            }
}
