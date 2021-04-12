import { LightningElement, track, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class ContactTable extends LightningElement {

    @track contactListRecord;
  
    searchValue;
 
    searchKeyword(event) {
        this.searchValue = event.target.value;
    }
    handleSearchKeyword() {
        
        if (this.searchValue !== '') {
            getContactList({
                searchKey : this.searchValue
                })
                .then(result => {
                    this.contactListRecord = result;
                    return contactListRecord;
                })
                .catch(error => {
                   
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    this.contactListRecord = null;
                });
        } else {
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Search text missing...',
            });
            this.dispatchEvent(event);
        }
    }
}
