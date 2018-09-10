"use strict";
cc._RF.push(module, 'c90edlCoFZBipdCY5MvD94i', 'Map');
// Map.js

'use strict';

// const Utils={

// }

var startLocation = new cc.Vec2();
// let Obstacle=cc.Class({
//     name:"Obstacle",
//     properties: {

//     }
// });
cc.Class({
    extends: cc.Component,

    properties: {
        lineSize: 0,
        gridSize: cc.Vec2,
        player: cc.Prefab,
        controller: cc.Node,
        obstacles: cc.Prefab,
        road: cc.Prefab,
        mapObjects: [],
        camera: cc.Node,
        EndUI: cc.Node,
        _gameEnd: false
    },
    getGamePosi: function getGamePosi(x, y) {
        return new cc.Vec2(this.gridSize.x * x, this.gridSize.y * y);
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        //玩家
        this.player = {
            node: cc.instantiate(this.player),
            posi: new cc.Vec2(parseInt(this.lineSize / 2), 0)
        };
        this.player.node.parent = this.node;

        this.updatePosi(this.player.node, this.player.posi);
        //摄像机
        this.camera.x = this.player.node.x - 300;
        //构建空
        var line = [];
        while (line.length < this.lineSize) {
            line.push(0);
        }
        this.mapObjects.push(line);
        //操作
        this.controller.on('touchstart', function (event) {
            startLocation = event.getLocation();
        }, this);
        this.controller.on('touchend', function (event) {
            var x = event.getLocation().x - startLocation.x;
            var y = event.getLocation().y - startLocation.y;
            if (x == 0 && y == 0 || Math.abs(x) + Math.abs(y) < 20) {
                this.up();
            } else if (Math.abs(x) > Math.abs(y)) {
                if (x > 0) {
                    this.right();
                } else {
                    this.left();
                }
            } else {
                if (y > 0) {
                    this.up();
                } else {
                    this.down();
                }
            }
        }, this);
        this.updateObject();
        window.GameMap = this;
        this.EndUI.on('touchend', function (event) {
            cc.director.loadScene("MainGame");
        }, this);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },
    End: function End() {
        this.EndUI.active = true;
        this._gameEnd = true;
    },
    update: function update(dt) {},
    judgementObstacle: function judgementObstacle(posi) {
        return this.mapObjects[posi.y][posi.x] == 1 || posi.x < 0 || posi.y < 0 || posi.x >= this.lineSize;
    },
    updatePosi: function updatePosi(node, posi) {
        node.position = this.getGamePosi(posi.x, posi.y);
    },
    create: function create(nowNode, posi) {
        var node = cc.instantiate(nowNode);
        node.parent = this.node;
        this.updatePosi(node, posi);
    },
    up: function up() {
        if (this.judgementObstacle({
            x: this.player.posi.x,
            y: this.player.posi.y + 1
        })) {
            return;
        }
        this.player.posi.y++;
        this.updatePosi(this.player.node, this.player.posi);
        this.updateObject();
    },
    down: function down() {
        if (this.judgementObstacle({
            x: this.player.posi.x,
            y: this.player.posi.y - 1
        })) {
            return;
        }
        this.player.posi.y--;
        this.updatePosi(this.player.node, this.player.posi);
    },
    left: function left() {
        if (this.judgementObstacle({
            x: this.player.posi.x - 1,
            y: this.player.posi.y
        })) {
            return;
        }
        this.player.posi.x--;
        this.updatePosi(this.player.node, this.player.posi);
    },
    right: function right() {
        if (this.judgementObstacle({
            x: this.player.posi.x + 1,
            y: this.player.posi.y
        })) {
            return;
        }
        this.player.posi.x++;
        this.updatePosi(this.player.node, this.player.posi);
    },
    updateObject: function updateObject() {
        while (this.player.posi.y + 20 > this.mapObjects.length) {
            if (Math.random() > 0.5) {
                //创建可以移动的死亡道路
                this.buildRoad();
            } else {
                //创建普通带障碍物的道路
                this.buildLine();
            }
        }
    },
    buildRoad: function buildRoad() {
        var line = [];
        while (line.length < this.lineSize) {
            line.push(0);
        }
        this.mapObjects.push(line);
        this.create(this.road, { x: 0, y: this.mapObjects.length - 1 });
    },
    buildLine: function buildLine() {
        var line = [];
        //障碍物概率
        var OP = 0.1;
        while (line.length < this.lineSize) {
            if (OP > Math.random()) {
                line.push(1);
            } else {
                line.push(0);
            }
        }
        this.mapObjects.push(line);
        for (var index = 0; index < line.length; index++) {
            var element = line[index];
            switch (element) {
                case 1:
                    this.create(this.obstacles, { x: index, y: this.mapObjects.length - 1 });
                    break;
                default:
                    break;
            }
        }
    },
    lateUpdate: function lateUpdate() {
        var sizeY = this.player.node.y - this.camera.y;
        if (Math.abs(sizeY) > 10) {
            this.camera.y += sizeY * 0.1;
        }
        var sizeX = this.player.node.x - 300 - this.camera.x;
        if (Math.abs(sizeX) > 200) {
            this.camera.x += sizeX * 0.1;
        }
    }
});

cc._RF.pop();