import DrawBoyController from "./DrawBoyController";
import DrawGirlController from "./DrawGirlController";


const { ccclass, property } = cc._decorator;


@ccclass
export default class ColliderController extends cc.Component {

    @property(DrawBoyController)
    drawBoyManager: DrawBoyController = null;
    @property(DrawGirlController)
    drawGirlManager: DrawGirlController = null;

    @property(cc.Node)
    colliderCake: cc.Node = null;
    @property(cc.Node)
    colliderCake2: cc.Node = null;
    @property(cc.Node)
    colliderCake3: cc.Node = null;
    @property(cc.Node)
    colliderBook: cc.Node = null;
    @property(cc.Node)
    colliderBook2: cc.Node = null;
    @property(cc.Node)
    colliderBook3: cc.Node = null;

    @property(cc.Node)
    cake: cc.Node = null;
    @property(cc.Node)
    cake2: cc.Node = null;
    @property(cc.Node)
    cake3: cc.Node = null;
    @property(cc.Node)
    book: cc.Node = null;
    @property(cc.Node)
    book2: cc.Node = null;
    @property(cc.Node)
    book3: cc.Node = null;

    @property(cc.Node)
    colliderBlueGoal: cc.Node = null;
    @property(cc.Node)
    colliderPinkGoal: cc.Node = null;

    @property(cc.ParticleSystem3D)
    confettiVfx1: cc.ParticleSystem3D = null;
    @property(cc.ParticleSystem3D)
    confettiVfx2: cc.ParticleSystem3D = null;


    start() {

    }

    update(dt: number) {
        if (this.drawBoyManager.boyDrawPoint == 0 && this.drawBoyManager.hasReset == false) {
            this.colliderBook.active = true;
            this.colliderBook2.active = true;
            this.colliderBook3.active = true;
            this.colliderBlueGoal.active = true;

            this.drawBoyManager.hasReset = true;
        }
        else if (this.drawGirlManager.girlDrawPoint == 0 && this.drawGirlManager.hasReset == false) {
            this.colliderCake.active = true;
            this.colliderCake2.active = true;
            this.colliderCake3.active = true;
            this.colliderPinkGoal.active = true;

            this.drawGirlManager.hasReset = true;
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
            if (this.colliderBook.active == false && this.colliderBook2.active == false && this.colliderBook3.active == false) {
                console.log("hit: " + this.drawBoyManager.boyDrawPoint.toString());
                this.drawBoyManager.boyDrawPoint++;
                // other.node.active = false;
            }
            // cc.tween(this.node)
            //     .delay(0.5)
            //     .call(() => {
            //         this.tattooVfx.opacity = 255;
            //     })
            //     .start()       
        }
        else if (self.tag == 1 && other.tag == 0) {
            this.drawBoyManager.borderIsTouched = true;
            console.log("bondary hit!");            
        }
        else if (self.tag == 1 && other.tag == 7) {
            this.drawBoyManager.borderIsTouched = true;
            console.log("bondary hit!");
        }
        else if (self.tag == 1 && other.tag == 18) {
            this.drawBoyManager.borderIsTouched = true;
            console.log("bondary hit!");
        }
        else if (self.tag == 1 && other.tag == 19) {
            this.drawBoyManager.borderIsTouched = true;
            console.log("bondary hit!");
        }

        if (self.tag == 11 && other.tag == 12) {
            console.log("get book");
            other.node.setParent(self.node.getChildByName("book point"));
        }
        else if (self.tag == 11 && other.tag == 13) {
            console.log("save cow");
            this.drawBoyManager.isMoving = false;
            self.node.getComponent(sp.Skeleton).setAnimation(0, "chap2_hitalien", false);

            cc.tween(this.node)
                .delay(0.3)
                .call(() => {
                    other.node.getComponent(sp.Skeleton).setAnimation(0, "hit", false);
                    other.node.getComponent(sp.Skeleton).timeScale = 1.5;
                })
                .delay(0.2)
                .call(() => {
                    // other.node.active = false;
                    self.node.getComponent(sp.Skeleton).setAnimation(0, "chap2_win", true);
                    this.confettiVfx2.play();
                })
                .start()

            this.book.active = false;
            this.book2.active = false;
            this.book3.active = false;
        }

        // Girl collider
        if (self.tag == 4 && other.tag == 5) {
            console.log("hit: " + this.drawGirlManager.girlDrawPoint.toString());
            this.drawGirlManager.girlDrawPoint++;
            other.node.active = false;
        }
        else if (self.tag == 4 && other.tag == 6) {
            if (this.colliderCake.active == false && this.colliderCake2.active == false && this.colliderCake3.active == false) {
                console.log("hit: " + this.drawGirlManager.girlDrawPoint.toString());
                this.drawGirlManager.girlDrawPoint++;
            }
            // cc.tween(this.node)
            //     .delay(0.5)
            //     .call(() => {
            //         this.tattooVfx.opacity = 255;
            //     })
            //     .start()       
        }
        else if (self.tag == 4 && other.tag == 0) {
            this.drawGirlManager.borderIsTouched = true;
            console.log("bondary hit!");
        }
        else if (self.tag == 4 && other.tag == 7) {
            this.drawGirlManager.borderIsTouched = true;
            console.log("bondary hit!");
        }
        else if (self.tag == 4 && other.tag == 18) {
            this.drawGirlManager.borderIsTouched = true;
            console.log("bondary hit!");
        }
        else if (self.tag == 4 && other.tag == 19) {
            this.drawGirlManager.borderIsTouched = true;
            console.log("bondary hit!");
        }

        if (self.tag == 14 && other.tag == 15) {
            console.log("get cake");
            other.node.setParent(self.node.getChildByName("cake point"));
        }
        else if (self.tag == 14 && other.tag == 16) {
            console.log("save cow");
            this.drawGirlManager.isMoving = false;
            self.node.getComponent(sp.Skeleton).setAnimation(0, "chap2-hitalien", false);

            cc.tween(this.node)
                .delay(0.3)
                .call(() => {
                    other.node.getComponent(sp.Skeleton).setAnimation(0, "hit", false);
                    other.node.getComponent(sp.Skeleton).timeScale = 1.5;
                })
                .delay(0.2)
                .call(() => {
                    // other.node.active = false;
                    self.node.getComponent(sp.Skeleton).setAnimation(0, "chap2_win", true);
                    this.confettiVfx1.play();
                })
                .start()

            this.cake.active = false;
            this.cake2.active = false;
            this.cake3.active = false;
        }
    }

    onCollisionStay(other, self) {
        // Boy collider
        if (self.tag == 1 && other.tag == 3) {
            if (this.colliderBook.active == false && this.colliderBook2.active == false && this.colliderBook3.active == false) {
                console.log("hit: " + this.drawBoyManager.boyDrawPoint.toString());
                this.drawBoyManager.boyDrawPoint++;
            }
            // cc.tween(this.node)
            //     .delay(0.5)
            //     .call(() => {
            //         this.tattooVfx.opacity = 255;
            //     })
            //     .start()       
        }

        // girl collider
        if (self.tag == 4 && other.tag == 6) {
            if (this.colliderCake.active == false && this.colliderCake2.active == false && this.colliderCake3.active == false) {
                console.log("hit: " + this.drawGirlManager.girlDrawPoint.toString());
                this.drawGirlManager.girlDrawPoint++;
            }
            // cc.tween(this.node)
            //     .delay(0.5)
            //     .call(() => {
            //         this.tattooVfx.opacity = 255;
            //     })
            //     .start()       
        }
    }

    onCollisionExit(other, self) {
        if (self.tag == 1 && other.tag == 3) {
            if (this.colliderBook.active == false && this.colliderBook2.active == false && this.colliderBook3.active == false) {
                this.drawBoyManager.drawOut = true;
            }
        }
        else if (self.tag == 4 && other.tag == 6) {
            if (this.colliderCake.active == false && this.colliderCake2.active == false && this.colliderCake3.active == false) {
                this.drawGirlManager.drawOut = true;
            }
        }
    }
}
