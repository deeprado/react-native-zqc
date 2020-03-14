'use strict';

const Controller = require('egg').Controller;

class LbsController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, user';
  }
  async regeo() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
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

module.exports = LbsController;
