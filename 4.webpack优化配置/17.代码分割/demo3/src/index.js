
// import {test1} from './test'
// import  $ from 'jquery'
// console.log($)

// test1()
// eslint-disable-next-line
import(/* webpackChunkName: 'test' */'./test')
.then(({test1,test2})=>{
// console.log(res)
test1()
test2()
})
.catch(()=>{
 console.log('文件加载失败')
})
document.getElementById('btn1').onclick = (e) => {
  e.target.style.color = 'yellow'; 
  
}
function sum(...args){
  return args.reduce((p,c)=>p+c,0)
}

console.log(sum(1,2,3,4))
console.log('我是js我被dsads加fdfds载了')
console.log('我又变了')

// if(module.hot){
//   module.hot.accept('./test.js',function(){
//     //该方法监听print.js变化，一旦发生变化 其他模块不会重新打包构建,而只是执行下面的动作
//     test1()
//   })
//   }