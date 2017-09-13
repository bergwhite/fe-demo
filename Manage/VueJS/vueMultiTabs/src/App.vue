<template>
  <div id="app">
    <ul class="type-wrap">
      <li><router-link to="/">原生实现</router-link></li>
      <li><router-link to="/iview">iView 实现</router-link></li>
    </ul>
    <router-view></router-view>  
  </div>
</template>

<script>

export default {
  name: 'app'
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
.type-wrap {
  overflow: hidden;
}
.type-wrap > li {
  padding: 10px 20px;
  float: left;
}
</style>
