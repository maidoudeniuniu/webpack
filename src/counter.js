/*
 * @Descripttion: 
 * @version: 
 * @Author: aniu
 * @Date: 2021-03-24 18:12:42
 * @LastEditors: aniu
 * @LastEditTime: 2021-03-24 18:19:37
 */
function counter () {
  var num = 12
  var btn = document.createElement("div");
      btn.innerHTML = num
      btn.onclick = function () {
        num++
        btn.innerHTML = num
      }
      document.body.appendChild(btn);
}

export default counter