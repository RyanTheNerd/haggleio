import BaseScene from './BaseScene';

const BG_COLOR = 0xcccccc;


class SinglePlayerScene extends BaseScene {
    constructor() {
        let config = {
            cells: [{
                scene: null,
                side: 'left',
                color: 0x66f,
                keys: ['W', 'D', 'A', 'D', 'SPACE', 'SHIFT'],
                usePointer: true,
                camera: 'fullscreen',
                backgroundColor: BG_COLOR,
                
            }],
        };
        super(config);
    }
}

export default SinglePlayerScene;