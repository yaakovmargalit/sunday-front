<template>
  <el-dropdown trigger="click" @command="handleCommandGroup">
    <span class="el-dropdown-link">
      <i
        :style="{ 'background-color': group.color }"
        class="el-icon-caret-bottom group-title-btn"
      ></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="delete">
        <i class="el-icon-delete"></i>
        Delete group
      </el-dropdown-item>
      <el-dropdown-item command="changeColor" :style="{ color: group.color }">
        <i class="el-icon-orange"></i>
        Change group color
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: "groupDropdown",
  props: ["group"],
  data() {
    return {
      color: "#ff4500",
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
      ],
    };
  },
  methods: {
    handleCommandGroup(command) {
      if (command === "delete") this.removeGroup();
      if (command === "changeColor") this.changeGroupColor();
    },
    changeGroupColor() {
      this.$emit("changeGroupColor", this.group);
      // this.$store.dispatch({
      //   type: "changeGroupColor",
      //   color: this.color,
      //   group,
      // });
    },
    removeGroup() {
      this.$emit("removeGroup", this.group.id);
    },
  },
};
</script>
