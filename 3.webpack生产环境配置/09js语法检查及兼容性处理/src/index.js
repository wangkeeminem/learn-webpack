function add(x, y) {
  return x + y;
}
const minu = (a) => a * 2;

minu();

const p = new Promise((res) => {
  setTimeout(() => {
    console.log('hahaha');
    res('hahaha');
  }, 1000);
});
p.then((res) => res);
// eslint-disable-next-line
console.log(add(1, 99));
