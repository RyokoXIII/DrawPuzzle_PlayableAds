const { ccclass, property } = cc._decorator;
declare var window;

@ccclass
export default class GameManager extends cc.Component {


    @property(cc.Node)
    girl: cc.Node = null;
    @property(cc.Node)
    boy: cc.Node = null;
    @property(cc.Node)
    level1: cc.Node = null;
    @property(cc.Node)
    level2: cc.Node = null;
    @property(cc.Node)
    cta: cc.Node = null;

    @property(cc.Node)
    book: cc.Node = null;
    @property(cc.Node)
    book2: cc.Node = null;
    @property(cc.Node)
    book3: cc.Node = null;
    @property(cc.Node)
    cake: cc.Node = null;
    @property(cc.Node)
    cake2: cc.Node = null;
    @property(cc.Node)
    cake3: cc.Node = null;


    @property(cc.Node)
    drawBoy: cc.Node = null;
    @property(cc.Node)
    drawGirl: cc.Node = null;

    @property(cc.Node)
    levelText: cc.Node = null;
    @property(cc.Node)
    levelText2: cc.Node = null;

    public goalPoint = 0;


    onLoad() {
        window.gameReady && window.gameReady();
    }

    start() {
        // Enable Collision
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;
    }

    hasChangeAnim = false;

    update(dt) {
        // console.log("goal point: " + this.goalPoint.toString());
        if (this.goalPoint >= 2 && this.hasChangeAnim == false) {
            this.girl.getComponent(sp.Skeleton).setAnimation(0, "run", true);
            this.boy.getComponent(sp.Skeleton).setAnimation(0, "run", true);
            this.hasChangeAnim = true;
        }

        if (this.book.active == false && this.book2.active == false && this.book3.active == false 
            && this.cake.active == false && this.cake2.active == false && this.cake3.active == false) {
            cc.tween(this.node)
                .delay(2.3)
                .call(() => {
                    this.level1.active = false;
                    this.drawBoy.getComponent(cc.Graphics).clear();
                    this.drawGirl.getComponent(cc.Graphics).clear();
                    this.level2.active = true;
                    this.levelText.active = false;
                    this.levelText2.active = true;
                    this.cta.active = true;
                })
                .start()
        }
    }
}
