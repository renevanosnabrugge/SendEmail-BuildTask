Set-Location $PSScriptRoot

function Get-VstsInput
{
    param(
        [string] $Name,
        [switch] $Require
    )

    $jsonObject = Get-Content -Path ".\settings.rvo.json" | ConvertFrom-Json
    if ($Name -eq "From"){return $jsonObject.From}
    if ($Name -eq "To"){return $jsonObject.To}
    if ($Name -eq "Subject"){return $jsonObject.Subject} 
    if ($Name -eq "Body"){return $jsonObject.Body} 
    if ($Name -eq "From"){return $jsonObject.From} 
    if ($Name -eq "BodyAsHtml"){return $jsonObject.BodyAsHtml}
    if ($Name -eq "SmtpServer"){return $jsonObject.SmtpServer}
    if ($Name -eq "SmtpPort"){return $jsonObject.SmtpPort} 
    if ($Name -eq "SmtpUsername"){return $jsonObject.SmtpUsername} 
    if ($Name -eq "SmtpPassword"){return $jsonObject.SmtpPassword} 
    if ($Name -eq "UseSSL"){return $jsonObject.UseSSL} 
    if ($Name -eq "AddAttachment"){return $jsonObject.AddAttachment} 
    if ($Name -eq "Attachment"){return $jsonObject.Attachment} 
    if ($Name -eq "CC"){return $jsonObject.CC} 
    if ($Name -eq "BCC"){return $jsonObject.BCC}
    
} 

. .\..\SendEmail\SendMail.ps1 -isDebug $true

SendMailFromPipeline
