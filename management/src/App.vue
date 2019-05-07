<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style scoped>
  #app{
    width: 100%;
    height: 100%;
  }
  .app-main{
    overflow: auto;
  }
</style>
