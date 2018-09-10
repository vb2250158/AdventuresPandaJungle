// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        moveObjects: [cc.Prefab],
        intervalTime: 3,
        _countDown: 3
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.intervalTime = Math.random() * 2 + this.intervalTime;
    },

    update(dt) {
        if (this._countDown <= 0) {
            if (Math.random() < 0.5) {
                let index = parseInt(Math.random() * this.moveObjects.length);
                let node = cc.instantiate(this.moveObjects[index]);
                node.parent = this.node;
                node.x = 0;
                node.y = 0;
            } else {
                let index = parseInt(Math.random() * this.moveObjects.length);
                let node = cc.instantiate(this.moveObjects[index]);
                node.parent = this.node;
                node.getComponent("Move").speed *= -1;
                node.x = 900;
                node.y = 0;
            }
            this._countDown = this.intervalTime;
        } else {
            this._countDown -= dt;
        }
    },
});
