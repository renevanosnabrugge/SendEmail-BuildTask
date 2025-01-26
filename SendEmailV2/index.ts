import tl = require('azure-pipelines-task-lib');
import nm = require('nodemailer');

function isNullOrEmpty(str: string | null | undefined): boolean {
    return str === null || str === undefined || str.trim() === '';
}

async function run() {
    try 
    {
        const To: string | undefined = tl.getInputRequired('To');
        const Subject: string | undefined = tl.getInputRequired('Subject');
        const From: string | undefined = tl.getInputRequired('From');
        const SmtpServer: string | undefined = tl.getInputRequired('SmtpServer');
        
        const Body: string | undefined = tl.getInput('Body');
        const BodyAsHtml: boolean | undefined = tl.getBoolInput('BodyAsHtml');
        const SmtpPort: string | undefined = tl.getInput('SmtpPort');
        const SmtpUsername: string | undefined = tl.getInput('SmtpUsername');
        const SmtpPassword: string | undefined = tl.getInput('SmtpPassword');
        const UseSSL: boolean | undefined = tl.getBoolInput('UseSSL');
        const AddAttachment: boolean | undefined = tl.getBoolInput('AddAttachment');
        const Attachment: string | undefined = tl.getInput('Attachment');
        const CC: string | undefined = tl.getInput('CC');
        const BCC: string | undefined = tl.getInput('BCC');
        const ReplyTo: string | undefined = tl.getInput('ReplyTo');
        
        console.log('Input Values');
        console.log('To:', To);
        console.log('Subject:', Subject);
        console.log('Body:', Body);
        console.log('From:', From);
        console.log('SmtpServer:', SmtpServer);
        console.log('SmtpPort:', SmtpPort);
        console.log('SmtpUsername:', SmtpUsername);
        //console.log('SmtpPassword:', SmtpPassword);
        console.log('UseSSL:', UseSSL);
        console.log('AddAttachment:', AddAttachment);
        console.log('Attachment:', Attachment);
        console.log('CC:', CC);
        console.log('BCC:', BCC);
        console.log('ReplyTo:', ReplyTo);


        // check required fields
        if (!To || !Subject || !From || !SmtpServer) {
            console.log('Required fields are missing');
            tl.setResult(tl.TaskResult.Failed, 'Required fields are missing');
            return;
        }

        
        // create boolean values
        let smtpPortInt: number = parseInt(SmtpPort!);

        if (isNaN(smtpPortInt)) {
            smtpPortInt = 25;
        }     
        
        let transporter: nm.Transporter;
        
        if (!isNullOrEmpty(SmtpUsername) && !isNullOrEmpty(SmtpPassword)) { 
            transporter = nm.createTransport({
                host: SmtpServer,
                port: smtpPortInt,
                secure: UseSSL,
                auth: {
                    user: SmtpUsername,
                    pass: SmtpPassword
                }
            })
            console.log('SMTP configuration with username and password');
        }
        else {
            transporter = nm.createTransport({
                host: SmtpServer,
                port: smtpPortInt,
                secure: UseSSL
            }) 
            console.log('Preparing SMTP configuration without username and password');  
                    
        }

        let mailOptions: nm.SendMailOptions = {
            from: From,
            to: To,
            subject: Subject,
            text: Body ? Body : '',
            html: BodyAsHtml ? Body : '',
            cc: CC ? CC : '',
            bcc: BCC ? BCC : '',
            replyTo: ReplyTo ? ReplyTo : ''
        };

        if (AddAttachment && Attachment) {
            mailOptions.attachments = [{ path: Attachment }];
            console.log('Attachment %s added', Attachment);
        }

        // Send mail
        transporter.sendMail(mailOptions, (err, info) => {     
            if (err) {
                console.log(err);
                tl.setResult(tl.TaskResult.Failed, 'Failed to send email');
                return;
            }

            console.log('Email sent: %s', info.messageId);
            console.log('Preview URL: %s', nm.getTestMessageUrl(info));
            tl.setResult(tl.TaskResult.Succeeded, 'Email sent successfully');
        });

                
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, "Failed to send email");
    }
}

run();
