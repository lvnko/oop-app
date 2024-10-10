// 封裝練習
// 只曝露出想給外使用的功能，並隱藏起不想對外曝露的功能。

// 以下 getName 就是一個會被隱藏的功能的例子。 
const getName = (_thing) => {
    if (typeof _thing === "object" && _thing.name)
        return _thing.name;
    else if (typeof _thing === "string")
        return _thing;
    return "";
}

class Dog {
    constructor({ name, color }) {
        this.name = name;
        this.color = color;
        this.mouth = {
            bite: (something)=>{
                console.log(`${this.name}咬${something}`);
            },
            eat: (something)=>{
                console.log(`${this.name}吃${something}`);
            },
            bark: ()=>{
                console.log(`${this.name}吠叫`);
            }
        };
    }

    bite(something) {
        const name = getName(something);
        this.mouth.bite(name);
    }

    eat(thing) {
        const name = getName(thing);
        this.mouth.eat(name);
    }

    bark() {
        this.mouth.bark();
    }
}

class Cat {
    constructor(name) {
        this.name = name;
    }
}

let dog = new Dog({
    name: "小黑", color: "黑色"
});

let kitty = new Cat("凱蒂");

dog.eat("骨頭");
dog.bite(kitty);
dog.bark();
 