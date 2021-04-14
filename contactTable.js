import { LightningElement, track, wire } from "lwc";
import getContactList from "@salesforce/apex/ContactController.getContactList";

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
    keyword = "";

    @track rows;
    
    searchKeyword(event) {
        this.keyword = event.target.value;
    }
      
    handleSearchKeyword(event){
        this.keyword = this.template.querySelector('lightning-input').value;

    getContactList({ searchKey: "$keyword" })
    
        if (result.data) {
            let AccountUrl;
            let AccountName;
            this.rows = result.data.map(row=>{
                AccountName= row.Account.Name;
                AccountUrl = `/${row.AccountId}`;
                
                return{...row,AccountName, AccountUrl}
                
            });
        } else if (result.error) {
            this.rows = undefined;
        }
    }

}
