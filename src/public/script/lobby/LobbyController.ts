class LobbyController {
    public lobbyViewElement: HTMLElement = null;
    public currentGameList: NodeList = null;

    constructor() {
        return this._init()
            ._createChildren();
    }

    public updateLobby(): void {
    }

    private _init(): this {
        return this;
    }

    private _createChildren(): this {
        this.lobbyViewElement = document.getElementsByClassName('js-lobbyView')[0] as HTMLElement;
        this.currentGameList = this.lobbyViewElement.getElementsByClassName('js-lobbyView-game') as NodeList;

        console.log('+++', this.currentGameList);

        return this;
    }
}

export default LobbyController;
