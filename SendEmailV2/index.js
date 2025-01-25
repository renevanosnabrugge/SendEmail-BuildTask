"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib");
const nm = require("nodemailer");
function isNullOrEmpty(str) {
    return str === null || str === undefined || str.trim() === '';
}
async function run() {
    try {
        const To = tl.getInputRequired('To');
        const Subject = tl.getInputRequired('Subject');
        const From = tl.getInputRequired('From');
        const SmtpServer = tl.getInputRequired('SmtpServer');
        const Body = tl.getInput('Body');
        const BodyAsHtml = tl.getBoolInput('BodyAsHtml');
        const SmtpPort = tl.getInput('SmtpPort');
        const SmtpUsername = tl.getInput('SmtpUsername');
        const SmtpPassword = tl.getInput('SmtpPassword');
        const UseSSL = tl.getBoolInput('UseSSL');
        const AddAttachment = tl.getBoolInput('AddAttachment');
        const Attachment = tl.getInput('Attachment');
        const CC = tl.getInput('CC');
        const BCC = tl.getInput('BCC');
        const ReplyTo = tl.getInput('ReplyTo');
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
        let smtpPortInt = parseInt(SmtpPort);
        if (isNaN(smtpPortInt)) {
            smtpPortInt = 25;
        }
        let transporter;
        if (!isNullOrEmpty(SmtpUsername) && !isNullOrEmpty(SmtpPassword)) {
            transporter = nm.createTransport({
                host: SmtpServer,
                port: smtpPortInt,
                secure: UseSSL,
                auth: {
                    user: SmtpUsername,
                    pass: SmtpPassword
                }
            });
            console.log('SMTP configuration with username and password');
        }
        else {
            transporter = nm.createTransport({
                host: SmtpServer,
                port: smtpPortInt,
                secure: UseSSL
            });
            console.log('Preparing SMTP configuration without username and password');
        }
        let mailOptions = {
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
//# sourceMappingURL=index.js.map