import StageCellModel from './StageCellModel';

class StageCellCollection {
    public items: StageCellModel[] = [];
    public length: number = -1;

    addItem(stageCellModel: StageCellModel): void {
        this.items.push(stageCellModel);
        this.length = this.items.length;
    }

    findCellById(id: string): StageCellModel {
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
}

export default StageCellCollection;
