import { LightningElement, track } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';
export default class ContactTable extends LightningElement {

    @track data ;
    
    searchValue;
 
    searchKeyword(event) {
        this.searchValue = event.target.value;
    }
    
    handleSearchKeyword() {

        getContactList({
            searchKey : searchValue})
  
         .then(result => {
              
             this.data = result;
         }) 
        
        
        }
 }
