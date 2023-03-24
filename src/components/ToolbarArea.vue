<template>
  <div>
    <div class='tools'>
      <div @click="toolActivated('selection')" :class="{'tool': true, 'tool-activated': activeTool === 'selection'}">
        <font-awesome-icon icon="fa-arrow-pointer" class="icon" />
      </div>
      <div @click="toolActivated('move')" :class="{'tool': true, 'tool-activated': activeTool === 'move'}">
        <font-awesome-icon icon="fa-arrows-up-down-left-right" class="icon" />
      </div>
      <div @click="toolActivated('closestPoints')" :class="{'tool': true, 'tool-activated': activeTool === 'closestPoints'}">
        <font-awesome-icon icon="fa-left-right" class="icon" />
      </div>
    </div>
    <div class='tools'>
      <div @click="toolActivated('addTriangle')" :class="{'tool': true, 'tool-activated': activeTool === 'addTriangle'}">
        <BIconTriangleFill class="icon" />
      </div>
      <div @click="toolActivated('addSquare')" :class="{'tool': true, 'tool-activated': activeTool === 'addSquare'}">
        <BIconSquareFill class="icon" />
      </div>
      <div @click="toolActivated('addHexagon')" :class="{'tool': true, 'tool-activated': activeTool === 'addHexagon'}">
        <BIconHexagonFill class="icon" />
      </div>
    </div>
    <div class='tools'>
      <div @click="saveClicked" :class="{'tool': true}">
        <font-awesome-icon icon="fa-save" class="icon" />
      </div>
    </div>
  </div>
</template>

<script>
import { BIconTriangleFill, BIconSquareFill, BIconHexagonFill } from 'bootstrap-icons-vue';

export default {
  name: 'ToolbarArea',
  props: ['saveState'],
  components: {
    BIconTriangleFill,
    BIconSquareFill,
    BIconHexagonFill
  },
  data() {
    return {
      activeTool: ''
    }
  },
  methods: {
    toolActivated(tool) {
      if (this.activeTool === tool)
        this.activeTool = ''
      else
        this.activeTool  = tool

      this.$emit('selectTool', this.activeTool)
    },
    saveClicked() {
      this.$emit('saveTool', true)
    }
  },
  updated() {
  }
}
</script>

<style scoped>
.tools {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
}
.tool {
  width: 80%;
  aspect-ratio: 1 / 1;
  color: black;
  background: #8C8C8C;
  border: 4px solid #8C8C8C;
}
.tool-activated {
  border: 4px solid #317545;
}
.icon {
  padding: 4px;
  height: 37px;
  width: 37px;
}
</style>