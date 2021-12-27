<template>
  <section class="board-filter">
    <div class="search-btn">
      <div class="search-icon">
        <i class="el-icon-search" />
      </div>
      <el-input
        placeholder="Search"
        v-model="currFilterBy.txt"
        @input="filter()"
      ></el-input>
    </div>
    <div class="person-filter-btn">
      <el-popover
        class="person-picker-popover"
        placement="bottom"
        width="432"
        v-model="isPersonModalVisible"
      >
        <div class="titles">
          <div class="title1">Quick person filter</div>
          <div class="title2">Filter items by person</div>
        </div>
        <div class="persons">
          <div
            class="person"
            v-for="(person, idx) in board.members"
            :key="idx"
            @click="changePersonFilter(person._id)"
          >
            <div class="person-img">
              <img :src="person.imgUrl" />
            </div>
          </div>
        </div>
        <el-button class="popover-btn" slot="reference">
          <div class="btn-wrapper">
            <div v-if="filterBy.personId" class="user-img">
              <img :src="currPersonImgUrl" />
            </div>
            <i v-else class="el-icon-user" />
            <span>Person</span>
            <i
              v-if="filterBy.personId"
              class="el-icon-close"
              @click="changePersonFilter('')"
            ></i>
          </div>
        </el-button>
      </el-popover>
    </div>
    <div class="status-filter-btn">
      <el-popover
        class="status-picker-popover"
        placement="bottom"
        width="250"
        v-model="isStatusModalVisible"
      >
        <div class="titles">
          <div class="title1">Quick status filter</div>
          <div class="title2">Filter items by status</div>
        </div>
        <div class="statuses">
          <div
            class="status"
            v-for="(status, idx) in statuses"
            :key="idx"
            @click="changeStatusFilter(status.txt)"
            :style="{ 'background-color': status.bgColor }"
          >
            <span class="status-name">{{ status.txt }}</span>
          </div>
        </div>
        <el-button class="popover-btn" slot="reference" :style="statusBtnStyle">
          <i class="el-icon-s-order" />
          Status
          <i
            v-if="filterBy.statusTxt"
            class="el-icon-close"
            @click="changeStatusFilter('')"
          ></i>
        </el-button>
      </el-popover>
    </div>
    <div class="priority-filter-btn">
      <el-popover
        class="priority-picker-popover"
        placement="bottom"
        width="250"
        v-model="isPriorityModalVisible"
      >
        <div class="titles">
          <div class="title1">Quick priority filter</div>
          <div class="title2">Filter items by priority</div>
        </div>
        <div class="priorities">
          <div
            class="priority"
            v-for="(priority, idx) in priorities"
            :key="idx"
            @click="changePriorityFilter(priority.txt)"
            :style="{ 'background-color': priority.bgColor }"
          >
            <span class="priority-name">{{ priority.txt }}</span>
          </div>
        </div>
        <el-button class="popover-btn" slot="reference" :style="priorityBtnStyle">
          <i class="el-icon-s-order" />
          Priority
          <i
            v-if="filterBy.priorityTxt"
            class="el-icon-close"
            @click="changePriorityFilter('')"
          ></i>
        </el-button>
      </el-popover>
    </div>
  </section>
</template>

<script>
export default {
  name: "boardFilter",
  props: ["filterBy", "board"],
  data() {
    return {
      currFilterBy: {
        txt: "",
        personId: "",
        statusTxt: "",
        priorityTxt: "",
      },
      isPersonModalVisible: false,
      isStatusModalVisible: false,
      isPriorityModalVisible: false,
      statuses: [
        { txt: "Done", bgColor: "#00C785" },
        { txt: "Working on it", bgColor: "#FDAB3D" },
        { txt: "Stuck", bgColor: "#E2445C" },
        { txt: "-", bgColor: "#c8c8c8" },
      ],
      priorities: [
        { txt: "High", bgColor: "#8a079a", importance: 3 },
        { txt: "Medium", bgColor: "#bec01e", importance: 2 },
        { txt: "Low", bgColor: "#3670e4", importance: 1 },
        { txt: "-", bgColor: "#c8c8c8", importance: 0 },
      ],
    };
  },
  methods: {
    filter() {
      this.$emit("filter", this.currFilterBy);
    },
    changePersonFilter(personId) {
      this.currFilterBy.personId = personId;
      this.filter();
      this.isPersonModalVisible = false;
    },
    changeStatusFilter(statusTxt) {
      this.currFilterBy.statusTxt = statusTxt;
      this.filter();
      this.isStatusModalVisible = false;
    },
    changePriorityFilter(priorityTxt) {
      this.currFilterBy.priorityTxt = priorityTxt;
      this.filter();
      this.isPriorityModalVisible = false;
    },
  },
  computed: {
    currPersonImgUrl() {
      if (!this.currFilterBy.personId) return "";
      else {
        return this.board.members.find(
          (member) => member._id === this.filterBy.personId
        ).imgUrl;
      }
    },
    statusBtnStyle() {
      if(!this.currFilterBy.statusTxt) return '';
      const bgColor = this.statuses.find(status => status.txt === this.currFilterBy.statusTxt).bgColor;
      return {backgroundColor: bgColor, color: '#fff', opacity: 0.5}
    },
    priorityBtnStyle() {
      if(!this.currFilterBy.priorityTxt) return '';
      const bgColor = this.priorities.find(priority => priority.txt === this.currFilterBy.priorityTxt).bgColor;
      return {backgroundColor: bgColor, color: '#fff', opacity: 0.5}
    }
  },
};
</script>
