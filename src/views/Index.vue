<template>
  <div class="index">
    <HeadNav/>
    <LeftMenu/>
    <div class="rightContainer"><router-view/></div>
  </div>
</template>

<script>
import HeadNav from 'components/HeadNav'
import LeftMenu from 'components/LeftMenu'
export default {
  name: "index",
  components:{
    HeadNav,
    LeftMenu
  }
};
</script>

<style scoped>
.index{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer{
  position: absolute;
  top: 71px;
  bottom: 0;
  right: 0;
  left: 180px;
}
</style>