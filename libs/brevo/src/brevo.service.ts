/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MailData } from '@app/commons/types/mail-module.types';
import { Inject, Injectable } from '@nestjs/common';
import { BrevoProvider } from './brevo.module';
import { IMailModuleType } from '@app/commons';
import otpmail from './mailer/otp-mail.mailer';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const EmailAPI = require('sib-api-v3-sdk');

@Injectable()
export class BrevoService extends IMailModuleType {
    private smtpInstance: any;
    private email: string;
    private ename: string;

    constructor(
        @Inject('BREVO')
        private readonly config: BrevoProvider,
    ) {
        super();
        const client = EmailAPI.ApiClient.instance;
        const apiKeyObject = client.authentications['api-key'];
        apiKeyObject.apiKey = this.config.apiKy;
        this.smtpInstance = new EmailAPI.TransactionalEmailsApi();
        this.email = this.config.email;
        this.ename = this.config.ename;
    }

    async sendmail(data: MailData): Promise<any> {
        const response = await this.smtpInstance.sendTransacEmail({
            sender: { email: this.email, name: this.ename },
            to: data.to,
            subject: data.subject,
            textContent: data.textContent,
            htmlContent: data.htmlContent,
            params: data.params,
        });
        return response;
    }

    async sendotp(otp: string, email: string, name: string): Promise<any> {
        return this.sendmail({
            subject: 'Bus-T One-Time-Password',
            to: [{ email }],
            htmlContent: otpmail(name, otp),
        });
    }
}
