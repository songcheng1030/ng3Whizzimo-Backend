import {injectable} from "inversify";
import ITilesBase from "../../shared/ITilesBase";
import {Tiles} from "../../constants/tiles";

@injectable()
class TilesJsDao implements ITilesBase {
    query(query: string): Promise<any> {
        console.log('query', query)

        return new Promise<any>((resolve) => {
            let filteredTiles = Tiles
                .map(tile => tile.tiles)
                .reduce((init, next) => init.concat(next))
                .filter(tile => {
                    const tileName = tile.substring(tile.lastIndexOf('.') + 1);

                    return tileName.indexOf(query) === 0 || ('question mark'.indexOf(query) === 0 && (tileName === '?i' || tileName === '?r')) ;
                });

            resolve(filteredTiles);
        });
    }

    get(): Promise<any> {
        return new Promise<any>((resolve) => {
           resolve(Tiles);
        });
    }
}

export {TilesJsDao};
