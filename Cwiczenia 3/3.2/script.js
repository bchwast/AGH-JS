Object.prototype.bar = 1;
var foo = {moo: 2};

for (var i in foo) {
    console.log(i);
}
