'use strict';

const Controller = require('egg').Controller;

const user = {
  id: 'aa',
  nickname: 'deeprado',
  gender: 'm',
  avatarType: 'builtin',
  avatarName: 'american-football-player-1',
  intro: 'adsfsf',
  backgroundType: 'builtin',
  backgroundName: 'juhua',
  backgroundImage: null,
  backgroundFile: null,
  stat: {
    post: 2323,
    liked: 22,
    commented: 44,
  },
};

class AccountController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, user';
  }
  async edit() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      data: {
        user,
      },
    };
  }
  async updateSettings() {
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

module.exports = AccountController;
