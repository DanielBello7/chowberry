import { DynamicModule, Module } from '@nestjs/common';
import { WinstonService } from './winston.service';

type WinstonOptions = {
    dir: string;
};

@Module({
    providers: [WinstonService],
    exports: [WinstonService],
})
export class WinstonModule {
    static register({ dir }: WinstonOptions): DynamicModule {
        return {
            providers: [
                WinstonService,
                {
                    provide: 'WINSTON',
                    useValue: { dir },
                },
            ],
            module: WinstonModule,
            exports: [WinstonService],
        };
    }
}
