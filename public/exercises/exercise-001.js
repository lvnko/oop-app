var person = {
    name: "人",
    pickup: function(thingGrabbed) {
        return `${this.name}拿起${thingGrabbed.name}`;
    },
    drink: function(container) {
        return `喝${container.thingInside.name}。`;
    }
};

var container = {
    name: "杯子",
    thingInside: null,
    fillIn: function(thing) {
        this.thingInside = thing;
    }
}

var substance = {
    name: "水"
};

container.fillIn(substance);

console.log(person.pickup(container) + person.drink(container));