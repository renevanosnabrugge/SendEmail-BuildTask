# Send Email
This extension takes care of sending email within your build or release pipeline. Since February 2025 there is a new version that uses Node. This is fully created by Wes MacDonald (@wesmacdonald) and he deserves all credits!

## What can you do
* Send email to 1 or more addresses (To, CC and BCC)
* Configure a SMTP server 

*10-02-2025*
Version 2 of the task has been created using Node. Added tests as well to support success/failure validation.
Many thanks to Wes MacDonald (@wesmacdonald) for completely rewriting the task to modern standards. You are awesome

*23-12-2020*
Updated the deprecated SDK and changed some inner workings. Many thanks to [FlorisdeVreese](https://github.com/FlorisDevreese) for this pull request

*27-03-2017*
Added the possibility to send email to CC and BCC as well

*12-10-2016*
Fixed a bug that allowed to send "accents" and other special characters. (Thanks Dominic Perreault)
Fixed a bug that build variables are not expanded in the build body and subject (Thanks David Williams)


*2-9-2016*
Added Anonymous authentication. Leave the username and password field blank to send with anonymous access

##More information
Source can be found here on [Github](https://github.com/renevanosnabrugge/SendEmail-BuildTask)

Follow my blog for updates [Road to ALM](http://www.roadtoalm.com)

Or follow my company [Xebia](http://xebia.com)
