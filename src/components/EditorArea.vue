<template>
  <div @click="handleClick" @mousemove="handleMouseMove">
    <v-stage :config="stageSize" ref="stage">
      <v-layer>
        <v-line 
          v-for="(shape, index) in shapes"
          :key="'shape' + index"
          :config="shape"
          :draggable="isDraggable"
          @click="activeTool === 'selection' && shapeSelected(index)"
          @dragend="finalPosition($event, index)"
        />
        <template v-if="activeTool === 'closestPoints'">
          <v-circle 
            v-for="(dot, index) in dots"
            :key="'dot' + index"
            :config="dot"
          />
        </template>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
const width= window.innerWidth - 100
const height= window.innerHeight

export default {
  name: 'EditorArea',
  props: ['activeTool', 'saveState'],
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      stageSize: {
        width,
        height
      },
      isDraggable: false,
      currSelected: -1,
      shapeClicked: false,
      shapes: [],
      dots: []
    }
  },
  methods: {
    handleClick() { 
      if (this.activeTool === 'addTriangle' || 
          this.activeTool === 'addSquare' || 
          this.activeTool === 'addHexagon'
        )  { 
        let points
        if (this.activeTool === 'addTriangle') {
          points = [50, 0, 0, 100, 100, 100]
        }
        else if (this.activeTool === 'addSquare') {
          points = [0, 0, 0, 100, 100, 100, 100, 0]
        }
        else if (this.activeTool === 'addHexagon') {
          points = [50, 0, 0, 25, 0, 75, 50, 100, 100, 75, 100, 25]
        }
        this.shapes.push({
          x: this.mouseX - 50,
          y: this.mouseY - 50,
          points,
          closed: true,
          fill: '#D0D0D0',
          stroke: 'black',
          strokeWidth: 0,
          dash: [5, 5],
          dragBoundFunc: pos => {
            const newX = Math.max(0, Math.min(pos.x, width - 100))
            const newY = Math.max(0, Math.min(pos.y, height - 100))

            return { x: newX, y: newY }
          }
        })
        this.dots.push({
          x: this.mouseX,
          y: this.mouseY,
          fill: 'red',
          radius: 3
        })
      }
      if (this.activeTool === 'selection' && this.currSelected !== -1 && this.shapeClicked === false)
      {
        this.shapes[this.currSelected].strokeWidth = 0
        this.currSelected = -1
      }
      this.shapeClicked = false
    },
    shapeSelected(currIndex) {
      this.shapes.forEach((shape, index) => {
        if (index === currIndex && shape.strokeWidth === 0) {
          shape.strokeWidth = 1
          this.currSelected = currIndex
        } else {
          shape.strokeWidth = 0
        }
      })
      this.shapeClicked = true
    },
    handleMouseMove(event) {
      this.mouseX = event.clientX - 100;
      this.mouseY = event.clientY;
      this.dots.forEach((dot, index) => {
        let newX, newY
        let vertices = []
        this.shapes[index].points.forEach((_, ind) => {
          if(ind % 2 === 0)
            vertices.push({x: this.shapes[index].x + this.shapes[index].points[ind], y: this.shapes[index].y + this.shapes[index].points[ind+1]})
        })
        if (this.isPointInShape({x: this.mouseX, y: this.mouseY}, vertices)) {
          newX = this.mouseX
          newY = this.mouseY
        } else {
          const pos = this.getClosestPointOnBorder({x: this.mouseX, y: this.mouseY}, vertices);
          newX = pos.x 
          newY = pos.y 
        }
        dot.x = newX
        dot.y = newY 
      })
    },
    finalPosition(event, index) {
      this.shapes[index].x = event.target.x()
      this.shapes[index].y = event.target.y()
    },
    isPointInShape(point, shape) {
      let inside = false;
      for (let i = 0, j = shape.length - 1; i < shape.length; j = i++) {
        const pi = shape[i];
        const pj = shape[j];
        const intersect = ((pi.y > point.y) !== (pj.y > point.y)) &&
          (point.x < (pj.x - pi.x) * (point.y - pi.y) / (pj.y - pi.y) + pi.x);
        if (intersect) inside = !inside;
      }
      return inside;
    },
    getClosestPointOnBorder(point, shape) {
      let closestPoint = null;
      let closestDistance = Infinity;
      for (let i = 0, j = shape.length - 1; i < shape.length; j = i++) {
        const pi = shape[i];
        const pj = shape[j];
        const [px, py] = this.getClosestPointOnSegment(point, pi, pj);
        const distance = Math.sqrt((px - point.x) ** 2 + (py - point.y) ** 2);
        if (distance < closestDistance) {
          closestPoint = { x: px, y: py };
          closestDistance = distance;
        }
      }
      return closestPoint;
    },
    getClosestPointOnSegment(point, p1, p2) {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const t = ((point.x - p1.x) * dx + (point.y - p1.y) * dy) / (dx * dx + dy * dy);
      const px = p1.x + t * dx;
      const py = p1.y + t * dy;
      if (t < 0) return [p1.x, p1.y];
      if (t > 1) return [p2.x, p2.y];
      return [px, py];
    }
  },
  updated() {
    if (this.activeTool === 'move') {
      this.isDraggable = true
    }
    else {
      this.isDraggable = false
    }
    if(this.activeTool !== 'selection') 
    {
      if ( this.currSelected !== -1) {
        this.shapes[this.currSelected].strokeWidth = 0
        this.currSelected = -1
      }
    }
    if(this.saveState)
    {
      let stageJson = this.$refs.stage.getStage().toJSON()
      console.log(stageJson)
      this.$emit('saveTool', false)
    }
  }
}
</script>

<style scoped>

</style>