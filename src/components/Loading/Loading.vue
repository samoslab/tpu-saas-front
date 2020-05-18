<template>
  <div class="l-loading">
     <div><van-loading type="spinner" color="white" /></div>
  </div>
</template>

<script>
export default {
   name: 'pageLoading',
   data() {
       return {}
   },
}
</script>

<style scoped>
.l-loading{
  background: #000;
  opacity: 0.3;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2002;
  display: table;
}
.l-loading>div{
   display: table-cell; 
   vertical-align: middle;
   text-align: center;
}
.l-loading>div>div{
   margin-left: 50%;
   padding-right: 15px;
}
</style>
