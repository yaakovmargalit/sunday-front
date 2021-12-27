<template>
  <!-- <li v-if="!isShowAdd" class="add-item" @click.stop="showAddItem">Add</li> -->
  <!-- <form v-else class="flex space-between" @submit.prevent="addItem"> -->
  <!-- <form class="flex space-between" @submit.prevent="addItem">
    <li class="add-item">
      <input ref="insertTitle" type="text" @focusout="focOut" v-model="newItemTitle" placeholder="Add" />
    </li>
    <button>Add</button>
  </form> -->
  <li class="add-item flex" :class="classFocus">
    <div :style="{ 'background-color': group.color }" class="group-color"></div>
    <form @submit.prevent="addItem">
      <input
        type="text"
        v-model.lazy="newItemTitle"
        @focus="focIn"
        @focusout="focOut"
        placeholder="+ Add item"
      />
      <button v-if="isShowAdd" class="add-item-btn">Add</button>
    </form>
  </li>
</template>

<script>
export default {
  name: "columnList",
  props: ["group"],
  data() {
    return {
      isShowAdd: false,
      newItemTitle: "",
      currGroup: JSON.parse(JSON.stringify(this.group)),
    };
  },
  methods: {
    addItem() {
      this.isShowAdd = false;
      if (!this.newItemTitle) return;
      const groupId = this.group.id;
      const newItemTitle = this.newItemTitle;
      this.newItemTitle = "";
      this.$emit("addItem", { newItemTitle, groupId });
      // this.$emit("addItem", { newItemTitle, originGroup: this.currGroup });
    },
    focIn() {
      this.isShowAdd = true;
    },
    focOut() {
      this.isShowAdd = false;
      // if (!this.isShowAdd) return;
      this.addItem();
    },
  },
  computed: {
    classFocus() {
      return {
        "add-item-focus": this.isShowAdd,
      };
    },
  },
};
</script>
