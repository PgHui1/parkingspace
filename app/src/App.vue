<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
  
  *{
    margin: 0;
    padding: 0;
  }

  body{
    
    height: 100vh;
    width: 100vw;
    min-width: 1669px;
    min-height: 961px;
  }

  #app{
    width: 100%;
    height: 100%;
  }
</style>
