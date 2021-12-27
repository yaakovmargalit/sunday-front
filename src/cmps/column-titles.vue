<template>
  <Container
    :drop-placeholder="{ className: 'ooo' }"
    :behaviour="'move'"
    @drop="onDrop"
    :orientation="'horizontal'"
    :drag-class="'title-column-is-in-darg'"
    class="coloums-titles"
    :drag-handle-selector="'.group-handle'"
  >
    <Draggable v-for="cmp in cmpsOrder" :key="cmp" class="coloums-title">
      <li class="title-column flex" @click="sort(cmp)">
        <div class="group-handle group-handle-column">
          <img draggable="false" src="../assets/images/drag_icon.svg" alt="" />
        </div>
        <div class="title-iner">
          {{ toTitle(cmp) }}
        </div>
        <template v-if="cmp.split('-')[0] === sortBy.type" class="sorting-ques">
          <div class="sort-dir-btn">
            <i v-if="sortBy.direction === 1" class="el-icon-caret-top"></i>
            <i v-else class="el-icon-caret-bottom"></i>
          </div>
          <div class="sort-clr-btn" @click.stop="sort('-')">
            <i class="el-icon-close"></i>
          </div>
        </template>
      </li>
    </Draggable>
    <div class="add-column"><i class="el-icon-circle-plus-outline"></i></div>
  </Container>
</template>
<script>
import { Container, Draggable } from "vue-smooth-dnd";
const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  console.log(removedIndex, addedIndex, payload);
  console.log(payload);
  if (removedIndex === null && addedIndex === null) return arr;
  const result = [...arr];
  let itemToAdd = payload;
  // itemToAdd.id= makeid()
  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }
  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }
  return result;
};
export default {
  props: ["cmpsOrder", "sortBy"],
  components: {
    Container,
    Draggable,
  },
  data() {
    return {
      currCmpsOrder: this.cmpsOrder,
    };
  },
  methods: {
    applyDrag(items, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;
      if (removedIndex === null && addedIndex === null) return items;
      let itemToAdd = payload;
      if (removedIndex !== null) {
        itemToAdd = items.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        items.splice(addedIndex, 0, itemToAdd);
      }
      return items;
    },
    onDrop(dropResult) {
      this.cmpsOrder = this.applyDrag(this.cmpsOrder, dropResult);
      this.$store.dispatch({ type: "justUpdateBoard" });

      // console.log(this.currCmpsOrder);
      // this.$store.dispatch({
      //   type: "changeCmpsOrder",
      //   cmpsOrder: this.cmpsOrder,
      // });
    },
    toTitle(cmp) {
      var title = cmp.split("-")[0];
      return title.charAt(0).toUpperCase() + title.slice(1);
    },
    sort(cmp) {
      this.$emit("sort", cmp.split("-")[0]);
    },
  },
};
</script>
<style></style>
