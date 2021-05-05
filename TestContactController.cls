@isTest
public class TestContactController{
    @isTest
    static void testGetContactList(){
        List<Contact> contacts ;
        Test.startTest();
        Contacts = ContactController.getContactList('R');
        Test.stopTest();
        System.assert(contacts.size()>0);
    }
    @isTest
    static void testDontGetContactList(){
        List<Contact> contacts;
        Test.startTest();
        Contacts = ContactController.getContactList('Aaaaaa');
        Test.stopTest();
        System.assert(contacts.size()==0);
    }
    @isTest
    static void testGetContactListWire(){
        List<Contact> contacts;
        Test.startTest();
        Contacts = ContactController.getContactListWire();
        Test.stopTest();
        System.assert(contacts.size()>0);
    }
    @isTest
    static void testDeleteContact(){
        Contact cont = new contact();
        cont.FirstName = 'Test';
        cont.LastName = 'Test';
        insert cont;
        Test.startTest();
        ContactController.deleteContact('cont');
        Test.stopTest();
        System.assert(cont.size()==0);
    }
}