import { PLAYER } from '../constants/playerConstants';
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

class BaseModalView {
    private _stageRootElement: SVGElement = null;
    private _modalGroupElement: SVGElement = null;
    private _modalBackgroundElement: SVGRectElement = null;
    private _modalBannerElement: SVGElement = null;
    private _modalCaptionElement: SVGElement = null;

    constructor(element: SVGElement) {
        this._stageRootElement = element;

        return this._init()
            ._createChildren();
    }

    public show(): void {
        this._stageRootElement.appendChild(this._modalGroupElement);
    }

    public showWithCaption(caption: string): void {
        this._modalCaptionElement.textContent = caption;

        this.show();
    }

    public hide(): void {
        this._stageRootElement.removeChild(this._modalGroupElement);
    }

    private _init(): this {
        return this;
    }

    private _createChildren(): this {
        this._modalGroupElement = document.createElementNS(SVG_NAMESPACE, 'g');
        this._modalGroupElement.classList.add('js-modal-view');

        this._buildModalBackgroundElement();
        this._buildModalBannerElement();
        this._buildModalCaptionElement();

        return this;
    }

    private _buildModalBackgroundElement(): void {
        this._modalBackgroundElement = document.createElementNS(SVG_NAMESPACE, 'rect');
        this._modalBackgroundElement.setAttributeNS(null, 'x', '0');
        this._modalBackgroundElement.setAttributeNS(null, 'y', '0');
        this._modalBackgroundElement.setAttributeNS(null, 'height', '800');
        this._modalBackgroundElement.setAttributeNS(null, 'width', '800');
        this._modalBackgroundElement.setAttributeNS(null, 'style', 'fill: rgba(0, 0, 0, 0.7)');

        this._modalGroupElement.appendChild(this._modalBackgroundElement);
    }

    private _buildModalBannerElement(): void {
        this._modalBannerElement = document.createElementNS(SVG_NAMESPACE, 'g');

        const bannerBackgroundElement: SVGRectElement = document.createElementNS(SVG_NAMESPACE, 'rect');
        bannerBackgroundElement.setAttributeNS(null, 'x', '50');
        bannerBackgroundElement.setAttributeNS(null, 'y', '250');
        bannerBackgroundElement.setAttributeNS(null, 'height', '200');
        bannerBackgroundElement.setAttributeNS(null, 'width', '700');
        bannerBackgroundElement.setAttributeNS(null, 'rx', '16');
        bannerBackgroundElement.setAttributeNS(null, 'ry', '16');
        bannerBackgroundElement.setAttributeNS(null, 'stroke', '#222222');
        bannerBackgroundElement.setAttributeNS(null, 'fill', 'rgba(255, 255, 255, 0.95)');

        this._modalBannerElement.appendChild(bannerBackgroundElement);
        this._modalGroupElement.appendChild(this._modalBannerElement);
    }

    private _buildModalCaptionElement(): void {
        this._modalCaptionElement = document.createElementNS(SVG_NAMESPACE, 'text');
        this._modalCaptionElement.setAttributeNS(null, 'x', '75');
        this._modalCaptionElement.setAttributeNS(null, 'y', '350');
        this._modalCaptionElement.setAttributeNS(null, 'style', 'font-size: 44px; font-family: monospace');
        this._modalCaptionElement.setAttribute('id', 'js-modal-caption');

        this._modalGroupElement.appendChild(this._modalCaptionElement);
    }

}

export default BaseModalView;
