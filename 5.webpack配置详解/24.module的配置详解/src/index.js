// import add from './add'
// import count from './count'

import('./add')
.then((add)=>{
  console.log(add)
  add.default(1,99)
})
.catch(()=>{
  console.log('失败了')
})
console.log('我是indexjs文件')
// console.log(add(1,99))
// console.log(count(100,99))