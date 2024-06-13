import DrawBoyController from "./DrawBoyController";
import DrawGirlController from "./DrawGirlController";
import DrawSoccerBoyController from "./DrawSoccerBoyController";


const { ccclass, property } = cc._decorator;


@ccclass
export default class ColliderController extends cc.Component {

    @property(DrawBoyController)
    drawBoyManager: DrawBoyController = null;
    @property(DrawGirlController)
    drawGirlManager: DrawGirlController = null;
    @property(DrawSoccerBoyController)
    drawSoccerBoyManager: DrawSoccerBoyController = null;

    @property(cc.Node)
    colliderCheckpoint1: cc.Node = null;
    @property(cc.Node)
    colliderCheckpoint2: cc.Node = null;
    @property(cc.Node)
    colliderCheckpoint3: cc.Node = null;

    @property(cc.Node)
    checkPoint1: cc.Node = null;
    @property(cc.Node)
    checkPoint2: cc.Node = null;
    @property(cc.Node)
    checkPoint3: cc.Node = null;

    @property(cc.Node)
    colliderBlueGoal: cc.Node = null;
    @property(cc.Node)
    colliderPinkGoal: cc.Node = null;
    @property(cc.Node)
    colliderRedGoal: cc.Node = null;

    @property(cc.ParticleSystem3D)
    confettiVfx1: cc.ParticleSystem3D = null;
    @property(cc.ParticleSystem3D)
    confettiVfx2: cc.ParticleSystem3D = null;
    @property(cc.ParticleSystem3D)
    confettiVfx3: cc.ParticleSystem3D = null;


    start() {

    }

    update(dt: number) {
        if (this.drawBoyManager.boyDrawPoint == 0 && this.drawBoyManager.hasReset == false) {
            this.colliderCheckpoint1.active = true;
            this.colliderBlueGoal.active = true;

            this.drawBoyManager.hasReset = true;
        }
        else if (this.drawGirlManager.girlDrawPoint == 0 && this.drawGirlManager.hasReset == false) {
            this.colliderCheckpoint2.active = true;
            this.colliderPinkGoal.active = true;

            this.drawGirlManager.hasReset = true;
        }
        else if (this.drawSoccerBoyManager.soccerBoyDrawPoint == 0 && this.drawSoccerBoyManager.hasReset == false) {
            this.colliderCheckpoint3.active = true;
            this.colliderRedGoal.active = true;

            this.drawSoccerBoyManager.hasReset = true;
        }
    }

    // ----------Detect Collider-----------
    onCollisionEnter(other, self) {

        // Boy collider
        if (self.tag == 1 && other.tag == 2) {
            console.log("hit: " + this.drawBoyManager.boyDrawPoint.toString());
            this.drawBoyManager.boyDrawPoint++;
            other.node.active = false;
        }
        else if (self.tag == 1 && other.tag == 3) {
            if (this.colliderCheckpoint1.active == false) {
                console.log("hit: " + this.drawBoyManager.boyDrawPoint.toString());
                this.drawBoyManager.boyDrawPoint++;
            }
        }
        else if (self.tag == 1 && other.tag == 0) {
            this.drawBoyManager.borderIsTouched = true;
        }
        else if (self.tag == 1 && other.tag == 34) {
            this.drawBoyManager.borderIsTouched = true;
        }
        else if (self.tag == 1 && other.tag == 35) {
            this.drawBoyManager.borderIsTouched = true;
        }
        else if (self.tag == 1 && other.tag == 36) {
            this.drawBoyManager.borderIsTouched = true;
        }

        if (self.tag == 11 && other.tag == 12) {
            console.log("checkpoint 1");
            other.node.setParent(self.node.getChildByName("Check point 1"));
        }
        else if (self.tag == 11 && other.tag == 13) {
            console.log("save cow");
            this.drawBoyManager.isMoving = false;
            // self.node.getComponent(sp.Skeleton).setAnimation(0, "chap2_hitalien", false);
            other.node.active = false;
            self.node.getComponent(sp.Skeleton).setAnimation(0, "chap2_winandcow", true);
            this.confettiVfx1.play();

            // cc.tween(this.node)
            //     .delay(0.5)
            //     .call(() => {
            //         other.node.getComponent(sp.Skeleton).setAnimation(0, "alien get hit", false);
            //     })
            //     .delay(0.5)
            //     .call(() => {
            //         other.node.active = false;
            //         self.node.getComponent(sp.Skeleton).setAnimation(0, "chap2_winandcow", true);
            //     })
            //     .start()

            this.checkPoint1.active = false;
        }

        // Girl collider
        if (self.tag == 4 && other.tag == 5) {
            console.log("hit: " + this.drawGirlManager.girlDrawPoint.toString());
            this.drawGirlManager.girlDrawPoint++;
            other.node.active = false;
        }
        else if (self.tag == 4 && other.tag == 6) {
            if (this.colliderCheckpoint2.active == false) {
                console.log("hit: " + this.drawGirlManager.girlDrawPoint.toString());
                this.drawGirlManager.girlDrawPoint++;
            }
        }
        else if (self.tag == 4 && other.tag == 0) {
            this.drawGirlManager.borderIsTouched = true;
        }
        else if (self.tag == 4 && other.tag == 31) {
            this.drawGirlManager.borderIsTouched = true;
        }
        else if (self.tag == 4 && other.tag == 32) {
            this.drawGirlManager.borderIsTouched = true;
        }
        else if (self.tag == 4 && other.tag == 33) {
            this.drawGirlManager.borderIsTouched = true;
        }

        if (self.tag == 14 && other.tag == 15) {
            console.log("checkpoint 2");
            other.node.setParent(self.node.getChildByName("Check point 2"));
        }
        else if (self.tag == 14 && other.tag == 16) {
            console.log("save cow");
            this.drawGirlManager.isMoving = false;
            // self.node.getComponent(sp.Skeleton).setAnimation(0, "chap2-hitalien", false);
            other.node.active = false;
            self.node.getComponent(sp.Skeleton).setAnimation(0, "chap2_popupwin", true);
            this.confettiVfx2.play();

            // cc.tween(this.node)
            //     .delay(0.5)
            //     .call(() => {
            //         other.node.getComponent(sp.Skeleton).setAnimation(0, "alien get hit", false);
            //     })
            //     .delay(0.5)
            //     .call(() => {
            //         other.node.active = false;
            //         self.node.getComponent(sp.Skeleton).setAnimation(0, "chap2_popupwin", true);
            //     })
            //     .start()

            this.checkPoint2.active = false;
        }

        // Soccer Boy collider
        if (self.tag == 21 && other.tag == 22) {
            console.log("hit: " + this.drawSoccerBoyManager.soccerBoyDrawPoint.toString());
            this.drawSoccerBoyManager.soccerBoyDrawPoint++;
            other.node.active = false;
        }
        else if (self.tag == 21 && other.tag == 23) {
            if (this.colliderCheckpoint3.active == false) {
                console.log("hit: " + this.drawSoccerBoyManager.soccerBoyDrawPoint.toString());
                this.drawSoccerBoyManager.soccerBoyDrawPoint++;
            }
        }
        else if (self.tag == 21 && other.tag == 0) {
            this.drawSoccerBoyManager.borderIsTouched = true;
        }
        else if (self.tag == 21 && other.tag == 30) {
            this.drawSoccerBoyManager.borderIsTouched = true;
        }
        else if (self.tag == 21 && other.tag == 31) {
            this.drawSoccerBoyManager.borderIsTouched = true;
        }
        else if (self.tag == 21 && other.tag == 33) {
            this.drawSoccerBoyManager.borderIsTouched = true;
        }

        if (self.tag == 24 && other.tag == 26) {
            console.log("checkpoint 3");
            other.node.setParent(self.node.getChildByName("Check point 3"));
        }
        else if (self.tag == 24 && other.tag == 27) {
            console.log("save cow");
            this.drawSoccerBoyManager.isMoving = false;
            // self.node.getComponent(sp.Skeleton).setAnimation(0, "chap2_hitalien", false);
            other.node.setParent(self.node.getChildByName("cow pos"));
            other.node.setScale(-2,2);
            other.node.getComponent(sp.Skeleton).setAnimation(0, "STANDING", true);
            self.node.getComponent(sp.Skeleton).setAnimation(0, "chap2_win", true);
            this.confettiVfx3.play();

            this.checkPoint3.active = false;
        }
    }

    onCollisionStay(other, self) {
        // Boy collider
        if (self.tag == 1 && other.tag == 3) {
            if (this.colliderCheckpoint1.active == false) {
                console.log("hit: " + this.drawBoyManager.boyDrawPoint.toString());
                this.drawBoyManager.boyDrawPoint++;
            }
        }

        // girl collider
        if (self.tag == 4 && other.tag == 6) {
            if (this.colliderCheckpoint2.active == false) {
                console.log("hit: " + this.drawGirlManager.girlDrawPoint.toString());
                this.drawGirlManager.girlDrawPoint++;
            }
        }

        // Soccer Boy collider
        if (self.tag == 21 && other.tag == 23) {
            if (this.colliderCheckpoint3.active == false) {
                console.log("hit: " + this.drawSoccerBoyManager.soccerBoyDrawPoint.toString());
                this.drawSoccerBoyManager.soccerBoyDrawPoint++;
            }
        }
    }

    onCollisionExit(other, self) {
        if (self.tag == 1 && other.tag == 3) {
            if (this.colliderCheckpoint1.active == false) {
                this.drawBoyManager.drawOut = true;
            }
        }
        else if (self.tag == 4 && other.tag == 6) {
            if (this.colliderCheckpoint2.active == false) {
                this.drawGirlManager.drawOut = true;
            }
        }
        else if (self.tag == 21 && other.tag == 23) {
            if (this.colliderCheckpoint3.active == false) {
                this.drawSoccerBoyManager.drawOut = true;
            }
        }
    }
}
