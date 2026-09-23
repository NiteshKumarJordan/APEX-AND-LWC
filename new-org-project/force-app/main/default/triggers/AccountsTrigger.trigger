trigger AccountsTrigger on Account(after insert) {
 List<Contact> contactsToCreate = new List<Contact>();

    for (Account acc : Trigger.new) {
        Contact con = new Contact();
        con.FirstName = acc.Name;
        con.LastName = acc.Name;
        con.AccountId = acc.Id;

        contactsToCreate.add(con);
    }

    if (!contactsToCreate.isEmpty()) {
        insert contactsToCreate;
    }


}