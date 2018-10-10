import ExtendableError from '@/model/error/ExtendableError';

export class CommonError extends ExtendableError<any> {
    public constructor(message: string, extra: any = {}) {
        super(message, extra);
    }
}
