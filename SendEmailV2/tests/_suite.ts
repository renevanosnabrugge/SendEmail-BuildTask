import * as path from 'path';
import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';


describe('SendMailV2 Task Tests', function () {

    before(function () {

    });

    after(() => {

    });

    it('should succeed with required fields', function (done: Mocha.Done) {
        this.timeout(5000);
        let tp: string = path.join(__dirname, 'success.js');
        let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

        tr.runAsync().then(() => {
            assert.equal(tr.succeeded, true, 'should have succeeded');
            assert.equal(tr.warningIssues.length, 0, 'should have no warnings');
            assert.equal(tr.errorIssues.length, 0, 'should have no errors');
            assert.equal(tr.stdout.indexOf('Email sent successfully') >= 0, true, "should display Email sent successfully");
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('should fail required fields are not provided', function(done: Mocha.Done) {
        this.timeout(5000);
        const tp = path.join(__dirname, 'failure.js');
        const tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
    
        tr.runAsync().then(() => {
            assert.equal(tr.succeeded, false, 'should have failed');
            assert.equal(tr.warningIssues.length, 0, 'should have no warnings');
            assert.equal(tr.errorIssues.length, 1, 'should have 1 error issue');
            assert.equal(tr.errorIssues[0], 'Not all required fields provided', 'Failed to send email');
            assert.equal(tr.stdout.indexOf('Failed to send email'), -1, 'Should not display Failed to send email');
            done();
        }).catch((error) => {
            done();
        });
    });
});
