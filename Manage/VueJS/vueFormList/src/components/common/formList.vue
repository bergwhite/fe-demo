<template>
  <div class="formList">
    <table class="table table-bordered table-hover">
      <thead>
          <tr>
            <td v-for="headName in formListHead">{{headName}}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dataList in mockData">
          <td>{{dataList.bookTitle}}</td>
          <td>{{dataList.bookAuthor}}</td>
          <td>{{dataList.bookTrans}}</td>
          <td>{{dataList.bookPublish}}</td>
          <td>{{dataList.bookYear}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'formList',
  props: ['mockData', 'formListHead']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
