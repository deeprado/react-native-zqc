'use strict';

const Controller = require('egg').Controller;

class FileController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, user';
  }
  async upload() {
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
      data: {
        files: [
          {
            id: 1,
          },
          {
            id: 2,
          },
          {
            id: 3,
          },
          {
            id: 4,
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
          },
          {
            id: 2,
          },
          {
            id: 3,
          },
          {
            id: 4,
          },
        ],
      },
    };
  }
}

module.exports = FileController;
