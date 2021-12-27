<template>
  <section class="app-home">
    <section class="nav-bar flex">
      <router-link
        to="/board/61b4f22940d3ae57a98db0c5"
        class="clean-list route-btn"
      >
        <div>get Start</div>
      </router-link>
      <router-link to="/login" class="clean-list route-btn">
        <div>Login \ Signup</div>
      </router-link>
    </section>
    <section class="img-slogan flex space-between align-center">
      <div>
        <img class="" src="../assets/images/task.jpg" />
      </div>
      <div class=" flex direction-column align-center">
        <h2 class="logo"><span>S</span>unday</h2>
        <h2>All the tasks in one place</h2>
        <p>Get your team aligned with everyday's tasks</p>
        <p>super customisable and can be used for every use case</p>
      </div>
      <!-- <img src="../assets/images/monday_logo_icon.png" alt="" /> -->
      
    </section>
  </section>
</template>

<script>
export default {
  name: "home",
  components: {},
};
</script>
