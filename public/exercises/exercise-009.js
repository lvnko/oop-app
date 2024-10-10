var value = 1;

var hello = {
    value: 2,
    world: function() {
        return this.value;
    },
    arrowFunc: ()=>this.value
};


console.log("Example 1", (hello.world)());
console.log("Example 2", hello.world());
// ▲ 物件本身 this = hello, this.value = 2 ▲

console.log("Example 3", (hello.world = hello.world)());
console.log("Example 4", (false || hello.world)());
console.log("Example 5", (hello.world, hello.world)());
// ▲ function 本身被抽出來，變成 global 的 function，this = window, this.value = 1 ▲

var helloArrowFunc = hello.arrowFunc;

console.log("Example 6", (hello.arrowFunc)());
console.log("Example 7", hello.arrowFunc());
console.log("Example 8", (helloArrowFunc)());
console.log("Example 9", (false || hello.arrowFunc)());
console.log("Example 10", helloArrowFunc());
// ▲ function 本身沒有 this，hello 物件也沒有 this。 ▲
// ▲ this 只在 class 創造的物件有意義 --> this.value = 1 ▲