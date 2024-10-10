// ES5 的 constructor 寫法...

// function Dog ({ name, color }) {
//     this.name = name;
//     this.color = color;
// }

// ES6 的 constructor 寫法...

class ShibaInu { // class 是一個用以描述 Object 建造藍圖的語法
    constructor({ name, color }) {
        // 初始化
        this.name = name;
        this.color = color;
    }
    // 編寫 Method function 的範圍
    playWith(someone) {
        console.log(`${this.color}的${this.name}在跟${someone.name}一起玩。`);
    }
    // 標記為靜態的意思是，此 function 將被上稱成 class 級別的功能
        // 該注意的是，被標記為 static 的 function 是不能被所屬的 class
        // 所製造出來的 instace 所使用
    static calculate(a, b, ...c) {
        let result = a + b + c.reduce((accm, curr)=>{return accm + curr}, 0);
        console.log(result);
        return result;
    }
}

class Cat {
    constructor({ name }) {
        this.name = name;
    }
}

let shibaBon = new ShibaInu({
    name: "小幫",
    color: "棕色"
});

let kittyCat = new Cat({
    name: "亞莉塔"
});

console.log(shibaBon);

shibaBon.playWith(kittyCat);

console.log('Result of calculate => ',ShibaInu.calculate(1,2,3,4,5,6));

/*
    shibaBon.calculate(...) // <-- 此使用方法將會失敗，因為 static 的 function 不能被 instace 所呼喚！
*/