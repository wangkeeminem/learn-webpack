import './assets/css/index.styl';
import './assets/css/font_2524843_wy9v40l2uta/iconfont.css';
import test from './test'
document.getElementById('btn1').onclick = (e) => {
  e.target.style.color = 'yellow'; 
  
}
console.log('我是js我被dsads加fdfds载了')
console.log('我又变了')

if(module.hot){
  module.hot.accept('./test.js',function(){
    //该方法监听print.js变化，一旦发生变化 其他模块不会重新打包构建,而只是执行下面的动作
    test()
  })
  }