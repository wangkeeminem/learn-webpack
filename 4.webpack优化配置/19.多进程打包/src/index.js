



document.getElementById('btn1').onclick = (e) => {
  e.target.style.color = 'yellow'; 
  import(/*webpackChunkName:'test',webpackPrefetch:true*/'./test')
  .then(({test1})=>{
    test1()
    console.log('懒加载了');
  })
  .catch(()=>{
    console.log('加载失败了')
  }) 
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
//注册serviceworker并处理兼容性问题：
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('/service-worker.js')
    .then(()=>{
      console.log('sw注册成功了')
    })
    .catch(()=>{
      console.log('sw注册失败了')
    })
  })
}