[CmdletBinding()]
param()

$To = Get-VstsInput -Name 'To' -Require
$Subject = Get-VstsInput -Name 'Subject' -Require
$Body = Get-VstsInput -Name 'Body' -Require
$From = Get-VstsInput -Name 'From' -Require
$BodyAsHtml = Get-VstsInput -Name 'BodyAsHtml'
$SmtpServer = Get-VstsInput -Name 'SmtpServer' -Require
$SmtpPort = Get-VstsInput -Name 'SmtpPort'
$SmtpUsername = Get-VstsInput -Name 'SmtpUsername'
$SmtpPassword = Get-VstsInput -Name 'SmtpPassword'
$UseSSL = Get-VstsInput -Name 'UseSSL'
$AddAttachment = Get-VstsInput -Name 'AddAttachment'
$Attachment = Get-VstsInput -Name 'Attachment'
$CC = Get-VstsInput -Name 'CC'
$BCC = Get-VstsInput -Name 'BCC'

$MailParams = @{}

Write-Output "Input Vars"
Write-Output "Send Email To: $To"
Write-Output "Send Email CC: $CC"
Write-Output "Send Email BCC: $BCC"
Write-Output "Subject: $Subject"
Write-Output "Send Email From: $From"
Write-Output "Body as Html?: $BodyAsHtml"
Write-Output "SMTP Server: $SmtpServer"
Write-Output "SMTP Username: $SmtpUsername"
Write-Output "SMTP Port: $SmtpPort"
Write-Output "Use SSL?: $UseSSL"
Write-Output "Add Attachment?: $AddAttachment"
Write-Output "Attachment: $Attachment"



[string[]]$toMailAddresses=$To.Split(';');
[string[]]$ccMailAddresses=$CC.Split(';');
[string[]]$bccMailAddresses=$BCC.Split(';');

[bool]$BodyAsHtmlBool = [System.Convert]::ToBoolean($BodyAsHtml)
[bool]$UseSSLBool =  [System.Convert]::ToBoolean($UseSSL)
[bool]$AddAttachmentBool =  [System.Convert]::ToBoolean($AddAttachment)

$MailParams.Add("To",$toMailAddresses);
if ($null -ne $ccMailAddresses) { 
    $MailParams.Add("Cc",$ccMailAddresses);
}

if ($null -ne $bccMailAddresses) { 
    $MailParams.Add("Bcc",$bccMailAddresses);
}
$MailParams.Add("From",$From);

$Subjectxpanded = $ExecutionContext.InvokeCommand.ExpandString($Subject) 
$MailParams.Add("Subject",$Subjectxpanded);

$BodyExpanded = $ExecutionContext.InvokeCommand.ExpandString($Body) 
$MailParams.Add("Body",$BodyExpanded);

$MailParams.Add("SmtpServer",$SmtpServer);
$MailParams.Add("Port",$SmtpPort);
$MailParams.Add("Encoding", "UTF8"); 

if (!([string]::IsNullOrEmpty($SmtpUsername)))
{
    $securePassword = ConvertTo-SecureString $SmtpPassword -AsPlainText -Force
    $credential = New-Object System.Management.Automation.PSCredential ($SmtpUsername, $securePassword)
    $MailParams.Add("Credential",$credential);
}

if($BodyAsHtmlBool)
{
    $MailParams.Add("BodyAsHtml",$true);

}

if($UseSSLBool)
{
    $MailParams.Add("UseSSL",$true);

}

if($AddAttachmentBool)
{
    $MailParams.Add("Attachments",$Attachment);

}



Send-MailMessage @MailParams





