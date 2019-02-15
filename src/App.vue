<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
h2,h3,h4,h5 {
  padding: 0;
  margin: 0;
}
body,html {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
#app {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #409EFF;
}
</style>
