public with sharing class ContactController {
    @AuraEnabled(Cacheable=true)
    public static List<Contact> getContactList(String searchKey) {
        string searchKeyword = '%' + searchKey + '%';

        List<contact> contacts = [
            SELECT id, FirstName, LastName, Email, Account.Name, Phone, CreatedDate
            FROM Contact
            WHERE FirstName LIKE :searchKeyword
        ];
        if (contacts.isEmpty()) {
            throw new AuraHandledException('No Record Found...');
        }
        system.debug(contacts);
        return contacts;
    }
}
