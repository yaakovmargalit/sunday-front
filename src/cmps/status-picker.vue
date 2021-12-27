<template>
  <div
    :style="{ backgroundColor: item.status.bgColor }"
    class="status-picker"
  >
    <el-dropdown class="status" trigger="click" placement="bottom">
      <span class="el-dropdown-link">
        <div
          :style="{ backgroundColor: item.status.bgColor ,borderColor:'blue' }"
          class="status"
        >
          <div v-if="isDone&&isPlay"  ref="doneImg" class="done-gif">
            <img src="../assets/images/done.gif" alt="" />
          </div>
          <p>{{ item.status.txt }}</p>
        </div>
      </span>
      <el-dropdown-menu class="status-drop-down" slot="dropdown">
        <el-dropdown-item>
          <div
            @click="changeStatus({ txt: 'Stuck', bgColor: '#E2445C' })"
            class="status-item stuck"
          >
            Stuck
          </div>
        </el-dropdown-item>
        <el-dropdown-item>
          <div
            @click="changeStatus({ txt: 'Working on it', bgColor: '#FDAB3D' })"
            class="status-item working"
          >
            Working on it
          </div>
        </el-dropdown-item>
        <el-dropdown-item>
          <div
            @click="changeStatus({ txt: 'Done', bgColor: '#00C785' })"
            class="status-item done"
          >
            Done
          </div>
        </el-dropdown-item>
        <el-dropdown-item>
          <div
            @click="changeStatus({ txt: '-', bgColor: '#c8c8c8' })"
            class="status-item draft"
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
  name: "statusPicker",
  props: ["item", "groupId"],
  data() {
    return {
      isPlay: false,
    };
  },
  methods: {
    changeStatus(status) {
      console.log(this.$refs);
      this.isPlay = true;
      setTimeout(() => {
        this.isPlay = false;
      }, 2500);

      this.$emit("changeStatus", {
        groupId: this.groupId,
        itemId: this.item.id,
        status,
      });
    },
  },

  computed: {
    isDone() {
      return this.item.status.txt === "Done" ? true : false;
    },
    doneClass() {
      return {
        play: this.isPlay,
      };
    },
  },
};
</script>
