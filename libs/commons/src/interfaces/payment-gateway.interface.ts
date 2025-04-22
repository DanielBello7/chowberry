import { PAYMENT_GATEWAY_ENUM } from '@app/enums';
import {
    PaymentParams,
    PaymentResult,
    BankType,
    BankCredentials,
} from 'shared/third-party-payment.type';

export abstract class IPaymentGateway {
    gateway: PAYMENT_GATEWAY_ENUM;
    abstract makePayment(data: PaymentParams): Promise<PaymentResult>;
    abstract findPayment(refId: string): Promise<PaymentResult>;
    abstract getAvailableBanks(): Promise<BankType[]>;
    abstract verifyCredentials(data: {
        accountNumber: string;
        bankCode: string;
        bankName: string;
    }): Promise<BankCredentials>;
}
