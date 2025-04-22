/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import { flconfig } from './flutterwave.module';
import {
    BankCredentials,
    BankType,
    IPaymentGateway,
    PaymentParams,
    PaymentResult,
} from '@app/commons';
import * as axios from 'axios';
import {
    ACC_BALANCE,
    CurrencyType,
    PAYMENT_PARAMETERS,
    PAYMENT_RESULT,
    VERIFY_ACCOUNT,
    VerifyResponse,
} from './types';
import { Bank } from 'ng-banks/lib/types';
import { PAYMENT_GATEWAY_ENUM } from '@app/enums';
import banks from 'ng-banks';

const flutterwave = require('flutterwave-node-v3');

@Injectable()
export class FlutterwaveService extends IPaymentGateway {
    public gateway: PAYMENT_GATEWAY_ENUM;
    private secretkey: string;
    private publickey: string;
    private processor: any;
    private axios: axios.Axios;
    private aCurrency: CurrencyType;

    constructor(@Inject('FLUTTERWAVE') private readonly flconfig: flconfig) {
        super();
        this.gateway = PAYMENT_GATEWAY_ENUM.FLUTTERWAVE;
        this.secretkey = this.flconfig.secretkey;
        this.publickey = this.flconfig.publickey;
        this.aCurrency = this.flconfig.aCurrency;
        this.processor = new flutterwave(this.publickey, this.secretkey);

        this.axios = axios.default.create({
            headers: { Authorization: `Bearer ${this.secretkey}` },
        });
    }

    getAccountBalance = async (): Promise<ACC_BALANCE> => {
        const res = await this.axios.get('https://api.flutterwave.com/v3/balances');
        const balance: ACC_BALANCE = res.data.data.find(
            (item: any) => item.currency === this.aCurrency,
        );
        if (balance) return balance;
        throw new Error('couldnt find currency account');
    };

    makeAPayment = async (data: PAYMENT_PARAMETERS): Promise<PAYMENT_RESULT> => {
        if (this.aCurrency !== data.currency) {
            throw new Error('currency mismatch');
        }
        const trx: PAYMENT_RESULT = await this.processor.Transfer.initiate(data);
        return trx;
    };

    getBanks = (): Bank[] => {
        const bank_list: Bank[] = banks.getBanks() as Bank[];
        if (!bank_list) throw new Error('couldnt get banks');
        return bank_list;
    };

    findBankUsingNameOrSlugOrCode = (keyword: string): Bank => {
        const key = keyword.toLowerCase();
        const response = this.getBanks();
        const bank = response.find((item) => {
            const itemName = item.name.toLowerCase();
            const itemSlug = item.slug.toLowerCase();
            const itemCode = item.code?.toLowerCase();
            if (itemName === key || itemSlug === key || itemCode === key) return item;
        });
        if (!bank) throw new Error('bank not found');
        return bank;
    };

    checkAccountDetails = async (
        account_number: string,
        bank_code: string,
    ): Promise<VERIFY_ACCOUNT> => {
        const details = {
            account_number: account_number,
            account_bank: bank_code,
        };
        const response: VERIFY_ACCOUNT = await this.processor.Misc.verify_Account(details);
        return response;
    };

    checkIfAccountCanCarryAmount = async (amount: number): Promise<boolean> => {
        const balance = await this.getAccountBalance();
        if (balance.available_balance > amount) return true;
        if (balance.ledger_balance > amount) return true;
        return false;
    };

    verifyPayment = async (trxId: string): Promise<VerifyResponse> => {
        const response: VerifyResponse = await this.processor.Transaction.verify({
            id: trxId,
        });
        return response;
    };

    async makePayment(data: PaymentParams): Promise<PaymentResult> {
        const response = await this.makeAPayment({
            account_bank: data.accountBank,
            account_number: data.accountNumber,
            amount: data.amount,
            beneficiary_name: data.beneficiaryName,
            currency: data.currency,
            narration: data.narration,
        });
        if (response.status === 'error') throw new Error(response.message);
        return {
            accountNumber: data.accountNumber,
            amount: response.data.amount,
            bankName: data.accountBank,
            bankCode: response.data.bank_code,
            bankSlug: response.data.bank_name,
            createdAt: response.data.created_at,
            currency: data.currency,
            customer: {
                email: '',
                phone: '',
                name: response.data.full_name,
            },
            narration: response.data.narration,
            ref: response.data.reference,
            status: response.data.status === 'FAILED' ? 'failed' : 'successful',
        };
    }

    async findPayment(refId: string): Promise<PaymentResult> {
        const response = await this.verifyPayment(refId);
        if (response.status === 'error') throw new Error(response.message);
        return {
            amount: response.data.amount,
            accountNumber: '',
            bankCode: '',
            bankName: '',
            bankSlug: '',
            createdAt: response.data.created_at,
            currency: response.data.currency,
            customer: {
                name: response.data.customer.name,
                email: response.data.customer.email,
                phone: response.data.customer.phone_number,
            },
            narration: response.data.narration,
            ref: response.data.tx_ref,
            status: response.data.status,
        };
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    async getAvailableBanks(): Promise<BankType[]> {
        const response = this.getBanks();
        return response.map((item) => ({
            code: item.code,
            name: item.name,
            slug: item.slug,
        }));
    }

    async verifyCredentials(data: {
        accountNumber: string;
        bankCode: string;
        bankName: string;
    }): Promise<BankCredentials> {
        const response = await this.checkAccountDetails(data.accountNumber, data.bankCode);
        if (response.status === 'error') throw new Error(response.message);
        return {
            accountNumber: response.data.account_number,
            accountName: response.data.account_name,
        };
    }
}
