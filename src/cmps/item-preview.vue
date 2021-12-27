<template>
  <li class="item-preview">
    <div v-if="isOpenBottomModal" class="item-modal"></div>
    <section class="item-title-container">
      <div class="item-menu">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link"
            ><i class="el-icon-caret-bottom item-menu-btn"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="duplicate" icon="el-icon-document-copy"
              >Duplicate</el-dropdown-item
            >
            <el-dropdown-item command="delete">
              <div class="delete-btn">
                <template>
                  <el-popconfirm
                    confirm-button-text="OK"
                    @confirm="removeItem"
                    cancel-button-text="No, Thanks"
                    icon="el-icon-info"
                    icon-color="red"
                    title="Are you sure to delete this?"
                  >
                    <span slot="reference"
                      ><i class="el-icon-delete" /> Delete</span
                    >
                  </el-popconfirm>
                </template>
                <!-- <i class="el-icon-delete" /> -->
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <router-link
        @click.native="
          newMsgCount = 0;
          hasNewUpdate = false;
        "
        :style="{ color: groupColor }"
        class="item-title flex space-between align-center"
        :to="$store.getters.currBoard._id + '/item/' + item.id"
      >
        <div class="color-and-title flex space-between align-center">
          <div
            :class="groupColorStyle"
            :style="{ 'background-color': groupColor }"
            class="group-color"
          >
            <el-checkbox
              class="input"
              v-model="isOpenBottomModal"
            ></el-checkbox>
          </div>
          <div class="title-and-btns flex align-center">
            <form @submit.prevent="saveTitle" v-if="isEditTitle">
              <input
                class="none-drag-input"
                type="text"
                ref="changeTitle"
                v-model="newTitle"
                @focusout="focusOut"
              />
            </form>
            <template v-else>
              <div>{{ item.title }}</div>
              <div class="edit-btn" @click.prevent="editTitle">Edit</div>
            </template>
          </div>
        </div>
        <div class="details-btn flex align-center">
          <div class="new-msg-icon" v-if="hasNewUpdate">
            <img src="../assets/images/msg-icon-blue.svg" alt="" />
            <span class="new-msg-count">{{ newMsgCount }}</span>
          </div>
          <img v-else src="../assets/images/msg-icon.svg" alt="" />
        </div>
      </router-link>
    </section>
    <!-- "cmpsOrder": ["status-picker", "person-picker", "date-picker","timeline-picker"], -->

    <section v-for="cmpType in cmpsOrder" :key="cmpType">
      <component
        :is="cmpType"
        :item="item"
        :group-id="groupId"
        :group-color="groupColor"
        :members="members"
        :stopwatch="item.stopwatch"
        @changeStatus="changeStatus"
        @changePriority="changePriority"
        @changeDate="changeDate"
        @changeTimeline="changeTimeline"
        @removeAssignedMember="removeAssignedMember"
        @addAssignedMember="addAssignedMember"
        @updateStopwatch="updateStopwatch"
      />
    </section>
    <div class="item-final-block"></div>
    <!-- :info="getCmpInfo(cmpType)" -->
  </li>
</template>

<script>
import columnList from "@/cmps/column-list.vue";
import statusPicker from "@/cmps/status-picker.vue";
import priorityPicker from "@/cmps/priority-picker.vue";
import personPicker from "@/cmps/person-picker.vue";
import datePicker from "@/cmps/date-picker.vue";
import timelinePicker from "@/cmps/timeline-picker.vue";
import stopwatchPicker from "@/cmps/stopwatch-picker.vue";
import { utilService } from "../services/util.service";
import { boardService } from "@/services/borad/board.service.js";
import { socketService } from "../services/socket.service.js";

export default {
  name: "itemPreview",
  props: ["item", "groupId", "groupColor"],
  data() {
    return {
      newTitle: "",
      oldTitle: "",
      isEditTitle: false,
      isOpenBottomModal: false,
      hasNewUpdate: false,
      newMsgCount: 0,
    };
  },
  components: {
    columnList,
    statusPicker,
    priorityPicker,
    personPicker,
    datePicker,
    timelinePicker,
    stopwatchPicker,
  },
  created() {
    socketService.on("item newUpdate", this.newUpdate);
  },
  destroyed() {
    socketService.off("item newUpdate", this.newUpdate);
    // socketService.terminate();
  },
  methods: {
    newUpdate(item) {
      if (item.itemId === this.item.id) {
        this.hasNewUpdate = true;
        this.newMsgCount++;
      }
    },
    editTitle() {
      this.isEditTitle = true;
      setTimeout(() => {
        this.focusInput();
      }, 50);
      this.newTitle = this.item.title;
      this.oldTitle = this.item.title;
    },
    saveTitle() {
      this.isEditTitle = false;
      if (!this.newTitle || this.newTitle === this.oldTitle) return;
      const item = JSON.parse(JSON.stringify(this.item));
      item.title = this.newTitle;
      item.activityLog.unshift({
        id: "a_" + utilService.makeId(),
        action: "Title changed",
        time: Date.now(),
        byUser: {
          _id: "u101",
          fullname: "Tal Tarablus",
          imgUrl:
            "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371",
        },
      });
      console.log(item.title);
      this.$store.dispatch({
        type: "editItem",
        item,
        groupId: this.groupId,
      });
    },
    removeItem() {
      const groupId = this.groupId;
      const item = this.item;
      this.$store.dispatch({ type: "removeItem", groupId, item });
    },
    handleCommand(command) {
      if (command === "duplicate") this.duplicate();
    },
    duplicate() {
      const groupId = this.groupId;
      const item = JSON.parse(JSON.stringify(this.item));
      item.activityLog = [
        {
          id: "a_" + utilService.makeId(),
          action: "duplicated",
          time: Date.now(),
          byUser: {
            _id: "u101",
            fullname: "Tal Tarablus",
            imgUrl:
              "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371",
          },
        },
      ];
      console.log("item", item);
      item.title = item.title.concat(" (copy)");
      this.$store.dispatch({ type: "duplicateItem", groupId, item });
    },
    changeStatus(status) {
      const item = JSON.parse(JSON.stringify(this.item));
      item.status = status.status;
      item.activityLog.unshift({
        id: "a_" + utilService.makeId(),
        action: "Status changed",
        time: Date.now(),
        byUser: {
          _id: "u101",
          fullname: "Tal Tarablus",
          imgUrl:
            "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371",
        },
      });
      this.$store.dispatch({
        type: "editItem",
        item,
        groupId: this.groupId,
      });
    },
    changePriority(priority) {
      const item = JSON.parse(JSON.stringify(this.item));
      item.priority = priority.priority;
      item.activityLog.unshift({
        id: "a_" + utilService.makeId(),
        action: "Priority changed",
        time: Date.now(),
        byUser: {
          _id: "u101",
          fullname: "Tal Tarablus",
          imgUrl:
            "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371",
        },
      });
      this.$store.dispatch({
        type: "editItem",
        item,
        groupId: this.groupId,
      });
    },
    focusInput() {
      this.$refs.changeTitle.focus();
    },
    focusOut() {
      if (!this.isEditTitle) return;
      this.isEditTitle = false;
      this.saveTitle();
    },
    changeDate(dateObj) {
      const item = JSON.parse(JSON.stringify(this.item));
      item.date = dateObj.date;
      item.activityLog.unshift({
        id: "a_" + utilService.makeId(),
        action: "Time changed",
        time: Date.now(),
        byUser: {
          _id: "u101",
          fullname: "Tal Tarablus",
          imgUrl:
            "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371",
        },
      });
      this.$store.dispatch({
        type: "editItem",
        item,
        groupId: this.groupId,
      });
    },
    changeTimeline(timelineObj) {
      const item = JSON.parse(JSON.stringify(this.item));
      if (timelineObj.dates) {
        item.timeline.startDate = timelineObj.dates[0];
        item.timeline.endDate = timelineObj.dates[1];
      } else {
        item.timeline.startDate = null;
        item.timeline.endDate = null;
      }
      item.activityLog.unshift({
        id: "a_" + utilService.makeId(),
        action: "Timeline changed",
        time: Date.now(),
        byUser: {
          _id: "u101",
          fullname: "Tal Tarablus",
          imgUrl:
            "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371",
        },
      });
      this.$store.dispatch({
        type: "editItem",
        item,
        groupId: this.groupId,
      });
    },
    removeAssignedMember(memberObj) {
      const item = JSON.parse(JSON.stringify(this.item));
      const personIdx = item.person.findIndex(
        (person) => person._id === memberObj.memberId
      );
      item.person.splice(personIdx, 1);
      this.$store.dispatch({
        type: "editItem",
        item,
        groupId: this.groupId,
      });
    },
    addAssignedMember(memberObj) {
      const item = JSON.parse(JSON.stringify(this.item));
      item.person.push(memberObj.person);
      this.$store.dispatch({
        type: "editItem",
        item,
        groupId: this.groupId,
      });
    },
    updateStopwatch(secondsCount) {
      console.log("secondCount", secondsCount);
      const item = JSON.parse(JSON.stringify(this.item));
      item.stopwatch.secondsCount = secondsCount;
      this.$store.dispatch({
        type: "editItem",
        item,
        groupId: this.groupId,
      });
    },
  },
  computed: {
    groupColorStyle() {
      return {
        "group-color-open": this.isOpenBottomModal,
        "": !this.isOpenBottomModal,
      };
    },
    cmpsOrder() {
      return this.$store.getters.cmpsOrder;
    },
    members() {
      return this.$store.getters.members;
    },
  },
};
</script>
