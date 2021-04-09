import { LightningElement, track } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
export default class ContactTable extends LightningElement {

    @track contactListRecord;

    searchValue = searchKeyword;
 
    
    handleSearchKeyword() {
        
        if (searchValue !== '') {
            getContactList({
                searchKey : searchValue
                })
                .then(result => {
                   
                    contactListRecord = result;
                })
                
        } 
    }
}
