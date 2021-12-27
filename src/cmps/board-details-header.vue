<template>
  <section class="board-details-header">
    <section class="flex top">
      <div class="flex title item">
        <h1>{{ boardTitle }}</h1>
        <i class="el-icon-warning-outline"></i>
        <i class="el-icon-star-off"></i>
      </div>
      <div class="flex right">
        <div class="flex avatars item">
          <p class="members-title">Board members</p>
          <el-popover
            v-for="(member, idx) in boardMembers"
            :key="idx"
            placement="top-start"
            width="150"
            trigger="hover"
          >
            <div slot="reference" class="avatar">
              <img :src="member.imgUrl" />
            </div>
            <div class="avater-hover">
              <h5>{{ member.fullname }}</h5>
              <div class="hover-img">
                <img :src="member.imgUrl" />
              </div>
            </div>
          </el-popover>
        </div>

        <div @click="open" class="item flex invite">
          <i class="el-icon-user"></i>
          <p>invite / {{ boardMembers.length }}</p>
        </div>
        <div class="flex activity item">
          <i class="el-icon-finished"></i>
          <p>Activity</p>
        </div>
        <div class="flex add-to-board item">
          <i class="el-icon-plus"></i>
          <p>Add to board</p>
        </div>
      </div>
    </section>
    <section class="about-board">
      <el-input type="textarea" :rows="1" placeholder="Add board description">
      </el-input>
    </section>
    <el-tabs v-model="activeName" @tab-click="changeMode">
      <el-tab-pane label="Main table" name="sunday"></el-tab-pane>
      <el-tab-pane  label="Columns" name="second"></el-tab-pane>
    </el-tabs>
    <section class="bottom flex">
      <div class="add-group-btn" @click="addGroup">Add group</div>
      <board-filter :filterBy="filterBy" :board="board" @filter="filter" />
    </section>
  </section>
</template>

<script>
import boardFilter from "@/cmps/board-filter";
import { httpService } from "../services/http.service";
export default {
  components: {
    boardFilter,
  },
  data() {
    return {
      boardTitle: this.$store.getters.currBoard.title,
      filterBy: null,
      board: this.$store.getters.currBoard,
      activeName:'sunday'
    };
  },
  created() {
    this.filterBy = this.$store.getters.currFilterBy;
  },
  computed: {
    boardMembers() {
      return this.$store.getters.currBoard.members;
    },
  },
  methods: {
    changeMode(){
      this.$emit('changeMode')
    },
    getImgUrl(idx) {
      console.log(this.boardMembers[idx].imgUrl);
      return this.boardMembers[idx].imgUrl;
    },
    addGroup() {
      this.$store.dispatch({ type: "addGroup" });
    },
    filter(filterBy) {
      this.filterBy = filterBy;
      this.$store.commit({ type: "updateFilter", filterBy });
      this.$store.dispatch({ type: "updateFilter", filterBy });
    },
    open() {
      this.$prompt(
        "Please enter an email address",
        "Invite a new member to your board",
        {
          confirmButtonText: "Send",
          cancelButtonText: "Cancel",
        }
      )
        .then(({ value }) => {
          httpService.post("board/send", {
            from: "Sunday App 🌞 <yaakovmargalit@gmail.com>",
            to: value,
            subject: "New message from Sunday ",
            text: "Join our board",
            html: `<h2>Join our board  <a href="https://sunday-app-pro.herokuapp.com/#/board/${
              this.$store.getters.currBoard._id
            }?username=${this.getUserName(value)}">click here</a></h2>`,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Input canceled",
          });
        });
    },
    getUserName(val) {
      return val.split("@")[0];
    },
  },

  watch: {
    "$store.getters.currBoard"() {
      this.boardTitle = this.$store.getters.currBoard.title;
    },
  },
};
</script>

<style></style>
