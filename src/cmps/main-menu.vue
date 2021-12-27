<template>
<section class="main-menu"> 
  <div class="top-menu">
    <router-link to="/">
        <img class="logo-img" src="../assets/images/newLogo.png" alt="">
      </router-link>
      <i  class="el-icon-menu main-menu-item active"></i>
      <i  class="el-icon-bell main-menu-item"></i>
      <i  class="el-icon-receiving main-menu-item"></i>
      <i  class="el-icon-goods main-menu-item"></i>
  </div>
  <div class="plans">
    <div class="txt">
    <p>See plans</p>
    </div>
  </div>
  <div>
    <i  class="el-icon-suitcase main-menu-item"></i>
      <i  class="el-icon-user main-menu-item"></i>
      <i  class="el-icon-search main-menu-item"></i>
      <i  class="el-icon-setting main-menu-item"></i>
      <router-link :to="'/login'">
      <el-avatar :size="'medium'" :src="circleUrl"></el-avatar>
      </router-link>
  </div>
</section>
</template>

<script>
export default {
data(){
  return{
     circleUrl:this.userImg()
  }
},
  created() {
    this.$store.dispatch({type:'loadUser'})
  },
methods:{
  userImg(){
    return this.$store.getters.loggedinUser.imgUrl 
  }
},
computed:{

}
}
</script>

<style>

</style>