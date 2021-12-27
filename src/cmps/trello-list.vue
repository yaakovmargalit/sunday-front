<template>
  <Container
    class="flex"
    :drop-placeholder="{ className: 'ooo', showOnTop: false }"
    :drag-class="'group-is-in-drag'"
    @drop="onDrop"
    :orientation="'horizontal'"
    :drag-handle-selector="'.group-handle'"
  >
    <Draggable v-for="group in groups" :key="group.id">
      <section class="trello-group">
        <div class="trello-group-top">
          <div class="group-handle">
            <img
              draggable="false"
              src="../assets/images/drag_icon.svg"
              alt=""
            />
          </div>
          <div class="trello-title-group">{{ group.title }}</div>
        </div>

        <trello-group
          :byStatus="byStatus"
          :group="group"
          :items="group.items"
        ></trello-group>
      </section>
    </Draggable>
  </Container>
</template>

<script>
////////////////מחיקה סוקט
import { Container, Draggable } from "vue-smooth-dnd";
import trelloGroup from "@/cmps/trello-group";
export default {
  props: ["groups", "byStatus"],
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
      this.groups = this.applyDrag(this.groups, dropResult);
      this.$store.dispatch({ type: "justUpdateBoard" });
    },
  },
  components: {
    trelloGroup,
    Container,
    Draggable,
  },
};
</script>

<style scoped>
.ooo {
  /* background-color: rgba(228, 225, 225,0.5); */
  border: 1px rgb(255, 255, 255) dashed;
  z-index: -20;
  margin: 5px;
  border-radius: 5px;
}
.isInDrag {
  z-index: 55555555;
  transform: rotate(1deg);
}
</style>
