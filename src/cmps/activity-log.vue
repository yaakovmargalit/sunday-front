<template>
  <section>
    <section class="activity-log">
      <div>
        <i class="el-icon-time"></i>
        {{ time }}
      </div>
      <div>{{ currItem.title }}</div>
      <el-avatar
        :src="activity.byUser.imgUrl"
        class="user-icon"
        :size="'small'"
        icon="el-icon-user-solid"
      ></el-avatar>
      <div>
        {{ activity.action }}
      </div>
    </section>
      <hr />
  </section>
</template>

<script>
import { utilService } from "../services/util.service";

export default {
  name: "activityLog",
  props: ["activity", "currItem"],
  data() {
    return {};
  },
  methods: {},
  computed: {
    time() {
      return utilService.timePassed(this.activity.time);
    },
  },
};
</script>

<style></style>
