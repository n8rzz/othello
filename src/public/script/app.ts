import GameController from './game/GameController';

class App {
    public gameController: GameController = null;
    public actionBarRestartElement: HTMLButtonElement = null;
    public actionBarQuitElement: HTMLButtonElement = null;

    public onClickActionBarRestsartHandler: (event: UIEvent) => void = this.onClickActionBarRestsart.bind(this);
    public onClickActionBarQuitHandler: (event: UIEvent) => void = this.onClickActionBarQuit.bind(this);

    constructor() {
        this.init();
    }

    public init(): this {
        return this.createChildren()
            .enable();
    }

    public createChildren(): this {
        const scoreboardElement: HTMLElement = document.getElementsByClassName('js-scoreboardView')[0] as HTMLElement;
        const stageElement: SVGElement = document.getElementsByClassName('js-stage')[0] as SVGElement;
        this.actionBarQuitElement = document.getElementsByClassName('js-actionBar-quit')[0] as HTMLButtonElement;
        this.actionBarRestartElement = document.getElementsByClassName('js-actionBar-restart')[0] as HTMLButtonElement;
        this.gameController = new GameController(scoreboardElement, stageElement);

        return this;
    }

    public enable(): this {
        this.actionBarQuitElement.addEventListener('click', this.onClickActionBarQuitHandler);
        this.actionBarRestartElement.addEventListener('click', this.onClickActionBarRestsartHandler);

        return this;
    }

    public onClickActionBarRestsart(event: UIEvent): void {
        this.gameController.reset();
    }

    public onClickActionBarQuit(event: UIEvent): void {}
}

const app = new App();

