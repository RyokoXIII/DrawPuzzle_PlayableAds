import GameManager from "./GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DrawSoccerBoyController extends cc.Component {

    @property(GameManager)
    manager: GameManager = null;

    @property(cc.Node)
    drawArea: cc.Node = null;
    @property(cc.Node)
    soccerBoyDrawCollider: cc.Node = null;

    @property(cc.Node)
    colliderBlueGoal: cc.Node = null;
    @property(cc.Node)
    colliderPinkGoal: cc.Node = null;
    @property(cc.Node)
    colliderRedGoal: cc.Node = null;

    @property(cc.Node)
    soccerBoy: cc.Node = null;

    @property(cc.Node)
    lineRed: cc.Node = null;
    @property(cc.Node)
    hand: cc.Node = null;

    @property(cc.Float)
    moveSpeed = 1000;


    touches: cc.Vec2[] = []
    wayPoints: cc.Vec2[] = []
    graphics: cc.Graphics = null;
    defaultPos: cc.Vec3;
    currentWayPointIndex = 0;
    public soccerBoyDrawPoint = 0;
    public borderIsTouched = false;
    public hasReset = false;
    public drawOut = false;
    public isMoving = false;


    start() {
        this.soccerBoyDrawCollider.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.soccerBoyDrawCollider.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.soccerBoyDrawCollider.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.soccerBoyDrawCollider.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);

        this.graphics = this.getComponent(cc.Graphics);

        // Set draw collider default pos
        this.defaultPos = this.soccerBoyDrawCollider.position;
    }

    onTouchStart(event) {
        // Set line color
        this.node.getComponent(cc.Graphics).fillColor = new cc.Color(247, 5, 6, 255);
        this.node.getComponent(cc.Graphics).strokeColor = new cc.Color(247, 5, 6, 255);
        this.lineRed.active = false;

        this.touches.length = 0;
        this.wayPoints = [];
        this.touches.push(event.touch.getLocation());

        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();
        const touchPos = this.soccerBoyDrawCollider.parent.convertToNodeSpaceAR(touchLoc);
        this.wayPoints.push(touchPos);

        this.soccerBoyDrawCollider.setPosition(touchPos);
    }

    onTouchMove(event) {
        let touches = this.touches;
        touches.push(event.touch.getLocation());

        const MIN_POINT_DISTANCE = 10;

        this.graphics.clear();
        let worldPos = this.node.convertToWorldSpaceAR(cc.v2());
        this.graphics.moveTo(touches[0].x - worldPos.x, touches[0].y - worldPos.y);
        let lastIndex = 0;
        for (let i = 1, l = touches.length; i < l; i++) {
            if (touches[i].sub(touches[lastIndex]).mag() < MIN_POINT_DISTANCE) {
                continue;
            }
            lastIndex = i;
            this.graphics.lineTo(touches[i].x - worldPos.x, touches[i].y - worldPos.y);
        }
        this.graphics.stroke();

        var touches2 = event.getTouches();
        var touchLoc = touches2[0].getLocation();
        const touchPos = this.soccerBoyDrawCollider.parent.convertToNodeSpaceAR(touchLoc);
        this.wayPoints.push(touchPos);
        const lastWaypoint = this.wayPoints[this.wayPoints.length - 2];

        // Rotate object to face the same direction
        // const distance = touchPos.sub(this.wayPoints[0]).mag();

        // const angleRadians = Math.atan2(touchPos.y - this.boy.y, touchPos.x - this.boy.x);
        // const angleDegrees = cc.misc.radiansToDegrees(angleRadians);
        // this.boy.rotation = -angleDegrees;

        this.soccerBoyDrawCollider.setPosition(cc.v2(touchPos.x, touchPos.y));
    }

    onTouchEnd(event) {

        console.log("waypoints: " + this.wayPoints.length);

        if (this.soccerBoyDrawPoint >= 2 && this.borderIsTouched == false && this.drawOut == false) {
            this.soccerBoyDrawCollider.active = false;
            this.manager.goalPoint++;

            this.isMoving = true;
            this.hand.active = false;

            // Get the last waypoint in the line
            const lastWayPoint = this.wayPoints[this.wayPoints.length - 1];
            // Schedule the movement along line
            // this.schedule(this.MoveChar, 0);
            // this.boy.getComponent(sp.Skeleton).setAnimation(0, "run", true);
        }
        else if (this.soccerBoyDrawPoint < 2 || this.borderIsTouched == true || this.drawOut == true) {
            this.graphics.clear();
            this.lineRed.active = true;
            this.wayPoints.length = 0;
            this.soccerBoyDrawCollider.setPosition(this.defaultPos);
            this.soccerBoyDrawPoint = 0;
            this.hasReset = false;
            this.borderIsTouched = false;
            this.drawOut = false;
        }
    }

    MoveChar() {
        if (!this.isMoving) return;

        const targetPos = this.wayPoints[this.currentWayPointIndex];
        const currentPos = this.soccerBoy.getPosition();

        if (currentPos.fuzzyEquals(targetPos, 15)) {
            // Reach the current waypoint, move to the next one
            this.currentWayPointIndex++;
            if (this.currentWayPointIndex >= this.wayPoints.length) {
                // Reached the end of the line
                this.stopChar();
                return;
            }
        }

        // Move towards the target pos
        // const moveOffSet = targetPos.sub(currentPos).normalize();
        const moveOffSet = targetPos.sub(currentPos).normalize().mul(this.moveSpeed * cc.director.getDeltaTime());
        this.soccerBoy.setPosition(currentPos.add(moveOffSet));
    }

    stopChar() {
        this.isMoving = false;
        // this.boy.getComponent(sp.Skeleton).setAnimation(0, "hitalien", false);
    }

    update(dt: number) {
        if (this.isMoving == true && this.manager.goalPoint >= 3) {
            this.MoveChar();
        }
    }
}
