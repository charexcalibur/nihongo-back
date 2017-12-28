<template>
  <div id="app" class="fillcontainer">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
   .fillcontainer {
    height: 100%;
    width: 100%; 
   }
</style>
