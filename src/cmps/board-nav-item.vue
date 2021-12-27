<template>
  <router-link v-if="currBoardId" :to="'/board/' + navItem.boardId">
    <section :class="btnStyle" class="board-nav-item">
      <div class="flex board-nav-item-title">
        <i class="el-icon-s-fold"></i>
        <h4 class="">{{ navItem.boardTitle }}</h4>
      </div>

      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-more more"></i>
        </span>
        <el-dropdown-menu class="board-menu" slot="dropdown">
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item disabled>Action 4</el-dropdown-item>
          <el-dropdown-item divided :command="{ removeBoard }">
            <button @click="removeBoard" class="drop-down-btn">
              <i class="el-icon-delete"></i> Delete
            </button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </section>
  </router-link>
</template>

<script>
export default {
  props: {
    navItem: Object,
    isCurr: String,
  },
  data() {
    return {
      currBoardId: this.$route.params.boardId,
    };
  },
  methods: {
    removeBoard() {
      this.$store.dispatch({
        type: "removeBoard",
        boardId: this.navItem.boardId,
      });
    },

  },
  computed: {
    btnStyle() {
      return {
        "curr-btn":this.currBoardId === this.navItem.boardId
      };
    },
  },
  watch: {
    $route(to, from) {
      this.currBoardId= this.$route.params.boardId
    },
  },
};
</script>

<style></style>
