<template>
  <Container
    class="trello-group"
    :orientation="'vertical'"
    :drop-placeholder="{ className: 'ooo', showOnTop: false }"
    :drag-class="'isInDrag'"
    :get-child-payload="getItemPayload(group)"
    :group-name="'items'"
    @drop="onDrop($event)"
  >
    <Draggable v-for="item in items" :key="item.id">
      <div class="trello-item">
        <div class="trello-item-top">
          <div
            class="trello-status"
            :style="{ backgroundColor: item.status.bgColor }"
          ></div>
          <div
            class="trello-priority"
            :style="{ backgroundColor: item.priority.bgColor }"
          ></div>
        </div>
        <div class="trello-item-title">
          {{ item.title }}
        </div>
        <div class="trello-item-buttom">
          <div class="date">{{item.date? dateToShow(item.date):'-' }}</div>
          <div class="person">
            <img
              v-for="per in item.person"
              :key="per.id"
              :src="per.imgUrl"
              alt=""
            />
          </div>
        </div>
      </div>
    </Draggable>
  </Container>
</template>

<script>
// :style="{ backgroundColor: byStatus? item.status.bgColor:item.priority.bgColor }"

import { Container, Draggable } from "vue-smooth-dnd";
export default {
  props: ["group", "items", "byStatus"],
  data() {
    return {};
  },
  methods: {
    dateToShow(date) {
      return new Date(date).toLocaleDateString()
    },
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
      this.items = this.applyDrag(this.items, dropResult);
      this.$store.dispatch({ type: "justUpdateBoard" });
    },
    getItemPayload(copyGroup) {
      return (index) => copyGroup.items[index];
    },
  },
  computed: {},
  components: {
    Container,
    Draggable,
  },
};
</script>

<style scoped>
.ooo {
  border: 3px rgb(226, 41, 41) dashed;
  margin: 5px;
  border-radius: 5px;
}
.isInDrag {
  transform: rotate(-3deg);
}
</style>
