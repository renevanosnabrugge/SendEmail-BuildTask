[CmdletBinding()]
param(
[Parameter(Mandatory=$False)]
[string] $send = "",
[Parameter(Mandatory=$True)]
[string] $To,
[Parameter(Mandatory=$True)]
[string] $Subject,
[Parameter(Mandatory=$True)]
[string] $Body,
[Parameter(Mandatory=$True)]
[string] $From,
[Parameter(Mandatory=$False)]
[string] $BodyAsHtml = "True",
[Parameter(Mandatory=$True)]
[string] $SmtpServer,
[Parameter(Mandatory=$False)]
[string] $SmtpPort ="587",
[Parameter(Mandatory=$False)]
[string] $SmtpUsername,
[Parameter(Mandatory=$False)]
[string] $SmtpPassword,
[Parameter(Mandatory=$False)]
[string] $UseSSL = "True",
[Parameter(Mandatory=$False)]
[string] $AddAttachment = "True",
[Parameter(Mandatory=$False)]
[string] $Attachment,
[Parameter(Mandatory=$False)]
[string] $CC,
[Parameter(Mandatory=$False)]
[string] $BCC
)

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
[int]$SmtpPortInt =  [System.Convert]::ToInt32($SmtpPort,10)

$MailParams.Add("To",$toMailAddresses);
if ($ccMailAddresses -ne $null) { 
    $MailParams.Add("Cc",$ccMailAddresses);
}

if ($bccMailAddresses -ne $null) { 
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

Write-Output "Send-MailMessage" + @MailParams


Send-MailMessage @MailParams





