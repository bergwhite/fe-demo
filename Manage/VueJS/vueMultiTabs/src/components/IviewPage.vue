<template>
  <div>
      <div class="left">
        <ul @click="turnOnTab">
          <li class="left-tab" v-for="item in tabList" :data-page="item.page" @click="turnOffTab">{{ item.name }}</li>
        </ul>
      </div>
      <div class="right">
          <Tabs type="card" closable @on-tab-remove="handleTabRemove"  @click="turnOffTab">
            <Tab-pane label="首页" :closable="false">
              <PageMain></PageMain>
            </Tab-pane>
            <Tab-pane v-for="item in tabList" :label="item.name" v-if="item.stat" :key="item.index">
              <component v-bind:is="item.page" @goToTabHandle="goToTabHandle"></component>
            </Tab-pane>
          </Tabs>
      </div>
  </div>
</template>

<script>
import PageMain from '@/components/page/PageMain.vue'
import PageTab1 from '@/components/page/PageTab1.vue'
import PageTab2 from '@/components/page/PageTab2.vue'
import PageTab3 from '@/components/page/PageTab3.vue'
export default {
  name: 'IviewPage',
  data () {
    return {
      tab0: true,
      tab1: true,
      tab2: true,
      tabList: [{
        name: '标签一',
        page: 'PageTab1',
        stat: true
      },
      {
        name: '标签二',
        page: 'PageTab2',
        stat: true
      },
      {
        name: '标签三',
        page: 'PageTab3',
        stat: false
      }]
    }
  },
  components: {
    PageMain,
    PageTab1,
    PageTab2,
    PageTab3
  },
  methods: {
    // 判断当前标签是否已添加
    // -1 不存在
    // index 所在下标
    tabIndex (arr, t) {
      return arr.findIndex(function(v,i){
        return v.name === t
      })
    },
    handleTabRemove (name) {
      console.log(name)
      this.tabList[name-1].stat = false
    },
    turnOnTab (e) {
      if (e.target.tagName.toLowerCase() === 'li') {
        const text = e.target.innerText
        const index = this.tabIndex(this.tabList, text)
        const stat = this.tabList[index].stat
        this.TabShow = {
          stat: stat,
          index: index
        }
        // console.log(this.tabList[index].stat)
        // console.log(index)
      }
    },
    turnOffTab (e) {
      console.log(e)
      console.log(console.log(e.target.innerText))
      if (e.target.tagName.toLowerCase() === 'div') {
        console.log(e.target.innerText)
        // const text = e.target.innerText
        // const index = this.tabIndex(this.tabList, text)
        // const stat = this.tabList[index].stat
        // this.TabShow = {
        //   stat: stat,
        //   index: index
        // }
        // console.log(this.tabList[index].stat)
        // console.log(index)
      }
    }
  },
  computed: {
    TabShow: {
      get: function () {
        return ''
      },
      set: function (v) {
        const {stat, index} = v
        console.log(stat)
        stat ? '' : this.tabList[index].stat = true
      }
    }
  }
}
</script>