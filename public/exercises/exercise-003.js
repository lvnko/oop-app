var obj = {
    "fooKey": "fooVal",
    "barKey": "barVal",
    "testKey": "testVal",
    "lorem": "Lorem Ipsum",
    "mount": "Gundam V",
    "title": "King",
    "weapon": "Excalibur Caledfwlch"
};

const { fooKey: foo, barKey: bar, ...restObj } = obj;

console.log(`new foo => ${foo}`);
console.log(`new bar => ${bar}`);
console.log('▼ ▼ ▼ Below are values extracted by rest operator ▼ ▼ ▼');
console.table(restObj);

var ext = {
    "master": "Yoshiyuki Tomino",
    "spouse": "Queen Elizabeth",
    "stage": "Forest of Spiders"
};

var sets = {
    ...obj,
    ...ext,
    createdAt: new Date()
};

console.log('▼ ▼ ▼ Below is an object containing values combined from obj, ext and some additional values ▼ ▼ ▼');
console.table(sets);

let arrA = ["Nostrud", "fugiat", "duis", "duis", "culpa"];
let arrB = ["veniam", "dolor", "Lorem", "ex."];
let arrC = ["Cupidatat", "est", "irure", "nisi", "nulla", "et."];
let arrD = [
    ...arrA,
    ...arrB,
    ...arrC
];

console.log('▼ ▼ ▼ Below is an array containing values combined from arrA, arrB and arrC ▼ ▼ ▼');
console.log(arrD);