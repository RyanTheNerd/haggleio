import BaseScene from "./BaseScene";
const BG_COLOR = 0xcccccc;

class LocalMultiplayerScene extends BaseScene {
    constructor() {
        let config = {
            cells: [{
                scene: null,
                side: 'left',
                color: 0x66f,
                keys: ['W', 'S', 'A', 'D', 'F', 'G'],
                usePointer: false,
                camera: 'vSplit',
                backgroundColor: BG_COLOR,
                
            },
            {
                scene: null,
                side: 'right',
                color: 0x66f,
                keys: ['O', 'L', 'K', 'SEMICOLON', 'J', 'H'],
                usePointer: false,
                camera: 'vSplit',
                backgroundColor: BG_COLOR,
                
            }],
        };
        super(config);
    }
}

export default LocalMultiplayerScene;