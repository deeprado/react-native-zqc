'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/isLogined', controller.user.isLogined);
  router.post('/register', controller.user.register);
  router.post('/login', controller.user.login);
  router.get('/logout', controller.user.logout);

  // 用户
  router.get('/user/nearby', controller.user.nearby);
  router.get('/user/info', controller.user.info);
  router.get('/user/infos', controller.user.infos);
  router.get('/user/stats', controller.user.stats);

  // 账号
  router.get('/account/edit', controller.account.edit);
  router.get('/account/updateSettings', controller.account.updateSettings);
  router.get('/account/info', controller.account.info);
  router.get('/account/infos', controller.account.infos);

  // 文件
  router.post('/file/upload', controller.file.upload);
  router.get('/file/info', controller.file.info);
  router.get('/file/infos', controller.file.infos);
  router.get('/file/stats', controller.file.stats);

  // court
  router.get('/court/info', controller.court.info);
  router.get('/court/infos', controller.court.infos);
  router.get('/court/stats', controller.court.stats);

  // 定位
  router.get('/lbs/regeo', controller.lbs.regeo);

  // 安全
  router.get('/security/sendVerifyCode', controller.security.sendVerifyCode);

  // 帖子
  router.get('/post/byCity', controller.post.byCity);
  router.get('/post/nearby', controller.post.nearby);
  router.get('/post/infos', controller.post.infos);
  router.get('/post/infos', controller.post.infos);
};
