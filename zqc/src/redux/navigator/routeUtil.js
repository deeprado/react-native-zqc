export function navToBootstrap(navigation, {isReset = false} = {}) {
  navigation.navigate('Bootstrap', {isReset});
}

export function navToTab(navigation) {
  navigation.navigate('Tab');
}

export function navToAlbum(navigation, {files, currentIndex = 0}) {
  navigation.navigate('Album', {files, currentIndex});
}

export function navToPlayer(navigation, {file, autoPlay}) {
  navigation.navigate('Player', {file, autoPlay});
}
