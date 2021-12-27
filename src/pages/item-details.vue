<template>
  <el-drawer
    :size="'40%'"
    :before-close="handleClose"
    :visible.sync="drawer"
    :direction="'rtl'"
  >
    <section class="item-details">
      <div class="item-details-header">
        <div class="flex top-header">
          <h2>{{ currItem.title }}</h2>
          <div class="flex avatars item">
            <p>Members</p>
            <el-avatar
              v-for="member in currItem.person"
              :key="member._id"
              class="avatar"
              :size="'small'"
              :src="member.imgUrl"
            ></el-avatar>
          </div>
        </div>
      </div>
      <div class="item-details-body">
        <el-tabs v-model="activeName">
          <el-tab-pane label="Update" name="first">
            <section class="update">
              <form @submit.prevent="addUpdate">
                <input
                  type="text"
                  v-model="updateTxt"
                  class="update-input"
                  placeholder="Write an update..."
                />
                <button :disabled="!updateTxt" class="update-btn">
                  Update
                </button>
              </form>
              <div class="updates-preview">
                <div
                  class="update-preview"
                  v-for="update in currItem.updates"
                  :key="update.id"
                >
                  <div class="main-update">
                    <div class="by-user flex">
                      <el-avatar
                        :src="
                          update.byUser.imgUrl ||
                          'https://www.w3schools.com/howto/img_avatar.png'
                        "
                        class="user-icon"
                        :size="'medium'"
                        icon="el-icon-user-solid"
                      ></el-avatar>
                      {{ update.byUser.fullname }}
                    </div>
                    {{ update.txt }}
                  </div>
                  <div class="update-actions flex">
                    <div
                      @click="isLike = !isLike"
                      class="update-actions-btn flex"
                    >
                      <img
                        v-if="isLike"
                        src="../assets/images/like-black.svg"
                        alt=""
                      />
                      <img v-else src="../assets/images/like.svg" alt="" />
                      Like
                    </div>
                    <div
                      @click="addReply(update.id)"
                      class="update-actions-btn flex"
                    >
                      <img src="@/assets/images/reply.svg" alt="" />Reply
                    </div>
                  </div>
                  <div class="update-reply flex">
                    <el-avatar
                      :src="
                        loggedinUser.imgUrl ||
                        'https://www.w3schools.com/howto/img_avatar.png'
                      "
                      class="user-icon"
                      :size="'medium'"
                      icon="el-icon-user-solid"
                    ></el-avatar>
                    <form @submit.prevent="addReply(update.id)">
                      <input
                        v-model="replyTxt"
                        type="text"
                        placeholder="Write a reply..."
                      />
                    </form>
                  </div>
                  <div>
                    <div
                      class="reply-preview"
                      v-for="reply in update.replies"
                      :key="reply.id"
                    >
                      <div class="reply-avatar" v-if="reply.byUser">
                        <el-avatar
                          :src="reply.byUser.imgUrl"
                          class="user-icon"
                          :size="'small'"
                          icon="el-icon-user-solid"
                        ></el-avatar>
                      </div>
                      <div>
                        {{ reply.txt }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </el-tab-pane>
          <el-tab-pane label="Files" name="second">Files</el-tab-pane>
          <el-tab-pane label="Activity Log" name="third">
            <activity-log
              v-for="activity in currItem.activityLog"
              :key="activity.id"
              :activity="activity"
              :currItem="currItem"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
    </section>
  </el-drawer>
</template>

<script>
import { utilService } from "../services/util.service";
import activityLog from "@/cmps/activity-log.vue";
import { socketService } from "../services/socket.service.js";
export default {
  components: {
    activityLog,
  },
  data() {
    return {
      drawer: true,
      activeName: "first",
      updateTxt: "",
      replyTxt: "",
      groupId: "",
      isLike: false,
    };
  },
  created() {
    this.drawer = true;
    console.log(this.currItem);
  },
  methods: {
    addActivity() {},
    timeAgo() {
      return;
    },
    addUpdate() {
      if (!this.updateTxt) return;
      const newUpdete = {
        id: utilService.makeId(),
        byUser: this.$store.getters.loggedinUser,
        txt: this.updateTxt,
        replies: [],
        likes: [],
      };
      console.log(newUpdete.byUser);
      const copyItem = JSON.parse(JSON.stringify(this.currItem));
      copyItem.updates.unshift(newUpdete);
      this.updateTxt = "";
      this.$store.dispatch({
        type: "editItem",
        item: copyItem,
        groupId: this.groupId,
      });
      socketService.emit("item newItemUpdate", {
        itemId: copyItem.id,
        groupId: this.groupId,
      });
    },
    addReply(updateId) {
      if (!this.replyTxt) return;
      const newReply = {
        id: utilService.makeId(),
        txt: this.replyTxt,
        byUser: this.$store.getters.loggedinUser,
      };
      const copyItem = JSON.parse(JSON.stringify(this.currItem));
      const updateIdx = copyItem.updates.findIndex(
        (update) => update.id === updateId
      );
      copyItem.updates[updateIdx].replies.push(newReply);
      this.$store.dispatch({
        type: "editItem",
        item: copyItem,
        groupId: this.groupId,
      });
      socketService.emit("item newItemUpdate", {
        itemId: copyItem.id,
        groupId: this.groupId,
      });
      this.replyTxt = "";
    },
    handleClose(done) {
      this.$router
        .push("/board/" + this.$store.getters.currBoard._id)
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    currItem() {
      const itemId = this.$route.params.itemId;
      const myData = this.$store.getters.getItemById(itemId);
      this.groupId = myData.groupId;
      return myData.item;
    },
    likeImg() {
      return true ? "@/assets/images/like.svg" : "";
    },
  },
};
</script>

<style></style>
