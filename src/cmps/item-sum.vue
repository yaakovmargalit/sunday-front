<template>
  <section>
    <div v-if="statusToShow" class="sum-container flex justify-center">
      <div
        v-for="(status, key, idx) in statusCount"
        :key="key"
        class="sum-cell"
        :style="{
          width: status * widthUnitStatus + 'px',
          backgroundColor: cellsColorsStatus[idx],
        }"
      >
        <el-tooltip
          class="item"
          effect="dark"
          :content="key + ', ' + status + ' out of ' + group.items.length"
          placement="top"
        >
          <el-button class="tooltip-btn"></el-button>
        </el-tooltip>
      </div>
    </div>
    <div v-else-if="priorityToShow" class="sum-container flex justify-center">
      <div
        v-for="(priority, key, idx) in priorityCount"
        :key="key"
        class="sum-cell"
        :style="{
          width: priority * widthUnitPriority + 'px',
          backgroundColor: cellsColorsPriority[idx],
        }"
      >
        <el-tooltip
          class="item"
          effect="dark"
          :content="key + ', ' + priority + ' out of ' + group.items.length"
          placement="top"
        >
          <el-button class="tooltip-btn"></el-button>
        </el-tooltip>
      </div>
    </div>
    <div v-else class="empty-div"></div>
  </section>
</template>

<script>
export default {
  name: "itemSum",
  props: ["group", "cmp"],
  data() {
    return {
      cellsColorsStatus: [],
      cellsColorsPriority: [],
      tooltipStatus: [],
      tooltipPriority: [],
    };
  },
  created() {},
  methods: {},
  computed: {
    statusToShow() {
      if (this.cmp === "status-picker") return true;
    },
    priorityToShow() {
      if (this.cmp === "priority-picker") return true;
    },
    statusCount() {
      if (this.cmp !== "status-picker") return;
      const statusMap = {};
      const cellsColorsStatus = [];
      this.group.items.forEach((item) => {
        if (!cellsColorsStatus.includes(item.status.bgColor))
          cellsColorsStatus.push(item.status.bgColor);
        if (statusMap[item.status.txt]) {
          statusMap[item.status.txt] += 1;
        } else {
          statusMap[item.status.txt] = 1;
        }
        // statusMap[item.status.txt] ? statusMap[item.status.txt] + 1 : 1;
      });
      this.cellsColorsStatus = cellsColorsStatus;
      return statusMap;
    },
    priorityCount() {
      if (this.cmp !== "priority-picker") return;
      const priorityMap = {};
      const cellsColorsPriority = [];
      this.group.items.forEach((item) => {
        if (!cellsColorsPriority.includes(item.priority.bgColor))
          cellsColorsPriority.push(item.priority.bgColor);
        if (priorityMap[item.priority.txt]) {
          priorityMap[item.priority.txt] += 1;
        } else {
          priorityMap[item.priority.txt] = 1;
        }
        // statusMap[item.status.txt] ? statusMap[item.status.txt] + 1 : 1;
      });
      this.cellsColorsPriority = cellsColorsPriority;
      return priorityMap;
    },
    totalCountStatus() {
      return this.group.items.length;
    },
    widthUnitStatus() {
      return (180 / this.totalCountStatus).toFixed(1);
    },
    totalCountPriority() {
      return this.group.items.length;
    },
    widthUnitPriority() {
      return (180 / this.totalCountPriority).toFixed(1);
    },
  },
};
</script>

<style></style>
