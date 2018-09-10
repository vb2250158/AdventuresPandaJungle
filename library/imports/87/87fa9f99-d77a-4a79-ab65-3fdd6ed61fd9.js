"use strict";
cc._RF.push(module, '87fa9+Z13pKeatlP91u1h/Z', 'Road');
// Road.js

"use strict";

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

    start: function start() {
        this.intervalTime = Math.random() * 2 + this.intervalTime;
    },
    update: function update(dt) {
        if (this._countDown <= 0) {
            if (Math.random() < 0.5) {
                var index = parseInt(Math.random() * this.moveObjects.length);
                var node = cc.instantiate(this.moveObjects[index]);
                node.parent = this.node;
                node.x = 0;
                node.y = 0;
            } else {
                var _index = parseInt(Math.random() * this.moveObjects.length);
                var _node = cc.instantiate(this.moveObjects[_index]);
                _node.parent = this.node;
                _node.getComponent("Move").speed *= -1;
                _node.x = 900;
                _node.y = 0;
            }
            this._countDown = this.intervalTime;
        } else {
            this._countDown -= dt;
        }
    }
});

cc._RF.pop();