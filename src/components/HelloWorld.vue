<template>
  <ul>
    <li v-for ="(item, key) in data">{{item.id}}</li>
  </ul>
</template>

<script>
import mockdata from '../mock/mock';
export default {
  name: 'helloword',
  date() {
    return {
      date: []
    }
  },
  methods: function () {
    this.$axios.get('/api/data').then(res => {
      this.date = mockdata;
      console.log(res)
    })
  } 
}
</script>
