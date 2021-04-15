import { LightningElement } from "lwc";
import getContactList from "@salesforce/apex/ContactController.getContactList";
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

const CONTACT_COLUMNS = [
    {
        label: "FIRST NAME",
        fieldName: "FirstName",
        hideDefaultActions: true,
        type: "text"
    },
    {
        label: "LAST NAME",
        fieldName: "LastName"
    },
    {
        label: "EMAIL",
        fieldName: "Email",
        type: "email"
    },
    {
        label: "ACCOUNT NAME",
        fieldName: "AccountUrl",
        type: "url",
        typeAttributes: {
            label: { fieldName: 'AccountName'}
        }
                 
    
    },
    {
        label: "MOBILE PHONE",
        fieldName: "Phone",
        type: "phone"
    },
    {
        label: "CREATED DATE",
        fieldName: "CreatedDate",
        type: "date",
        typeAttributes: {
            
            value:"1547250828000",
            year:"numeric",
            month:"numeric",
            day:"numeric",
            hour:"2-digit",
            minute:"2-digit",
            hour12:"true"
        }
    }
];

export default class ContactTable extends LightningElement {
    columns = CONTACT_COLUMNS;
    searchKey = "";

     rows;
     error;
    searchKeyword(event) {
        this.searchKey = event.target.value;
    }
      
    handleSearchKeyword(){
            getContactList ({ searchKey: this.searchKey })
            .then((result) => {
                
                    this.rows = result.map(this.ContactRows);
                    this.error = undefined;
                
            })
            .catch((error) => {
                const event = new ShowToastEvent({
                    title: 'Error',
                    variant: 'error',
                    message: error.body.message,
                });
                this.dispatchEvent(event);
                this.rows = null;
            });
        }
        ContactRows(row) {
            let contact = {
                ...row,
                AccountName: row.Account.Name,
                AccountUrl: `/${row.AccountId}`
            };
            return contact;
        }
    }


