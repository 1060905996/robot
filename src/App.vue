<template>
  <div id="app">
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
    margin: 0;
    padding: 0;
    padding-top: 0.1px;
    cursor: default;
}

div,
span {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}

body,
html,
#app {
    height: 100%;
    min-height: 670px;
    min-width: 1024px;
}
</style>