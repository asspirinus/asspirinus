public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static list<contact> getContactList(string searchKey) {
        string searchKeyword = '%' + searchKey + '%';
        
        return [Select id, FirstName, LastName, Email,Account.Name, Phone, CreatedDate
                From Contact
                WHERE FirstName LIKE : searchKeyword];
    
        
}    

}    
