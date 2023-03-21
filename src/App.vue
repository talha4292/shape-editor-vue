<template>
  <div class="shape-editor">
    <ToolbarArea class="toolbar-area" @selectTool="toolSelected" @saveTool="handleState"/>
    <EditorArea class="editor-area" :activeTool="activeTool" :saveState="saveState" @saveTool="handleState" />
  </div>
</template>

<script>
import ToolbarArea from './components/ToolbarArea.vue'
import EditorArea from './components/EditorArea.vue'

export default {
  name: 'App',
  components: {
    ToolbarArea,
    EditorArea
  },
  data() {
    return {
      activeTool: '',
      saveState: false
    }
  },
  methods: {
    toolSelected(value) {
      this.activeTool = value
    },
    handleState(value) {
      this.saveState = value
    }
  }
}
</script>

<style>
body {
  margin: 0;
  height: 100vh;
  width: 100vw;
}
#app {
  width: 100%;
  height: 100%;
}
.shape-editor {
  width: 100%;
  height: 100%;
  display: flex;
}
.toolbar-area {
  width: 60px;
  padding: 0 20px;
  text-align: center;
  background: #D0D0D0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.editor-area {
  width: calc(100% - 100px);
  height: 100%;
  background: #FFFFEE;
}
</style>
