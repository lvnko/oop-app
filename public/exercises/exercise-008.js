class AbstractClass {
    constructor() {}
    method() {
        return 'Original Class';
    }
}


class PolymorphA {
    constructor() {}
    func(_value) {
        if (typeof _value === "number") return 1;
        if (typeof _value === "boolean") return true;
        if (typeof _value === "string") return "這是類別A";
    }
    method() {
        return 'Polymorph A';
    }
}

class PolymorphB {
    constructor() {}
    func(_value) {
        if (typeof _value === "number") return 2;
        if (typeof _value === "boolean") return false;
        if (typeof _value === "string") return "這是類別B";
    }
    method() {
        return 'Polymorph B';
    }
}

function run(p) {
    let c = '';
    let result = p.func(c); 
    console.log(result);
}

let pOri = new AbstractClass();
let pA = new PolymorphA();
let pB = new PolymorphB();

run(pA);
run(pB);

console.log(pOri.method());
console.log(pA.method());
console.log(pB.method());