<template>
  <div class="pace">
    <div class="progress" :style="{opacity: value===100 ? 0 : 1, width: value + '%'}"></div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: ["value"],
};
</script>

<style scoped lang="scss">
.pace {
  pointer-events: none;
  user-select: none;

  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;

  transform: translate3d(0, -50px, 0);

  .progress {
    transition: all 0.5s ease-out;
    transform: translate3d(0, 0, 0);

    background: #29d;

    pointer-events: none;
    height: 2px;
    display: block;
  }
}
</style>