/**
 *  題目 
 *  例：柴犬在跟貓一起玩
 */

function ShibaInu(name, color) {
    this.name = name;
    this.color = color;
    this.showMoeMeo = function() {
        console.log("我會責萌");
    };
    this.giveMeSomeCaress = function() {
        console.log("快来摸摸我～");
    };
    this.coquettish = function() {
        console.log("我會撒嬌");
    };
    this.playDumb = function() {
        console.log("我什麼都不知道～");
    }
    this.playWith = function(someone) {
        console.log(this.name + "在跟" + someone.name + "一起玩");
    }
}

function Cat(name) {
    this.name = name;
}

var dog = new ShibaInu("阿旺", "黃色");
var cat =  new Cat("亞莉塔");

dog.playWith(cat);