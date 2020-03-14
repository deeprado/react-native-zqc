'use strict';

const Controller = require('egg').Controller;

const stat = {
  post: 2323,
  liked: 22,
  commented: 44,
};

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
  stat,
};

const settings = {
  betaUser: false,
  city: {
    name: '全国',
    code: '',
  },
  sport: {
    name: '网球',
    code: 'tennis',
  },
  storage: {
    quota: 1073741824,
    usedAmountMonth: 0,
  },
  video: {
    autoPlay: {
      wifi: true,
      mobile: true,
    },
    playRate: {
      wifi: 'hd',
      mobile: 'ld',
    },
    uploadRate: {
      wifi: 'fhd',
      mobile: 'hd',
    },
  },
};

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, user';
  }
  async isLogined() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      msg: 'isLogined',
      data: {
        user: null,
        settings: null,
      },
    };
  }
  async register() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
    };
  }
  async login() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      data: {
        user,
        settings,
      },
    };
  }
  async resetPassword() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
    };
  }
  async logout() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      msg: 'logout',
    };
  }

  async nearby() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      msg: 'nearby',
      data: {
        users: [],
      },
    };
  }
  async info() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      msg: 'info',
      data: {
        user,
      },
    };
  }
  async infos() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      data: {
        users: [
          {
            ...user,
          },
        ],
      },
    };
  }
  async stats() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      data: {
        stats: [
          {
            id: user.id,
            ...stat,
          },
        ],
      },
    };
  }
}

module.exports = UserController;
