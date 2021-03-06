import 'reflect-metadata';
import { IPressDeterminator } from './IPressDeterminator';
import { injectable } from 'inversify';
import { IoState } from '../../Driver/IoState';

@injectable()
export class PressDeterminator implements IPressDeterminator
{
    public IsPress(ioState: IoState, min: number, max: number): boolean
    {
        if ((ioState.previousValue === 1) && (ioState.currentValue === 0))
        {
            const timeSpan: number = ioState.currentValueUpdateTimestamp - ioState.previousValueUpdateTimestamp;

            return (timeSpan > min) && (timeSpan <= max);
        }

        return false;
    }
}
