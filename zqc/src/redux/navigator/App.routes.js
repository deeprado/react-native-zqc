import React from 'react';
import {createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {Icon} from 'react-native-elements';

// 引导页面
import WelcomePage from '../../pages/WelcomePage';

import Login from '../../pages/account/Login';
import Panel from '../../pages/account/Panel';
import ResetPassword from '../../pages/account/ResetPassword';
import RegisterMobile from '../../pages/account/RegisterMobile';
import RegisterVerify from '../../pages/account/RegisterVerify';
import RegisterProfile from '../../pages/account/RegisterProfile';
import EditProfileGender from '../../pages/profile/EditProfileGender';
import EditProfile from '../../pages/profile/EditProfile';
import EditProfileNickname from '../../pages/profile/EditProfileNickname';
import EditProfileAvatar from '../../pages/profile/EditProfileAvatar';
import EditProfileEmail from '../../pages/profile/EditProfileEmail';
import EditProfileIntro from '../../pages/profile/EditProfileIntro';
import EditProfileBackground from '../../pages/profile/EditProfileBackground';

// 附近
import Nearby from '../../pages/Nearby';

// 球场
import AtCourt from '../../pages/AtCourt';
import Album from '../../pages/court/Album';
import Player from '../../pages/court/Player';

// 我的
import Mine from '../../pages/Mine';
import About from '../../pages/mine/About';
import Settings from '../../pages/setting/Settings';
import SelectRate from '../../pages/setting/SelectRate';
import SelectCityAndSport from '../../pages/account/SelectCityAndSport';

import {COLOR} from '../../config';

const switchNavigationOptions = {
  gesturesEnabled: false,
};

const commonNavigationOptions = {
  tabBarVisible: false,
  headerShown: true,
};

const bottomTabOptions = (tabBarTitle, {iconName, typeName}, navTitle) => {
  const tabBarLabel = tabBarTitle;
  const tabBarIcon = ({tintColor, focused}) => {
    return <Icon name={iconName} type={typeName} size={25} color={tintColor} />;
  };

  const headerTintColor = COLOR.textLightNormal;
  const headerTitle = navTitle;
  const headerTitleStyle = {
    fontSize: 22,
    color: 'white',
    alignSelf: 'center',
    backgroundColor: COLOR.theme,
  };
  // header的style
  const headerStyle = {backgroundColor: '#4ECBFC'};
  const tabBarVisible = true;
  // const headerShown = true;
  return {
    // headerShown,
    tabBarLabel,
    tabBarIcon,
    tabBarVisible,
    headerTitle,
    headerTitleStyle,
    headerStyle,
    headerTintColor,
  };
};

const AppTabNavigator = createBottomTabNavigator(
  {
    Nearby: {
      screen: Nearby,
      navigationOptions: () =>
        bottomTabOptions('附近', {
          iconName: 'social-github',
          typeName: 'foundation',
        }),
    },
    AtCourt: {
      screen: AtCourt,
      navigationOptions: () =>
        bottomTabOptions('球场', {
          iconName: 'graph-bar',
          typeName: 'foundation',
        }),
    },
    Mine: {
      screen: Mine,
      navigationOptions: () =>
        bottomTabOptions('我的', {iconName: 'torso', typeName: 'foundation'}),
    },
  },
  {
    initialRouteName: 'Nearby',
    // headerMode: 'none',
    tabBarOptions: {
      activeTintColor: '#FF9744',
      inactiveTintColor: 'gray',
    },
    // headerShown: false,
  },
);

let accountStack = createStackNavigator(
  {
    // 登录
    Login: {
      screen: Login,
      navigationOptions: commonNavigationOptions,
    },
    // 预登录
    Panel: {
      screen: Panel,
      navigationOptions: {
        ...commonNavigationOptions,
        headerShown: false,
      },
    },
    // 注册信息
    RegisterProfile: {
      screen: RegisterProfile,
      navigationOptions: commonNavigationOptions,
    },
    // 注册手机号
    RegisterMobile: {
      screen: RegisterMobile,
      navigationOptions: commonNavigationOptions,
    },
    // 注册验证
    RegisterVerify: {
      screen: RegisterVerify,
      navigationOptions: commonNavigationOptions,
    },
    // 重置密码
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: commonNavigationOptions,
    },
    // 账号相关
    EditProfileGender: {
      screen: EditProfileGender,
      navigationOptions: commonNavigationOptions,
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: commonNavigationOptions,
    },
    EditProfileNickname: {
      screen: EditProfileNickname,
      navigationOptions: commonNavigationOptions,
    },
    EditProfileAvatar: {
      screen: EditProfileAvatar,
      navigationOptions: commonNavigationOptions,
    },
    EditProfileEmail: {
      screen: EditProfileEmail,
      navigationOptions: commonNavigationOptions,
    },
    EditProfileIntro: {
      screen: EditProfileIntro,
      navigationOptions: commonNavigationOptions,
    },
    EditProfileBackground: {
      screen: EditProfileBackground,
      navigationOptions: commonNavigationOptions,
    },
  },
  {
    initialRouteName: 'Panel',
  },
);

let AppAllStack = createStackNavigator(
  {
    TabNavigator: {
      screen: AppTabNavigator,
      navigationOptions: {
        ...commonNavigationOptions,
        headerShown: false,
      },
    },
    // 相册
    Album: {
      screen: Album,
      navigationOptions: commonNavigationOptions,
    },
    // 运动员
    Player: {
      screen: Player,
      navigationOptions: commonNavigationOptions,
    },
    // 选择城市和运动
    SelectCityAndSport: {
      screen: SelectCityAndSport,
      navigationOptions: commonNavigationOptions,
    },
    // 设置
    Settings: {
      screen: Settings,
      navigationOptions: commonNavigationOptions,
    },
    // 评分
    SelectRate: {
      screen: SelectRate,
      navigationOptions: commonNavigationOptions,
    },
    // 关于
    About: {
      screen: About,
      navigationOptions: commonNavigationOptions,
    },
  },
  {
    initialRouteName: 'TabNavigator',
    navigationOptions: {
      headerShown: false,
    },
  },
);

const SplashStack = createSwitchNavigator(
  {
    SplashPage: {
      screen: WelcomePage,
      navigationOptions: {
        ...switchNavigationOptions,
        headerShown: false,
      },
    },
    AccountPage: {
      screen: accountStack,
      navigationOptions: switchNavigationOptions,
    },
    AppPage: {
      screen: AppAllStack,
      navigationOptions: switchNavigationOptions,
    },
  },
  {
    initialRouteName: 'SplashPage',
  },
);

// const prefix = 'zqc://';

export default SplashStack;
// export default AppNavigator;
