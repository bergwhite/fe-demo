<template>
  <div>
    <div class="left">
      <ul @click="addTabToRight">
        <li :class="{'left-tab': true, 'left-tab-active': item.active}" v-for="item in leftTabList" :data-page="item.page">{{ item.name }}</li>
      </ul>
    </div>
    <div class="right">
      <ul :class="{'right-tab-wrap': true,'right-tab-wrap-show': getUlCurrentState}" @click="rightTabRender">
        <li :class="{'right-tab': true, 'right-tab-active': mainPageActive}" data-page="PageMain">首页</li>
        <li v-for="item in rightTabList" :class="{ 'right-tab': true, 'right-tab-close': true, 'right-tab-active': item.active }" :data-page="item.page">
          {{ item.name }}<i class="ico-close" @click="rightTabDel(item.name)">&#xd7;</i>
        </li>
        <li>
          <i class="right-tab-more" @click="changeUlVisible">{{getUlCurrent}}</i>
        </li>
      </ul>
      <div class="right-content">
        <transition name="fade" mode="out-in" appear>
          <component v-bind:is="tabView" @goToTabHandle="goToTabHandle"></component>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>

import PageMain from '@/components/page/PageMain.vue'
import PageTab1 from '@/components/page/PageTab1.vue'
import PageTab2 from '@/components/page/PageTab2.vue'
import PageTab3 from '@/components/page/PageTab3.vue'
import PageTab4 from '@/components/page/PageTab4.vue'

export default {
  name: 'NativePage',
  data () {
    return {
      ulVisibleVal: {
        current: '▲',
        default: '▲',
        more: '▼',
        state: false
      },
      tabView: 'PageMain',
      tabViewOld: '',
      tabViewActiveOld: {
        left: -1,
        right: -1
      },
      mainPageActiveVal: true,
      leftTabList: [{
        name: '标签一',
        page: 'PageTab1',
        active: false
      },
      {
        name: '标签二',
        page: 'PageTab2',
        active: false
      },
      {
        name: '标签三',
        page: 'PageTab3',
        active: false
      }],
      rightTabList: []
    }
  },
  components: {
    PageMain,
    PageTab1,
    PageTab2,
    PageTab3,
    PageTab4
  },
  methods: {
    changeUlVisible () {
      this.ulVisibleVal.current === this.ulVisibleVal.default ? this.getUlCurrent = this.ulVisibleVal.more : this.getUlCurrent = this.ulVisibleVal.default
      this.ulVisibleVal.state = this.ulVisibleVal.state === true ? false : true
    },
    addTabToRight (e) {
      // 使用事件代理添加事件
      if (e.target.tagName.toLowerCase() === 'li' ) {
        // 清除首页高亮
        this.mainPageActive = false
        // 所点击标签的文本
        const currentText = e.target.innerText
        // 所点击标签的页面标记
        const currentPage = e.target.getAttribute('data-page')
        // 切换组件
        const index = this.tabIndex(this.rightTabList, currentText)
        const indexLeft = this.tabIndex(this.leftTabList, currentText)
        const oldActiveRight = this.tabViewActiveOld.right
        const oldActiveLeft = this.tabViewActiveOld.left
        this.changeComponent = currentPage
        // 当前标签未添加则添加进去
        if ( index === -1) {
          this.rightTabList.push({
            name: e.target.innerText,
            page: currentPage,
            active: true
          })
        }
        // 左边高亮
        if (oldActiveLeft === -1) {
          this.leftTabList[indexLeft].active = true
        }
        else {
          this.leftTabList[oldActiveLeft].active = false
          this.leftTabList[indexLeft].active = true
        }
        this.changeActiveOld = {
          type: 'left',
          val: indexLeft
        }
        // console.log(index)
        // 右边高亮
        console.log('oldActiveRight / ' + oldActiveRight)
        const indexNow = this.tabIndex(this.rightTabList, currentText)
        console.log('zzzzz / ' + indexNow)
        if(index === -1) {
          const len = this.rightTabList.length
          if (len === 1) {
            this.rightTabList[0].active = true
            this.changeActiveOld = {
              type: 'right',
              val: 0
            }
          }
          else {
            this.rightTabList[oldActiveRight].active = false
            this.rightTabList[indexNow].active = true
            this.changeActiveOld = {
              type: 'right',
              val: indexNow
            }
          }
        }
        else {
          this.rightTabList[oldActiveRight].active = false
          this.rightTabList[index].active = true
          this.changeActiveOld = {
            type: 'right',
            val: index
          }
        }
      }
    },
    // 判断当前标签是否已添加
    // -1 不存在
    // index 所在下标
    tabIndex (arr, t) {
      return arr.findIndex(function(v,i){
        return v.name === t
      })
    },
    rightTabDel (v) {
      this.mainPageActive =  false
      console.log(v)
      const index = this.tabIndex(this.rightTabList, v)
      const len = this.rightTabList.length
      const isEnd = len === 1 ? true : false
      const nextPage = index !== (len - 1 ) ? (index === 0 ? 0 : index) : index - 1
      console.log('rightTabDel / nextPage / ' + nextPage)
      const indexLeft = this.tabIndex(this.leftTabList, v)
      let oldActiveLeft = this.tabViewActiveOld.left
      let oldActiveRight = this.tabViewActiveOld.right
      let indexLeftNext
      if (!isEnd) {
        // if (typeof this.rightTabList[index] !== 'undefined') {
        //   oldActiveRight = this.tabViewActiveOld.right
        //   this.rightTabList[index].active = false
        // }
        // console.log(66666)
        if (typeof this.leftTabList[oldActiveLeft] !== 'undefined') {
          this.leftTabList[oldActiveLeft].active = false
        }
        // right
        // 清除首页高亮
        this.mainPageActive = false
        if(index === 0) {
          if (typeof this.leftTabList[oldActiveLeft] !== 'undefined') {
            this.leftTabList[oldActiveLeft].active = false
          }
          if (typeof this.rightTabList[oldActiveLeft] !== 'undefined') {
            this.rightTabList[oldActiveRight].active = false
            this.rightTabList[0].active = true
          }
        }
        // 清除关闭的元素
        this.rightTabList.splice(index, 1)
        if (index === nextPage) {
          console.log('oldActiveRight ' + oldActiveRight)
          console.log('this.tabViewActiveOld.right ' + this.tabViewActiveOld.right)
          oldActiveRight = this.tabViewActiveOld.right
          console.log(66666666)
          console.log(index)
          console.log(this.rightTabList)
          if (index!==0) {
            this.rightTabList[oldActiveRight-1].active = false
          }
          else {
            this.rightTabList[0].active = true
          }
          console.log('0000000000000000000000000000000000000000000')
        }
        else {
          console.log(877777)
          console.log(index)
          console.log(nextPage)
          if (typeof this.rightTabList[index] !== 'undefined') {
            this.rightTabList[index].active = false
          }
          this.rightTabList[nextPage].active = true
        }
        this.changeActiveOld = {
          type: 'right',
          val: nextPage
        }
        if (typeof this.rightTabList[oldActiveRight] !== 'undefined') {
          this.rightTabList[oldActiveRight].active = false
        }
        // left
        this.changeComponent = this.rightTabList[nextPage].page
        indexLeftNext = this.tabIndex(this.leftTabList, this.rightTabList[nextPage].name)
        oldActiveLeft = this.tabViewActiveOld.left
        oldActiveRight = this.tabViewActiveOld.right
        if (indexLeft!==-1) {
          if (oldActiveLeft!==-1) {
            this.leftTabList[oldActiveLeft].active = false
          }
          this.changeActiveOld = {
            type: 'left',
            val: indexLeftNext
          }
          this.leftTabList[indexLeft].active = false
          if (indexLeftNext!==-1) {
            indexLeftNext = this.tabIndex(this.leftTabList, this.rightTabList[nextPage].name)
            this.leftTabList[indexLeftNext].active = true
            console.log('next: ' + indexLeftNext)
          }
          console.log('curr: ' + indexLeft)
        }
        else {
          if (oldActiveLeft!==-1) {
            this.leftTabList[oldActiveLeft].active = false
          }
          if ((oldActiveRight-1)!==-1) {
            this.rightTabList[oldActiveRight-1].active = false
          }
          if (indexLeftNext!==-1) {
            this.leftTabList[indexLeftNext].active = true
            this.changeActiveOld = {
              type: 'left',
              val: indexLeftNext
            }
          }
          else {
            this.changeActiveOld = {
              type: 'left',
              val: -1
            }
          }
        }
      }
      else {
        // right
        if (typeof this.rightTabList[index] !== 'undefined') {
          oldActiveRight = this.tabViewActiveOld.right
          this.rightTabList[index].active = false
        }
        this.mainPageActive = true
        this.changeActiveOld = {
          type: 'right',
          val: 0
        }
        this.rightTabList[oldActiveRight].active = false
        // left
        this.changeComponent = 'PageMain'
        // indexLeftNext = 1
        if (indexLeft!==-1) {
          this.leftTabList[indexLeft].active = false
        }
        this.changeActiveOld = {
          type: 'left',
          val: 0
        }
        this.rightTabList.splice(index, 1)
      }
      if (index === nextPage) {
        this.rightTabList[nextPage].active = true
      }
      oldActiveLeft = this.tabViewActiveOld.left
      if (typeof this.leftTabList[oldActiveLeft] !== 'undefined') {
        this.leftTabList[oldActiveLeft].active = false
      }
      if (typeof this.leftTabList[indexLeftNext] !== 'undefined') {
        this.leftTabList[indexLeftNext].active = true
      }
    },
    rightTabRender (e) {
      if (e.target.tagName.toLowerCase() === 'li' ) {
        // 清除首页高亮
        this.mainPageActive = false
        let oldActiveRight = this.tabViewActiveOld.right
        const oldActiveLeft = this.tabViewActiveOld.left
        // 所点击标签的页面标记
        const currentPage = e.target.getAttribute('data-page')
        // 切换组件
        this.changeComponent = currentPage
        const innerText = e.target.childNodes[0].nodeValue.replace(/\s/g, '')
        // 首页特殊处理
        if (innerText === '首页') {
          if (oldActiveRight!==-1) {
            this.rightTabList[oldActiveRight].active = false
          }
          if (oldActiveLeft!==-1) {
            this.leftTabList[oldActiveLeft].active = false
          }
          this.mainPageActive = true
        }
        else {
          // 切换高亮
          const index = this.tabIndex(this.rightTabList, innerText)
          const indexLeft = this.tabIndex(this.leftTabList, innerText)
          console.log('rightTabRender / index /  ' + index)
          this.rightTabList[oldActiveRight].active = false
          this.rightTabList[index].active = true
          this.changeActiveOld = {
            type: 'right',
            val: index
          }
          this.leftTabList[oldActiveLeft].active = false
          if (indexLeft!==-1) {
            this.leftTabList[indexLeft].active = true
            this.changeActiveOld = {
              type: 'left',
              val: indexLeft
            }
          }
        }
      }
    },
    goToTabHandle(e) {
      const {type, name, page} = e
      let indexLeft = this.tabIndex(this.leftTabList, name)
      let indexRight = this.tabIndex(this.rightTabList, name)
      const oldActiveRight = this.tabViewActiveOld.right
      const oldActiveLeft = this.tabViewActiveOld.left
      if (indexRight===-1) {
        this.rightTabList.push({
          name: name,
          page: page,
          active: true
        })
        indexRight = this.tabIndex(this.rightTabList, name)
      }
      // type=1 切换标签
      // type=0 创建标签
      if (type===0) {
        this.mainPageActive = false
        const tabExist = this.tabIndex(this.leftTabList, name)
        if (tabExist===-1) {
          // this.leftTabList.push({
          //   name: name,
          //   page: page,
          //   active: true
          // })
          // indexLeft = this.tabIndex(this.leftTabList, name)
        }
      } else {
        // 清除首页高亮
        this.mainPageActive = false
        // 左侧高亮
        if (oldActiveLeft!==-1) {
          this.leftTabList[oldActiveLeft].active = false
        }
        this.leftTabList[indexLeft].active = true
        this.changeActiveOld = {
          type: 'left',
          val: indexLeft
        }
      }
      
      // 右侧高亮
      if (oldActiveLeft!==-1) {
        this.rightTabList[oldActiveRight].active = false
      }
      this.rightTabList[indexRight].active = true
      this.changeActiveOld = {
        type: 'right',
        val: indexRight
      }
      // 组件切换
      this.changeComponent = page
    }
  },
  computed: {
    getUlCurrent: {
      get: function () {
        return this.ulVisibleVal.current
      },
      set: function (v) {
        this.ulVisibleVal.current = v
      }
    },
    getUlCurrentState: {
      get: function () {
        return this.ulVisibleVal.state
      },
      set: function (v) {
        this.ulVisibleVal.state = v
      }
    },
    // 切换组件
    changeComponent: {
      get: function () {
        return this.tabView
      },
      set: function (v) {
        this.tabViewOld = this.tabView
        this.tabView = v
      }
    },
    changeActiveOld: {
      get: function () {
        return -1
      },
      set: function (v) {
        const {type, val} = v
        this.tabViewActiveOld[type] = val
      }
    },
    mainPageActive: {
      get: function () {
        return this.mainPageActiveVal
      },
      set: function (v) {
        this.mainPageActiveVal = v
      }
    }
  }
}
</script>

<style>

/* CSS Reset */

ul,li {
  margin: 0;
  padding: 0;
}
li {
  list-style-type: none;
}
a {
  text-decoration: none;
}

/* left */

.left {
  width: 100px;
  float: left;
}

.left-tab {
  height: 50px;
  line-height: 50px;
  text-align: center;
  padding-left: 5px;
}
.left-tab:hover,.left-tab-active {
  cursor: pointer;
  border-left: 5px solid #2196f3;
}
.right-tab:hover,.right-tab-active {
  cursor: pointer;
  color: white;
  background-color: #2196f3;
}

/* 连接填充li */

.left-tab > a {
  display: block;
  width: 100%;
  height: 100%;
}

.right-tab-wrap {
  height: 38px;
  overflow: hidden;
  position: relative;
}
.right-tab-wrap-show {
  overflow: visible;
  height: 76px;
}
.right-tab-more {
  position: absolute;
  top: 0;
  right: 5px;
  line-height: 38px;
  width: 20px;
}
.right-tab {
  float: left;
  padding: 10px 20px;
}
.right-tab-close {
  position: relative;
}
.ico-close {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 16px;
  height: 16px;
  line-height: 16px;
  font-size: 16px;
  text-align: center;
  background-color: white;
  border-radius: 50%;
  color: black;
  display: none;
}
.right-tab-close:hover > .ico-close {
  display: block;
}

/* right */

.right {
  overflow: hidden;
  margin-left: 110px;
}

.right-content {
  padding: 20px;
}
</style>
