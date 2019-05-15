<template>
    <i :class="`iconfont icon-${type}`" :style="styles"></i>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    type: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#FFFFFF'
    },
    size: {
      type: Number,
      default: 30
    },
    bgColor: {
      type: String,
      default: ''
    }
  },
  computed: {
    styles () {
      return {
        fontSize: `${this.size}px`,
        color: this.color,
        backgroundColor: this.bgColor
      }
    }
  }
}
</script>

<style>
i {
  text-align: center;
}
i:active {
    opacity: 0.6;
}

</style>