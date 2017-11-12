import StageCellModel from './StageCellModel';
import { positionToIdTranslator } from '../translator/stageCellTranslators';

class StageCellCollection {
    public items: StageCellModel[] = [];
    public length: number = -1;

    public addItem(stageCellModel: StageCellModel): void {
        this.items.push(stageCellModel);
        this.length = this.items.length;
    }

    public findCellById(id: string): StageCellModel {
        let stageCellModel: StageCellModel = null;

        for (let i = 0; i < this.length; i++) {
            const item = this.items[i];

            if (item.id === id) {
                stageCellModel = item;

                break;
            }
        }

        return stageCellModel;
    }

    public findCellByPosition(position: number[]): StageCellModel {
        const cellId: string = positionToIdTranslator(position);

        return this.findCellById(cellId);
    }
}

export default StageCellCollection;
