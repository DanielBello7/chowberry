import { DynamicModule, Module } from '@nestjs/common';
import { FlutterwaveService } from './flutterwave.service';
import { CurrencyType } from './types';
import { IPaymentGateway } from '@app/commons';

export type flconfig = {
    secretkey: string;
    publickey: string;
    aCurrency: CurrencyType; // account currency
};

@Module({})
export class FlutterwaveModule {
    static register(data: flconfig): DynamicModule {
        return {
            exports: [IPaymentGateway],
            module: FlutterwaveModule,
            providers: [
                {
                    provide: 'FLUTTERWAVE',
                    useValue: data,
                },
                {
                    provide: IPaymentGateway,
                    useClass: FlutterwaveService,
                },
            ],
        };
    }
}
