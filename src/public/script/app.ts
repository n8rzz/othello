import * as socketIo from 'socket.io-client';
import GameController from './game/GameController';

class App {
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
        this.gameController = new GameController();

        return this;
    }

    public enable(): this {
        return this;
    }
}

const app = new App();
