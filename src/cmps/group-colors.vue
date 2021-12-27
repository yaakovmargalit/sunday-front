<template>
  <section>
    <div class="color-in-palette" :style="{ 'background-color': colorOpt }" @click="setColor"></div>
  </section>
</template>

<script>
export default {
  name: "groupColors",
  props: ["colorOpt"],
  data() {
    return {
    }
  },
  methods: {
    setColor(){
      this.$emit("setColor", this.colorOpt)
    }
  }
};
</script>
