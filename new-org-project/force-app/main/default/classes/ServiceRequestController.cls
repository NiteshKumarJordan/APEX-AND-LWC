public with sharing class ServiceRequestController {

    @AuraEnabled(cacheable=true)
    public static List<Case> getCases(String searchKey) {

        String searchPattern = '%' + searchKey + '%';

        return [
            SELECT Id,
                   CaseNumber,
                   Subject,
                   Status,
                   Priority,
                   AccountId,
                   Account.Name,
                   ContactId,
                   Contact.Name,
                   Description,
                   CreatedDate
            FROM Case
            WHERE CaseNumber LIKE :searchPattern
               OR Subject LIKE :searchPattern
            ORDER BY CreatedDate DESC
        ];
    }
}