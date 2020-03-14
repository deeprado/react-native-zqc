'use strict';

const Controller = require('egg').Controller;


const tmpPost = {
  id: 1,
  courtId: 20,
  status: 1,
  creatorId: 20,
  creator: {
    gender: 'm',
    name: 'deeprado',
    nickname: 'deeprado',
    avatarType: 'builtin',
    avatarName: 'american-football-player',
    avatarImage: null,
    avatarFile: null,
  },
  createTime: '2019-02-01',
  court: {
    name: '亚特兰大',
    location: {
      longitude: 126.551898,
      altitude: 45.828823,
    },
  },
  text: 'asdfasfasd',
  imageIds: [
    1,
    2,
    3,
    4,
  ],
  stat: {
    liked: 23,
    commented: 23,
  },
  imageFiles: [
    {
      id: 1,
      creatorId: 20,
      mime: 'video/mp4',
      url: 'http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4',
      liked: 23,
      commented: 23,
      height: 416,
      width: 1000,
      status: 1,
    },
    {
      id: 2,
      creatorId: 20,
      mime: 'image/png',
      url: 'http://a0.att.hudong.com/78/52/01200000123847134434529793168.jpg',
      liked: 23,
      commented: 23,
      status: 1,
    },
    {
      id: 3,
      creatorId: 20,
      mime: 'image/png',
      url: 'http://a0.att.hudong.com/78/52/01200000123847134434529793168.jpg',
      liked: 23,
      commented: 23,
      status: 1,
    },
    {
      id: 4,
      creatorId: 20,
      mime: 'image/png',
      url: 'http://a0.att.hudong.com/78/52/01200000123847134434529793168.jpg',
      liked: 23,
      commented: 23,
      status: 1,
    },
  ],
};

const posts = [
  tmpPost,
  {
    ...tmpPost,
    id: 2,
  },
  {
    ...tmpPost,
    id: 3,
  },
  {
    ...tmpPost,
    id: 4,
  },
];

class PostController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, user';
  }
  async nearby() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      data: {
        posts,
      },
    };
  }
  async byCity() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      data: {
        posts,
      },
    };
  }
  async info() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      data: {
        post: tmpPost,
      },
    };
  }
  async infos() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      data: {
        posts,
      },
    };
  }
}

module.exports = PostController;
