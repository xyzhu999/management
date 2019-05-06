<template>
  <div class="top">
    <p class="title_name">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    }
  }
}
</script>

<style>
   .title_name{
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    font-size:20px;
    padding:24px;
    padding-bottom: 0;
  }
  .top{
    box-sizing:border-box;
  }
</style>
