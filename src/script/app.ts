import GameController from './game/GameController';

class App {
    public gameController: GameController = null;

    constructor() {
        this.init();
    }

    public init(): this {
        return this.setupHandlers()
            .createChildren()
            .enable();
    }

    public setupHandlers(): this {
        return this;
    }

    public createChildren(): this {
        const scoreboardElement: HTMLElement = document.getElementsByClassName('js-scoreboardView')[0] as HTMLElement;
        const stageElement: SVGElement = document.getElementsByClassName('js-stage')[0] as SVGElement;

        this.gameController = new GameController(scoreboardElement, stageElement);

        return this;
    }

    public enable(): this {
        return this;
    }
}

const app = new App();
console.log(app);

