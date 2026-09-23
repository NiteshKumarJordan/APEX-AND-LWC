/**
 * ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
 * Class Name      : AccountController
 * Author          : <YourName>
 * Created Date    : Aug 11, 2026
 * Last Modified By: <YourName>
 * Last Modified On: Aug 11, 2026
 * Description     : This class implements for......
 *  
 * Change History  :
 *  Date          │   Author     │   Change
 * ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
 *  Aug 11, 2026  │ <YourName>   │ Initial version
 * ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
 */

public with sharing class AccountController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getHighRevenueAccountRecords(){
        try {
            return [SELECT Id, Name, AnnualRevenue FROM Account WHERE AnnualRevenue != null ORDER BY AnnualRevenue DESC LIMIT 5];
        } 
		
		catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}