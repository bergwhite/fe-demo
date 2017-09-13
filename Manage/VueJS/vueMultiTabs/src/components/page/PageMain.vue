<template>
  <div>
    <p>[main] content is from @/components/page/PageMain.vue</p>
    <div>
      <a @click.prevent="goToTab">Go To Tab1</a>
    </div>
    <div>
      <a @click.prevent="goToTabNew">Create Tab4</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'Main'
    }
  },
  methods: {
    goToTab() {
      this.$emit('goToTabHandle', {
        type: 1,
        name: '标签一',
        page: 'PageTab1'
      })
    },
    goToTabNew() {
      this.$emit('goToTabHandle', {
        type: 0,
        name: '标签四',
        page: 'PageTab4'
      })
    }
  }
}
</script>

<style scoped>
</style>
