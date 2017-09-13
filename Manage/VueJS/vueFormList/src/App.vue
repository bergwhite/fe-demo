<template>
  <div id="app">
    <dataForm></dataForm>
  </div>
</template>

<script>
import dataForm from './components/dataForm'

export default {
  name: 'app',
  components: {
    dataForm
  },
  mounted() {
    console.log('JQ Works: ' + (this.$(1)[0] === 1))
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
