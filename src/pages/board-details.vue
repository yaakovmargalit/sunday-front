<template>
  <section class="board-details" v-if="currBoard">
    <router-view></router-view>
    <board-details-header @changeMode="changeMode" />
    <transition name="fade">
      <group-list
        v-if="tableMode"
        @click="drawer = true"
        :groups="currBoard.groups"
        :cmpsOrder="cmpsOrder"
      />
    </transition>
    <transition name="fade">
      <div v-if="!tableMode">

        <trello-list
          :byStatus="byStatus"
          class="trello-list"
          :groups="currBoard.groups"
        ></trello-list>
      </div>
    </transition>
  </section>
  <div class="loader-img" v-else>
    <img src="../assets/images/newLogo-gif.gif" alt="" />
  </div>
  <!-- </transition> -->
</template>

<script>
import boardFilter from "@/cmps/board-filter";
import trelloList from "@/cmps/trello-list";
import groupList from "@/cmps/group-list";
import boardDetailsHeader from "@/cmps/board-details-header";
import { socketService } from "../services/socket.service.js";
import userService from "../services/user/user.service";
import { utilService } from "../services/util.service.js";
export default {
  components: {
    groupList,
    boardDetailsHeader,
    boardFilter,
    trelloList,
  },
  data() {
    return {
      byStatus: true,
      activeName: "sunday",
      tableMode: true,
    };
  },
  async created() {
    await this.$store.dispatch({ type: "loadUser" });
    await this.loadBoard();
    // socketService.emit('open board', board)
    socketService.on("board updateBoard", this.updateBoard);
    if (this.$route.query.username) {
      if (this.loggedinUser.username === this.$route.query.username) return;
      await this.$store.dispatch({ type: "logout" });

      await this.$store.dispatch({
        type: "signup",
        userCred: {
          username: this.$route.query.username,
          password: "1234",
          email: this.$route.query.username + "@gmail.com",
        },
      });
      var newMember = {
        _id: utilService.makeId(),
        fullname: this.$route.query.username,
        imgUrl: "https://image.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg",
      };
      console.log(this.currBoard);
      var copyBoard = JSON.parse(JSON.stringify(this.currBoard));
      copyBoard.members.push(newMember);
      await this.$store.dispatch({
        type: "updateMembers",
        copyMembers: copyBoard.members,
      });
    }
    this.$store.dispatch({ type: "loadUser" });
    this.filterBy = this.$store.getters.currFilterBy;

    // socketService.emit("board newUpdateBoard", copyBoard);
  },
  destroyed() {
    socketService.off("board updateBoard", this.updateBoard);
    // socketService.terminate();
  },
  methods: {
    changeMode() {
      this.tableMode = !this.tableMode;
    },
    addGroup() {
      this.$store.dispatch({ type: "addGroup" });
    },
    loadBoard() {
      const boardId = this.$route.params.boardId;
      this.$store.dispatch({ type: "getBoard", boardId });
    },
    updateBoard(board) {
      this.$store.commit({ type: "loadBoard", board });
    },
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    currBoard() {
      return this.$store.getters.currBoard;
    },
    cmpsOrder() {
      return this.$store.getters.cmpsOrder;
    },
  },
  watch: {
    "$route.params.boardId"() {
      this.loadBoard();
    },
  },
};
</script>

<style>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
