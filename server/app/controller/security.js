'use strict';

const Controller = require('egg').Controller;

class SecurityController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, user';
  }
  async sendVerifyCode() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      data: {
        csrfToken: 'asdfs',
      },
    };
  }
  async info() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
    };
  }
  async infos() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
    };
  }
}

module.exports = SecurityController;
