<template>
  <section class="date-picker">
    <template>
      <div class="block">
        <el-date-picker
          size="small"
          class="date"
          v-model="currDate"
          type="date"
          @change="changeDate"
          format="MMM d"
        >
        </el-date-picker>
      </div>
    </template>
  </section>
</template>

<script>
export default {
  name: "datePicker",
  props: ["item", "groupId"],
  data() {
    return {
      date: this.item.date,
      currDate: "",
    };
  },
  created() {
    this.currDate = this.date;
  },
  methods: {
    changeDate() {
      this.$emit("changeDate", {
        date: Date.parse(this.currDate),
        groupId: this.groupId,
        itemId: this.item.id,
      });
    },
  },
};
</script>

<style></style>
