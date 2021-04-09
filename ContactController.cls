public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static list<contact> getContactList(string searchKey) {
        string searchKeyword = '%' + searchKey + '%';
		
       
        list<contact> contactListRecord = new list<contact>();
     
	   
        list<contact> contactList = [Select id, FirstName, LastName, Email,
                              Account.Name, Phone, CreatedDate
             From Contact
             WHERE FirstName LIKE : searchKeyword];
             
             for(contact con : contactList){
                 contactListRecord.add(con);
        }
         return contactListRecord;
    }      
}