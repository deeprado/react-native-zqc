'use strict';

const Controller = require('egg').Controller;

const stat = {
  liked: 23,
  commented: 23,
};

class CourtController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, user';
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
      data: {
        courts: [
          {
            id: 1,
            name: 'aaaa',
            location: {
              longitude: 126.541898,
              altitude: 45.808823,
            },
            stat: {
              liked: 23,
              commented: 23,
            },
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
            id: 1,
            ...stat,
          },
          {
            id: 2,
            ...stat,
          },
          {
            id: 3,
            ...stat,
          },
        ],
      },
    };
  }
}

module.exports = CourtController;
