function Login
{
    $needLogin = $true
    Try 
    {
        $content = Get-AzureRmContext
        if ($content) 
        {
            $needLogin = ([string]::IsNullOrEmpty($content.Account))
        } 
    } 
    Catch 
    {
        if ($_ -like "*Login-AzureRmAccount to login*") 
        {
            $needLogin = $true
        } 
        else 
        {
            throw
        }
    }

    if ($needLogin)
    {
        Login-AzureRmAccount
    }
}

login
Select-AzureRmSubscription -Subscription b543aa2b-f823-4d1d-8188-fed701a61253 | Out-Null
$parameters='C:\Repo\expensetracker\docdbinfra\parameters.json'
$template = 'C:\Repo\expensetracker\docdbinfra\template.json'
$cosmosdbname = 'acdb0099'
$ResourceGroupName = 'ExpenseTracker'
$DataBaseName = 'ExpenseTrackerDB'
write-host "Checking if resource exists"
if(Find-AzureRmResource -ResourceType "Microsoft.DocumentDb/databaseAccounts" -ApiVersion "2018-05-01" -ResourceGroupName $ResourceGroupName -Name $cosmosdbname){
    write-host "Deleting Cosmos DB"
    Remove-AzureRmResource -ResourceType "Microsoft.DocumentDb/databaseAccounts" -ApiVersion "2015-04-08" -ResourceGroupName $ResourceGroupName -Name $cosmosdbname -Force |Out-Null
}
write-host "Creating empty Cosmos DB"

New-AzureRmResourceGroupDeployment -ResourceGroupName $ResourceGroupName -TemplateParameterFile $parameters -TemplateFile $template -cosmosdbname $cosmosdbname |out-null
$keys = Invoke-AzureRmResourceAction -Action listKeys -ResourceType "Microsoft.DocumentDb/databaseAccounts" -ApiVersion "2015-04-08" -ResourceGroupName $ResourceGroupName -Name $cosmosdbname -Force
$connectionStringDT = "AccountEndpoint=https://$($cosmosdbname).documents.azure.com:443/;AccountKey=$($keys.primaryMasterKey);Database=$($DataBaseName)"

#creating data to upload
$e=import-excel -Path "C:\Users\juanb\OneDrive\Documents\Personal\Family expenses.xlsm" -WorksheetName "Expenses DB" -StartRow 10 
$i=import-excel -Path "C:\Users\juanb\OneDrive\Documents\Personal\Family expenses.xlsm" -WorksheetName "Income DB" -StartRow 10 
$table=@()
$table = foreach($expense in $e){
    #$timestamp=[int][double]::Parse((Get-Date ([datetime]($expense.day.ToString()+'/'+$expense.month.ToString()+'/'+$expense.year.ToString())).touniversaltime() -UFormat %s))
    [pscustomobject][ordered]@{
        date=[int][double]::Parse((Get-Date ([datetime]($expense.day.ToString()+'/'+$expense.month.ToString()+'/'+$expense.year.ToString())).touniversaltime() -UFormat %s))
        store=$expense.Store
        category=$expense.Category
        amount=$expense.Amount *-1
        we=$expense.'Exclude in WE'
        description=$expense.Description
    }
}

$table += foreach($income in $i){
    [pscustomobject][ordered]@{
        date=[int][double]::Parse((Get-Date ([datetime]($income.day.ToString()+'/'+$income.month.ToString()+'/'+$income.year.ToString())).touniversaltime() -UFormat %s))
        store="N/A"
        category=$income.Categoy
        amount=$income.Amount *1
        we='N/A'
        description=$income.Description
    }
}

$table |sort date |ConvertTo-Json|out-file C:\Temp\table.json -Force
$table.count

#upload data to docdb
write-host "Exporting $($table.count) elements to Cosmos DB $($cosmosdbname)"
$errorLog='C:\Temp\log.csv'
$jsonFile='C:\Temp\table.json'
dt /ErrorLog:$errorLog /OverwriteErrorLog /ErrorDetails:Critical /s:JsonFile /s.Files:$jsonFile /t:DocumentDB /t.ConnectionString:$ConnectionStringDT /t.Collection:transactions |Out-Null