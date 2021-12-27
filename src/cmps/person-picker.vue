<template>
  <div class="person-picker">
    <div class="plus-btn">+</div>
    <div v-if="item.person.length" class="avatars">
      <div  class="avatar" v-for="(person, idx) in item.person" :key="idx">
        <img :src="person.imgUrl" />
      </div>
    </div>
    <img class="empty-person" v-else src="../assets/images/empty-person.svg" alt="">
    <el-popover
      class="person-picker-popover"
      placement="bottom-start"
      width="250"
      v-model="visible"
    >
      <div class="assigned-persons" v-if="assignedMembers.length">
        <div
          class="assigned-person"
          v-for="(person, idx) in assignedMembers"
          :key="idx"
        >
          <div class="person-img">
            <img :src="person.imgUrl" />
          </div>
          <div class="person-name">{{ person.fullname }}</div>
          <div class="remove-person-btn" @click="removePerson(person)">
            <i class="el-icon-close" />
          </div>
        </div>
      </div>
      <div class="title">
        <span class="title-txt">People</span>
      </div>
      <div class="persons-to-pick" v-if="notAssignedMembers.length">
        <div
          class="person-to-pick"
          v-for="(person, idx) in notAssignedMembers"
          :key="idx"
          @click="addPerson(person)"
        >
          <div class="person-img">
            <img :src="person.imgUrl" />
          </div>
          <div class="person-name">{{ person.fullname }}</div>
        </div>
      </div>
      <el-button class="popover-btn" slot="reference"></el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "personPicker",
  props: ["item", "groupId", "members"],
  data() {
    return {
      visible: false,
      assignedMembers: [],
      notAssignedMembers: [],
    };
  },
  created() {
    this.assignedMembers = [...this.item.person];
    this.notAssignedMembers = this.members.filter((member) => {
      return !this.assignedMembers.find((assMem) => assMem._id === member._id);
    });
  },
  methods: {
    removePerson(person) {
      this.notAssignedMembers.push(person);
      const idx = this.assignedMembers.findIndex(
        (member) => member._id === person._id
      );
      this.assignedMembers.splice(idx, 1);
      this.$emit("removeAssignedMember", {
        memberId: person._id,
        groupId: this.groupId,
        itemId: this.item.id,
      });
    },
    addPerson(person) {
      this.assignedMembers.push(person);
      const idx = this.notAssignedMembers.findIndex(
        (member) => member._id === person._id
      );
      this.notAssignedMembers.splice(idx, 1);
      this.$emit("addAssignedMember", {
        person,
        groupId: this.groupId,
        itemId: this.item.id,
      });
    },
  },
};
</script>

<style></style>
