import { LightningElement, track,wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';
export default class ContactTable extends LightningElement {

    @track contactsRecord;
    searchValue = '';
 
    
    searchKeyword(event) {
        this.searchValue = event.target.value;
    }
 
    
    handleSearchKeyword() {
        
        if (this.searchValue !== '') {
            getContactList({
                    searchKey: this.searchValue
                })
                .then(result => {
                   
                    this.contactsRecord = result;
                })
        
        }
    }
}