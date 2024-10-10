(function(){
    // ES5 的 OOP 繼承寫法        
    function Parent(name, age) {
        this.name = name;
        this.age = age;
        this.methodFunc = function() {
            console.log(name, age);
        }
    }

    function Child(saving) {
        this.saving = saving;
    }

    Child.prototype = new Parent("父親", 46);

    var kid = new Child(5000, "父親", 46);

    console.log(kid.name);
    console.log(kid.age);
    console.log(kid.saving);
    // kid.methodFunc();
})();

(function(){
    // ES6 的 OOP 繼承寫法        
    class Parent {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        methodFunc() {
            console.log(`這是 parent ${this.name} ${this.age}`);
        }
        static staticMethod() {
            console.log('這是 parent');
        }
    }

    class Child extends Parent {
        constructor(saving, name, age) {
            super(name, age);
            this.saving = saving;
        }
        methodFunc() {
            console.log(`這是 children ${this.name} ${this.age}`);
        }
        static staticMethod() {
            super.staticMethod();
            console.log('這是 children');
        }
    }

    Child.staticMethod();

    var kid = new Child(200, "小孩", 16);

    console.log(kid.name);
    console.log(kid.age);
    console.log(kid.saving);
    kid.methodFunc();
})();