import BaseScene from "./BaseScene";
const BG_COLOR = 0xcccccc;

class LocalMultiplayerScene extends BaseScene {
    constructor() {
        let config = {
            cells: [{
                scene: null,
                side: 'left',
                color: 0x66f,
                keys: ['R', 'F', 'D', 'G', 'S', 'A'],
                usePointer: false,
                camera: 'vSplit',
                backgroundColor: BG_COLOR,
                
            },
            {
                scene: null,
                side: 'right',
                color: 0x66f,
                keys: ['I', 'K', 'H', 'L', ';', '\''],
                usePointer: false,
                camera: 'vSplit',
                backgroundColor: BG_COLOR,
                
            }],
        };
        super(config);
    }
}

export default LocalMultiplayerScene;