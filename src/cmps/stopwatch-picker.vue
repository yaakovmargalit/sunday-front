<template>
  <section class="stopwatch-picker">
    <div class="run-btn" @click="toggleStopwatch">
      <i v-if="!isRunning" class="el-icon-caret-right"></i>
      <i v-else class="el-icon-video-pause"></i>
    </div>
    <div v-if="secondsCount" class="time">
      <span v-if="hours !== '0h'" class="hours">{{ hours }}</span>
      <span class="minutes">{{ minutes }}</span>
      <span class="seconds">{{ seconds }}</span>
    </div>
    <div
      v-if="secondsCount && !isRunning"
      class="clear-btn"
      @click="clearStopwatch"
    >
      <i class="el-icon-close"></i>
    </div>
  </section>
</template>

<script>
export default {
  name: "stopwatchPicker",
  props: ["stopwatch"],
  data() {
    return {
      secondsCount: 0,
      isRunning: false,
      countInterval: null,
    };
  },
  created() {
    this.secondsCount = this.stopwatch.secondsCount;
  },
  destroyed() {
    clearInterval(this.countInterval);
  },
  methods: {
    toggleStopwatch() {
      if (this.isRunning) {
        clearInterval(this.countInterval);
        this.update();
      } else {
        this.countInterval = setInterval(() => {
          this.secondsCount++;
        }, 1000);
      }
      this.isRunning = !this.isRunning;
    },
    clearStopwatch() {
      this.secondsCount = 0;
      this.update();
    },
    update() {
      this.$emit("updateStopwatch", this.secondsCount);
    },
  },
  computed: {
    hours() {
      return Math.floor(this.secondsCount / 60 / 60) + "h";
    },
    minutes() {
      if (this.secondsCount / 60 < 60)
        return Math.floor(this.secondsCount / 60) + "m";
      else return Math.floor((this.secondsCount / 60) % 60) + "m";
    },
    seconds() {
      if (this.secondsCount < 60) return this.secondsCount + "s";
      else return (this.secondsCount % 60) + "s";
    },
  },
};
</script>
