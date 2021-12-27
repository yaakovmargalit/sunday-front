<template>
  <div
    :style="{ 'background-color': item.priority.bgColor }"
    class="priority-picker"
  >
    <el-dropdown class="priority" trigger="click" placement="bottom">
      <span class="el-dropdown-link">
        <div
          :style="{ backgroundColor: item.priority.bgColor }"
          class="priority"
        >
          <!-- <div v-if="isDone&&isPlay"  ref="doneImg" class="done-gif">
            <img src="../assets/images/done.gif" alt="" />
          </div> -->
          <p>{{ item.priority.txt }}</p>
        </div>
      </span>
      <el-dropdown-menu class="priority-drop-down" slot="dropdown">
        <el-dropdown-item>
          <div
            @click="changePriority({ txt: 'High', bgColor: '#8a079a', importance: 3 })"
            class="priority-item high"
          >
            High
          </div>
        </el-dropdown-item>
        <el-dropdown-item>
          <div
            @click="changePriority({ txt: 'Medium', bgColor: '#bec01e', importance: 2 })"
            class="priority-item medium"
          >
            Medium
          </div>
        </el-dropdown-item>
        <el-dropdown-item>
          <div
            @click="changePriority({ txt: 'Low', bgColor: '#3670e4', importance: 1 })"
            class="priority-item low"
          >
            Low
          </div>
        </el-dropdown-item>
        <el-dropdown-item>
          <div
            @click="changePriority({ txt: '-', bgColor: '#c8c8c8', importance: 0 })"
            class="priority-item draft"
          >
            -
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "priorityPicker",
  props: ["item", "groupId"],
  data() {
    return {
      // isPlay: false,
    };
  },
  methods: {
    changePriority(priority) {
      // console.log(this.$refs);
      // this.isPlay = true;
      // setTimeout(() => {
      //   this.isPlay = false;
      // }, 2500);

      this.$emit("changePriority", {
        groupId: this.groupId,
        itemId: this.item.id,
        priority,
      });
    },
  },

  computed: {
    // isDone() {
    //   return this.item.priority.txt === "Done" ? true : false;
    // },
    // doneClass() {
    //   return {
    //     play: this.isPlay,
    //   };
    // },
  },
};
</script>
