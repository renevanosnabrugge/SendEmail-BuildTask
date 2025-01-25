import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');
import nodemailer = require('nodemailer');

let taskPath = path.join(__dirname, '..', 'index.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

nodemailer.createTestAccount((err, account ) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
    }
    console.log("Test Account %s created!", account.user);
    //console.log("Test Account %s created!", account.pass);
    console.log("Test Account %s created!", account.smtp.host);
    console.log("Test Account %s created!", account.smtp.port);
    console.log("Test Account %s created!", account.smtp.secure);

    tmr.setInput('To', account.user);
    tmr.setInput('Subject', 'Hello World!');
    tmr.setInput('From', account.user);
    tmr.setInput('SmtpServer', account.smtp.host);
    tmr.setInput('SmtpPort', account.smtp.port.toString());
    tmr.setInput('SmtpUsername', account.user);
    tmr.setInput('SmtpPassword', account.pass);
    tmr.setInput('UseSSL', account.smtp.secure.toString());
    tmr.setInput('Body', '<b>Hello World!</b>');
    tmr.setInput('BodyAsHTML', 'true');
    tmr.setInput('AddAttachment', 'true');
    tmr.setInput('Attachment', 'tests/success.js.log');

    console.log('Ready to run success test');

    tmr.run();
});





