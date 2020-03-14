/**
 * 在球场
 * zaiqiuchang.com
 */

export const ENV_NAMES = {
  production: '生产',
  testing: '测试',
  development: '开发',
};

export const GENDERS = [
  {
    label: '男',
    value: 'm',
  },
  {
    label: '女',
    value: 'f',
  },
];

export const RES_USER_AVATARS = new Map([
  [
    'american-football-player-1',
    require('./assets/img/avatar/american-football-player-1.png'),
  ],
  [
    'american-football-player',
    require('./assets/img/avatar/american-football-player.png'),
  ],
  ['baseball-player', require('./assets/img/avatar/baseball-player.png')],
  ['basketball-player', require('./assets/img/avatar/basketball-player.png')],
  ['bodybuilder', require('./assets/img/avatar/bodybuilder.png')],
  ['cricket-player', require('./assets/img/avatar/cricket-player.png')],
  ['cyclist-1', require('./assets/img/avatar/cyclist-1.png')],
  ['cyclist', require('./assets/img/avatar/cyclist.png')],
  ['fencer', require('./assets/img/avatar/fencer.png')],
  ['football-player', require('./assets/img/avatar/football-player.png')],
  ['formula-1', require('./assets/img/avatar/formula-1.png')],
  ['golfer', require('./assets/img/avatar/golfer.png')],
  ['gymnast', require('./assets/img/avatar/gymnast.png')],
  ['hockey-player', require('./assets/img/avatar/hockey-player.png')],
  ['horsewoman', require('./assets/img/avatar/horsewoman.png')],
  ['karate', require('./assets/img/avatar/karate.png')],
  ['kickboxer', require('./assets/img/avatar/kickboxer.png')],
  ['kudo', require('./assets/img/avatar/kudo.png')],
  ['motorcyclist', require('./assets/img/avatar/motorcyclist.png')],
  ['pilot', require('./assets/img/avatar/pilot.png')],
  ['rowing', require('./assets/img/avatar/rowing.png')],
  ['shooter', require('./assets/img/avatar/shooter.png')],
  ['skier-1', require('./assets/img/avatar/skier-1.png')],
  ['skier', require('./assets/img/avatar/skier.png')],
  ['sumotori', require('./assets/img/avatar/sumotori.png')],
  ['swimmer', require('./assets/img/avatar/swimmer.png')],
  ['taekwondo', require('./assets/img/avatar/taekwondo.png')],
  ['tennis-player', require('./assets/img/avatar/tennis-player.png')],
  ['volleyball-player', require('./assets/img/avatar/volleyball-player.png')],
  ['weightlifter', require('./assets/img/avatar/weightlifter.png')],
]);

export const RES_USER_BACKGROUNDS = new Map([
  ['light-circle', require('./assets/img/user-background/light-circle.png')],
  ['juhua', require('./assets/img/user-background/juhua.png')],
  ['pugongying', require('./assets/img/user-background/pugongying.png')],
]);

export const HOT_CITIES = [
  {name: '全国', code: ''},
  {name: '北京', code: '010'},
  {name: '上海', code: '021'},
  {name: '成都', code: '028'},
];

export const SPORTS = [
  {name: '网球', code: 'tennis', disabled: false},
  {name: '羽毛球', code: 'badminton', disabled: true},
  {name: '高尔夫', code: 'golf', disabled: true},
];

export const VIDEO_RATES = [
  {label: '流畅', value: 'ld', pixelSize: [640, 360]},
  {label: '高清', value: 'hd', pixelSize: [1280, 720]},
  {label: '1080p', value: 'fhd', pixelSize: [1920, 1080]},
];

export const POST_STATUS_NORMAL = 1;
export const POST_STATUS_DELETED = 2;
