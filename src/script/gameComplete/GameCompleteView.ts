import { PLAYER } from '../constants/playerConstants';
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

class GameCompleteView {
    private _stageRootElement: SVGElement = null;
    private _element: SVGElement = null;
    private _gameBoardOverlayElement: SVGRectElement = null;
    private _gameCompleteBannerElement: SVGElement = null;
    private _gameCompleteBannerCaptionElement: SVGTextElement = null;

    constructor(element: SVGElement) {
        this._stageRootElement = element;

        return this._init()
            ._createChildren();
    }

    public showCompleteGameBanner(player: PLAYER): void {
        this._gameCompleteBannerCaptionElement.textContent = this._buildBannerCaption(player);

        this._stageRootElement.appendChild(this._element);
    }

    public hide(): void {
        this._stageRootElement.removeChild(this._element);
    }

    private _init(): this {
        return this;
    }

    private _createChildren(): this {
        this._element = document.createElementNS(SVG_NAMESPACE, 'g');
        this._element.setAttribute('id', 'js-gameComplete-view');

        this._buildGameBoardOverlayElement();
        this._buildGameCompleteBannerElement();

        return this;
    }

    private _buildGameBoardOverlayElement(): void {
        this._gameBoardOverlayElement = document.createElementNS(SVG_NAMESPACE, 'rect');
        this._gameBoardOverlayElement.setAttributeNS(null, 'x', '0');
        this._gameBoardOverlayElement.setAttributeNS(null, 'y', '0');
        this._gameBoardOverlayElement.setAttributeNS(null, 'height', '800');
        this._gameBoardOverlayElement.setAttributeNS(null, 'width', '800');
        this._gameBoardOverlayElement.setAttributeNS(null, 'style', 'fill: rgba(0, 0, 0, 0.7)');

        this._element.appendChild(this._gameBoardOverlayElement);
    }

    private _buildGameCompleteBannerElement(): void {
        this._gameCompleteBannerElement = document.createElementNS(SVG_NAMESPACE, 'g');

        const bannerBackgroundElement: SVGRectElement = document.createElementNS(SVG_NAMESPACE, 'rect');
        bannerBackgroundElement.setAttributeNS(null, 'x', '50');
        bannerBackgroundElement.setAttributeNS(null, 'y', '250');
        bannerBackgroundElement.setAttributeNS(null, 'height', '200');
        bannerBackgroundElement.setAttributeNS(null, 'width', '700');
        bannerBackgroundElement.setAttributeNS(null, 'rx', '16');
        bannerBackgroundElement.setAttributeNS(null, 'ry', '16');
        bannerBackgroundElement.setAttributeNS(null, 'stroke', '#222222');
        bannerBackgroundElement.setAttributeNS(null, 'fill', 'rgba(255, 255, 255, 0.95)');


        this._gameCompleteBannerCaptionElement = document.createElementNS(SVG_NAMESPACE, 'text');
        this._gameCompleteBannerCaptionElement.setAttributeNS(null, 'x', '75');
        this._gameCompleteBannerCaptionElement.setAttributeNS(null, 'y', '350');
        this._gameCompleteBannerCaptionElement.setAttributeNS(null, 'style', 'font-size: 44px; font-family: monospace');
        this._gameCompleteBannerCaptionElement.setAttribute('id', 'js-gameComplete-banner-caption');

        this._gameCompleteBannerElement.appendChild(bannerBackgroundElement);
        this._gameCompleteBannerElement.appendChild(this._gameCompleteBannerCaptionElement);
        this._element.appendChild(this._gameCompleteBannerElement);
    }

    private _buildBannerCaption(playerName: PLAYER): string {
        return `Player One is the Winner!`;
    }

}

export default GameCompleteView;
