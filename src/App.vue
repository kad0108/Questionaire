<template>
  <div id="app">
    <navi></navi>
    <div class="container">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navi from './components/Nav'
export default {
  name: 'app',
  components: {
    Navi
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  font-family: "Microsoft YaHei";
  box-sizing: border-box;
}
body{
  overflow-y: scroll;
  min-width: 700px;
  background-color: #ddd;
}
.container{
  width: 83%;
  margin: 6.5rem auto;
  padding: 2rem 0;
  border-radius: .2rem;
  box-shadow: 0 .05em .25em rgba(0,0,0,.5);
  background-color: #fff;
  text-align: center;
}
</style>
