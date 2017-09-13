<template>
  <div class="pageSplit">
    <nav aria-label="...">
      <ul class="pagination">
        <li :class="pageCurrent === 0 ? 'disabled' : ''" @click="goToPrev">
          <span>
            <span aria-hidden="true">&laquo;</span>
          </span>
        </li>
        <li :class="index === pageCurrent + 1 ? 'active' : ''" v-for="index in pageCount" @click="goToSpec">
          <span>{{index}}<span class="sr-only"></span></span>
        </li>
        <li :class="pageCurrent === pageCount -1 ? 'disabled' : ''" @click="goToNext">
          <span>
            <span aria-hidden="true">&raquo;</span>
          </span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'pageSplit',
  props: ['pageCount', 'pageCurrent'],
  methods: {
    // 传递事件给父组件
    // 上一页
    goToPrev() {
      this.$emit('changePage', {
        type: 'prev'
      })
    },
    // 下一页
    goToNext() {
      this.$emit('changePage', {
        type: 'next'
      })
    },
    // 指定页
    goToSpec(e) {
      // 当前页面的索引
      const indexStr = e.srcElement !== undefined ? e.srcElement.textContent : e.target.textContent
      const index = parseInt(indexStr) - 1
      this.$emit('changePage', {
        type: 'spec',
        index: index
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
