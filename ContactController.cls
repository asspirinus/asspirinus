public with sharing class ContactController {
    @AuraEnabled(Cacheable=true)
    public static List<Contact> getContactList(String searchKey) {
        string Keyword = '%' + searchKey + '%';

        List<contact> contacts = [
            SELECT id, FirstName, LastName, Email, Account.Name, Phone, CreatedDate
            FROM Contact
            WHERE FirstName LIKE :Keyword
        ];
        if(contacts.size() == 0){
            throw new AuraHandledException ('No Record Found...');
        }
        system.debug(contacts);
        return contacts;
    }
}
