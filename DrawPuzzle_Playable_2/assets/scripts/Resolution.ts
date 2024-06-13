const { ccclass, property } = cc._decorator;

@ccclass
export default class Resolution extends cc.Component {

    @property(cc.Node)
    level1: cc.Node = null;
    @property(cc.Node)
    level2: cc.Node = null;


    update(dt) {
        var frameSize = cc.view.getFrameSize();

        if (frameSize.height > frameSize.width) {
            // portrait
            this.level1.setScale(cc.Vec2.ONE);
            this.level2.setScale(cc.Vec2.ONE);
        }
        else if (frameSize.height < frameSize.width) {
            // landscape
            this.level1.setScale(new cc.Vec2(1.2,1.2));
            this.level2.setScale(new cc.Vec2(1.2,1.2))
        }
    }
}
