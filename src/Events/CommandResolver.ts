import { injectable } from 'inversify';
import { UserConfig } from '../Storage/UserConfig';
import { IoState } from '../Driver/IoState';

@injectable()
export class CommandResolver
{
    constructor(private _config: UserConfig) 
    { }

    public Resolve(eventName: string, cmd: string, ioState: IoState, ioName: string): string
    {
        cmd = this._config.ApplyOnString(cmd);
        
        // Second resolve (for variables of variables)
        cmd = this._config.ApplyOnString(cmd); 

        cmd = cmd
            .replace("{this.value}", ioState.currentValue.toString())
            .replace("{this.name}", ioName)
            .replace("{this.event}", eventName)
            .replace("{this.previousValue}", ioState.previousValue.toString())
            .replace("{this.addr}", ioState.addr.toString())
            .replace("{this.timestamp}", ioState.currentValueUpdateTimestamp.toString())
            .replace("{this.previousTimestamp}", ioState.previousValueUpdateTimestamp.toString());

        return cmd;
    }
}
