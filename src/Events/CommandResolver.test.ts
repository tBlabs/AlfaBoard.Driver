import { Mock, It } from "moq.ts";
import { UserConfig } from "../Storage/UserConfig";
import { CommandResolver } from "./CommandResolver";
import { IStorage } from "../Storage/IStorage";
import { StringKeyValuePairs } from "../Storage/StringKeyValuePairs";
import { IoState } from "../Driver/IoState";

describe(CommandResolver.name, () =>
{
    it(CommandResolver.prototype.Resolve.name, () =>
    {
        // Given
        const _storageMock = new Mock<IStorage<StringKeyValuePairs>>()
            .setup(i => i.Read).returns(() => ({ host: "localhost:1234" }))
            .setup(i => i.Write(It.IsAny<string>())).callback(() => { });
        const _config = new UserConfig(_storageMock.object());
        const sut = new CommandResolver(_config);
        const ioState = new IoState(1);
        ioState.currentValue = 123;

        // When
        const ret = sut.Resolve("onChange", "http://{host}/{this.event}/{this.addr}/{this.value}", ioState, 'ioName');

        // Then
        expect(ret).toBe('http://localhost:1234/onChange/1/123');
    });
});
