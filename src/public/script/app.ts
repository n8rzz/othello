import * as socketIo from 'socket.io-client';
import LobbyController from './lobby/LobbyController';
import GameController from './game/GameController';

class App {
    public lobbyController: LobbyController = null;
    public gameController: GameController = null;

    private socket: any;

    constructor() {
        this.socket = socketIo.connect('http://localhost:4321/');

        this.init();
    }

    public init(): this {
        return this.createChildren()
            .enable();
    }

    public createChildren(): this {
        this.lobbyController = new LobbyController();
        this.gameController = new GameController();

        return this;
    }

    public enable(): this {
        return this;
    }
}

const app = new App();
