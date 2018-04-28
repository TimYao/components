/*
 * @Author: TimLie
 * @email: yaolx.csdn.net
 * @github: https://github.com/TimYao
 * @Date: 2018-04-26 14:38:04
 * @Last Modified by: TimLie
 * @Last Modified time: 2018-04-27 18:55:33
 *
 * I need say Welcome to exchange
 *
 * @description 定义验证规则
 * @notice 请配合babel 编译
 *
 */
((_root, factory) => {
  if(typeof define === 'function' && define.amd){
    define(factory);
  } else if(typeof module === 'object' && module.exports){
    module.exports = factory;
  } else {
    // _root.csdn ? (_root = _root.csdn) : (_root = _root.csdn = {});
    //_root.userLoginFeature = factory;
  }
})(this, () => {

})



