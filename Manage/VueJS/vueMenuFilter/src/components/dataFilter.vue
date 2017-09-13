<template>
  <div class="data-filter">
    <div>
      <!-- search box -->
      <input class="list-filter" v-model="searchText" placeholder="search">
      <!-- render tag list -->
      <ul v-for="list in lists">
        <!-- if searchText is contained by list.child.join('') -->
        <!-- render the tag -->
        <li v-if="list.child.join('').toLowerCase().indexOf(searchText.toLowerCase()) !== -1" class="list">
          <ul>
            <!-- render the tag name -->
            <li class="list-parent">
              {{list.parent}}
            </li>
            <!-- if searchText is contained by the current child -->
            <!-- render the tag child list -->
            <li class="list-child" v-for="child in list.child" v-if="child.toLowerCase().indexOf(searchText.toLowerCase()) !== -1">
              {{child}}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'data-filter',
  data () {
    return {
      searchText: '',
      lists: [
        {
            parent: 'Tag A',
            child: ['AA1', 'AB2', 'AC1', 'AD1', 'AE1']
        },
        {
            parent: 'Tag B',
            child: ['BA1', 'BB2', 'BC1', 'BD1', 'BE1']
        },
        {
            parent: 'Tag C',
            child: ['CA1', 'CB2', 'CC1', 'CD1', 'CE1']
        },
        {
            parent: 'Tag D',
            child: ['DA1', 'DB2', 'DC1', 'DD1', 'DE1']
        }
      ],
      changeTextStyle: {
        cursor: 'pointer'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* CSS RESET */
ul,li {
  margin: 0;
  padding: 0;
}
li {
  list-style-type: none;
}

.list-filter {
  padding: 10px 20px;
  margin:20px 10px;
  width: 90%;
}

/* ALL LIST STYLE */
.list-parent {
  background-color: #03a9f4;
  color: white;
  padding: 5px 10px;
}
.list-child {
  padding: 5px 10px;
}
</style>
