<template>
  <Container
    :orientation="'vertical'"
    :drop-placeholder="{ className: 'ooo' }"
    :drag-class="'isInDrag'"
    :get-child-payload="getItemPayload(group)"
    :group-name="'items'"
    @drop="onDrop($event)"
    class="group-items-container"
    :non-drag-area-selector="'.none-drag-input'"
  >
    <Draggable
      v-for="item in itemsToShow"
      :key="item.id"
      class="item-container"
    >
      <item-preview
        :item="item"
        :group-id="group.id"
        :groupColor="group.color"
      />
    </Draggable>
  </Container>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import itemPreview from "@/cmps/item-preview";

export default {
  props: ["items", "group", "groups"],
  data() {
    return {
      copyItems: JSON.parse(JSON.stringify(this.items)),
      copyGroup: JSON.parse(JSON.stringify(this.group)),
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
      this.items = this.applyDrag(this.items, dropResult);
      this.$store.dispatch({ type: "justUpdateBoard" });
    },
    getItemPayload(copyGroup) {
      return (index) => copyGroup.items[index];
    },
  },
  components: {
    Container,
    Draggable,
    itemPreview,
  },
  computed: {
    itemsToShow() {
      
      const sortBy = this.$store.getters.currSortBy;
      return this.items
        .filter((item) => {
          const filterBy = this.$store.getters.currFilterBy;
          const regex = new RegExp(filterBy.txt, "i");
          return (
            (regex.test(this.group.title) || regex.test(item.title)) &&
            item.status.txt.includes(filterBy.statusTxt) &&
            item.priority.txt.includes(filterBy.priorityTxt) &&
            ((!filterBy.personId) ? true : item.person.some((member) => member._id.includes(filterBy.personId)))
          );
        })
        .sort((i1, i2) => {
          var sortIndicator;
          switch (sortBy.type) {
            case "status":
              sortIndicator = i1.status.txt > i2.status.txt;
              break;
            case "priority":
              sortIndicator = i1.priority.importance > i2.priority.importance;
              break;
            case "date":
              sortIndicator = i1.date > i2.date;
              console.log('i1.date, i2.date',i1.date, i2.date);
              break;
            case "timeline":
              sortIndicator = i1.timeline.startDate > i2.timeline.startDate;
              break;
            case "stopwatch":
              sortIndicator = i1.stopwatch.secondsCount > i2.stopwatch.secondsCount;
              break;
            // case "title":
            //   sortIndicator = i1.title > i2.title;
            //   break;
            case "person":
              const firstPersonI1 = [...i1.person].sort((p1, p2) => p1.fullname > p2.fullname)[0];
              const firstPersonI2 = [...i2.person].sort((p1, p2) => p1.fullname > p2.fullname)[0];
              if(!firstPersonI1 || !firstPersonI2) sortIndicator = !!firstPersonI1;
              else sortIndicator = firstPersonI1.fullname > firstPersonI2.fullname;
              break;
            default:
              return 0;
              break;
          }
          if (sortIndicator) return sortBy.direction;
          else return sortBy.direction * -1;
        });

      // if (this.$store.getters.currFilterBy.statusTxt) {
      //   return item.status.txt === this.$store.getters.currFilterBy.statusTxt;
      // } else if (this.$store.getters.currFilterBy.personId) {
      //   for (let i = 0; i < item.person.length; i++) {
      //     if (
      //       item.person[i]._id === this.$store.getters.currFilterBy.personId
      //     )
      //       return item;
      //   }
      // } else {
      //   return item;
      // }
    },
  },
};
</script>

<style>
.ooo {
  /* background-color: rgba(228, 225, 225,0.5); */
  border: 1px gray dashed;
  z-index: -20;
  margin: 5px;
}
.isInDrag {
  z-index: 55555555;
  transform: rotate(1deg);
}
</style>
