import { MailData } from '../types/mail-module.types';

export abstract class IMailModuleType {
    abstract sendmail(data: MailData): Promise<any>;
    abstract sendotp(otp: string, email: string, name: string): Promise<any>;
}
