public with sharing class imperativeApexClass {

    @AuraEnabled
    public static List<Account>getAccountList() {

        List<Account>accountListForLWC = [Select Id, Name from Account];
        return accountListForLWC;

    }
}