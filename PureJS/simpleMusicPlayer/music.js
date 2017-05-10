var homeDir = 'http://music.gongsikai.cn/'
var musicList = document.getElementsByClassName('music-list')
var musicInfo = document.getElementsByClassName('music-info')

var findSelect,
    findNumber

var reg = /music-selected/

var music = {
  node:function () {
    for (var i = 0;i<musicList.length;i++) {
      findSelect = musicList[i].className
      if (findSelect.match(reg)) {
        return i
      }
    }
  },
  next:function () {
    var nodeNum = this.node()
    if (nodeNum !== musicList.length-1) {
      musicInfo[0].src = musicInfo[0].src.replace(/\d{5}/,10001+nodeNum+1)
      musicList[nodeNum].className = musicList[nodeNum].className.replace('music-selected','')
    }
    else {
      musicInfo[0].src = musicInfo[0].src.replace(/\d{5}/,10001)
      musicList[nodeNum].className = musicList[nodeNum].className.replace('music-selected','')
      nodeNum = -1
    }
    musicList[nodeNum+1].className += ' music-selected'
  },
  prev:function () {
    var nodeNum = this.node()
    if (nodeNum !== 0) {
      musicInfo[0].src = musicInfo[0].src.replace(/\d{5}/,10001+nodeNum-1)
      musicList[nodeNum].className = musicList[nodeNum].className.replace('music-selected','')
    }
    else {
      musicInfo[0].src = musicInfo[0].src.replace(/\d{5}/,10001+musicList.length-1)
      musicList[nodeNum].className = musicList[nodeNum].className.replace('music-selected','')
      nodeNum = musicList.length
    }
    musicList[nodeNum-1].className += ' music-selected'
  },
  pause:function () {
    if (!musicInfo[0].paused) {
      musicInfo[0].pause()
    }
    else {
      musicInfo[0].play()
    }
  },
  replay:function () {
    musicInfo[0].currentTime = 0
  }
}
musicInfo[0].loop = 'false'
//musicInfo[0].addEventListener('ended',music.next())
