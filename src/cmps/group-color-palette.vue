<template>
  <div
    tabindex="0"
    ref="focusModal"
    @blur="focusOut"
    class="colors-modal flex wrap"
    v-if="groupModal === group.id"
  >
    <group-colors
      v-for="colorOpt in predefineColors"
      :key="colorOpt"
      :group="group"
      :colorOpt="colorOpt"
      @setColor="setColor"
    />
    <!-- <button @click="focusDiv">focus</button> -->
  </div>
</template>

<script>
import groupColors from "@/cmps/group-colors.vue";

export default {
  props: ["groupModal", "group"],
  components: {
    groupColors,
  },
  data() {
    return {
      predefineColors : [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#00ecd1",
        "#1e90ff",
        "#c71585",
        "#c7f5a5",
        "#c7158577",
    ],
    };
  },
  mounted() {
    // this.focusDiv();
  },
  methods: {
    setColor(color) {
      const copyGroup = JSON.parse(JSON.stringify(this.group));
      copyGroup.color = color;
      this.$emit("setColor", copyGroup);
    },
    focusDiv() {
    //   console.log("created and focus div");
    //   this.$refs.focusModal.focus();
    },
    focusOut() {
    //   console.log("out of focus");
    },
  },
  computed: {
    //   predefineColors() {
    //   return this.$store.getters.predefineColors;
    // },
  },
  watch: {
      groupModal(newVal, oldVal) {
        //   console.log(this.groupModal);
        //   console.log(this.group.id);
        //   if(this.group.id === this.groupModal) console.log(this.group.id);
        //   this.focusDiv();
      }
  }
};
</script>
