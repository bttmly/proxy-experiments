var data = [
  {size: "l", color: "red", type: "shirt"},
  {size: "s", color: "red", type: "shirt"},
  {size: "l", color: "blue", type: "pants"},
  {size: "s", color: "red", type: "pants"}
];

var find = require("./");

var newline = console.log.bind(console, "");

console.log("find.bySize(data, 's')");
console.log(JSON.stringify(find.bySize(data, 's')));
newline();

console.log("find.whereColor(data, 'red')");
console.log(JSON.stringify(find.whereColor(data, 'red')));
newline();

console.log("find.bySizeAndColor(data, 's', 'red')");
console.log(JSON.stringify(find.bySizeAndColor(data, 's', 'red')));
newline();

console.log("find.whereSizeAndColor(data, 's', 'red')");
console.log(JSON.stringify(find.whereSizeAndColor(data, 's', 'red')));