<template>
<!-- eslint-disable max-len -->
<!-- Created with Inkscape (http://www.inkscape.org/) -->
<svg viewBox="0 0 320 210" xmlns="http://www.w3.org/2000/svg">

 <g>
  <title>Layer 1</title>
  <rect rx="12" id="svg_3" height="100" width="100" y="0" x="110" :stroke="upColor" :fill="upColor"/>
  <rect rx="12" id="svg_5" height="100" width="100" y="110" x="110" :stroke="downColor" :fill="downColor"/>
  <rect rx="12" id="svg_6" height="100" width="100" y="110" x="0" :stroke="leftColor" :fill="leftColor"/>
  <rect rx="12" id="svg_7" height="100" width="100" y="110" x="220" :stroke="rightColor" :fill="rightColor"/>
 </g>
</svg>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ArrowKeys',
  props: {
    upColor: {
      type: String,
      required: true
    },
    downColor: {
      type: String,
      required: true
    },
    rightColor: {
      type: String,
      required: true
    },
    leftColor: {
      type: String,
      required: true
    }
  }
});
</script>
