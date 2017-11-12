import BaseModalView from '../modal/BaseModalView';
import { PLAYER } from '../constants/playerConstants';
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

class GameCompleteView extends BaseModalView {
    constructor(element: SVGElement) {
        super(element);
    }

    public showCompleteGameBanner(player: PLAYER): void {
        const caption = this._buildBannerCaption(player);

        super.showWithCaption(caption);
    }

    private _buildBannerCaption(playerName: PLAYER): string {
        return `Player One is the Winner!`;
    }

}

export default GameCompleteView;
