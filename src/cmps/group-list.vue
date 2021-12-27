<template>
  <Container
    class="group-list"
    :drop-placeholder="{ className: 'ooo', showOnTop: false }"
    :drag-class="'group-is-in-drag'"
    @drop="onDrop"
    :orientation="'vertical'"
    :drag-handle-selector="'.group-handle'"
  >
    <Draggable v-for="group in groups" :key="group.id">
      <div class="group draggable-item">
        <!-- <group-preview /> -->
        <ul class="group">
          <li class="group-titles">
            <div
              :style="{ color: group.color }"
              class="flex title"
              :class="classObject"
              @click="sort('title')"
            >
              <group-dropdown
                :group="group"
                @removeGroup="removeGroup"
                @changeGroupColor="openColorModal"
              />
              <div class="group-handle">
                <img
                  draggable="false"
                  src="../assets/images/drag_icon.svg"
                  alt=""
                />
              </div>
              <form class="group-title-form">
                <input
                  @blur.prevent="changeGroupTitle($event.target.value, group)"
                  class="group-title"
                  :style="{ color: group.color, 'border-color': group.color }"
                  type="text"
                  :value="group.title"
                />
                <group-color-palette
                  :group="group"
                  :groupModal="groupModal"
                  @setColor="setColor"
                />
              </form>
            </div>
            <column-titles
              :cmpsOrder="cmpsOrder"
              :sortBy="sortBy"
              @sort="sort"
            ></column-titles>
          </li>
          <!--<section class="group-titles">{{ group.title }}</section>-->

          <!-- this is for wrapping the item preview inside the Draggable -->

          <item-list
            :board="$store.getters.currBoard"
            :group="groupToShow(group)"
            :groups="groups"
            :items="group.items"
          ></item-list>
          <add-item :group="group" @addItem="addItem" />

          <li class="sum flex">
            <div class="empty-div-start"></div>
            <item-sum
              v-for="cmp in cmpsOrder"
              :key="cmp"
              :group="group"
              :cmp="cmp"
            />
          </li>
        </ul>
      </div>
    </Draggable>
  </Container>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { boardService } from "../services/borad/board.service.js";
import addItem from "@/cmps/add-item.vue";
import itemList from "@/cmps/item-list.vue";
import itemSum from "@/cmps/item-sum.vue";
import columnTitles from "@/cmps/column-titles";
import groupDropdown from "@/cmps/group-dropdown.vue";
import groupColors from "@/cmps/group-colors.vue";
import groupColorPalette from "@/cmps/group-color-palette.vue";

export default {
  name: "groupList",
  props: ["groups", "cmpsOrder"],
  components: {
    Container,
    Draggable,
    addItem,
    columnTitles,
    groupDropdown,
    itemList,
    itemSum,
    groupColors,
    groupColorPalette,
  },
  data() {
    return {
      allGroups: JSON.parse(JSON.stringify(this.groups)),
      // isColorshown: false,
      groupModal: null,
    };
  },
  methods: {
    groupToShow(group) {
      return group;
    },
    applyDrag(items, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;
      if (removedIndex === null && addedIndex === null) return items;
      // const result = items;
      let itemToAdd = payload;
      if (removedIndex !== null) {
        itemToAdd = items.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        console.log("add", itemToAdd);
        items.splice(addedIndex, 0, itemToAdd);
      }
      return items;
    },
    onDrop(dropResult) {
      this.groups = this.applyDrag(this.groups, dropResult);
      this.$store.dispatch({ type: "justUpdateBoard" });
      // this.$store.dispatch({
      //   type: "changeGroupsOrder",
      //   groups: this.allGroups,
      // });
    },
    addItem({ newItemTitle, groupId }) {
      this.$store.dispatch({ type: "addItem", newItemTitle, groupId });
    },
    // addItem({ newItemTitle, originGroup }) {
    //   const group = JSON.parse(JSON.stringify(originGroup));
    //   const newItem = boardService.getEmptyItem(newItemTitle);
    //   group.items.push(newItem)
    //   this.$store.dispatch({ type: "updateGroup", group });
    // },
    changeGroupTitle(value, originGroup) {
      const group = JSON.parse(JSON.stringify(originGroup));
      group.title = value;
      this.$store.dispatch({ type: "updateGroup", group });
    },
    handleCommandGroup(command) {
      if (command === "delete") this.removeGroup(groupId);
    },
    openColorModal(group) {
      this.groupModal = group.id;
    },
    setColor(group) {
      this.groupModal = null;
      this.$store.dispatch({
        type: "updateGroup",
        group,
      });
    },
    removeGroup(groupId) {
      this.$store.dispatch({ type: "removeGroup", groupId });
    },
    showAddItem() {
      this.isShowAdd = true;
    },
    sort(type) {
      if(!type) {
        var sortBy = {type: '', direction: 1};
        this.$store.dispatch({ type: "updateSort", sortBy });
        console.log('this.sortBy',this.sortBy);
        return;
      }
      var sortBy = JSON.parse(JSON.stringify(this.$store.getters.currSortBy));
      sortBy.direction = sortBy.type === type ? sortBy.direction * -1 : 1;
      sortBy.type = type;
      this.$store.dispatch({ type: "updateSort", sortBy });
    },
  },
  computed: {
    sortBy() {
      return this.$store.getters.currSortBy;
    },
    classObject() {
      if (this.sortBy.type === "title") {
        return {
          sorting: true,
          up: this.sortBy.direction === 1,
          down: this.sortBy.direction === -1,
        };
      } else return {};
    },
  },

};
</script>
