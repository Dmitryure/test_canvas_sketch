const canvasSketch = require('canvas-sketch');
const palettes = require('nice-color-palettes/1000.json')
const random = require('canvas-sketch-util/random')
const {lerp} = require('canvas-sketch-util/math')

let palette = random.pick(palettes);

palette = random.shuffle(palette);
palette = palette.slice(0, random.rangeFloor(2, palette.length + 1));

const settings = {
  dimensions: [ 1024, 1024 ],
  animate: true,
};

let arr = []

createObjs = (amount) => {
  for (let i = 0; i < amount; i++) {
    for (let j = 0; j < amount; j++) {
      let obj = {}
      obj.color = random.pick(palette)
      obj.u = i / (amount - 1)
      obj.v = j / (amount - 1)
      obj.radius = Math.abs(30)
      arr.push(obj)
    }
  }
}

createObjs(10)

// arr.filter(() => Math.random() > 0.9)

expandObjs = (objs) => {
  console.log(objs)
  for (let i = 0; i < objs.length; i++) {
    objs[i].radius = objs[i].radius >= 2 ? objs[i].radius + random.range(-2, 0) : random.range(1, 30)
  }
  // console.log(objs[0].radius)
}

let fps = 24

const sketch = () => {
  return ({ context, width, height }) => {
    const margin = width * 0.175;
    // context.fillStyle = 'black'
    // console.log(context)
    arr.forEach(data => {
      const {u, v, color, radius} = data
      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)
      context.beginPath()
      context.arc(x, y, radius, 0, 2 * Math.PI)
      context.fillStyle = color;
      context.fill();
      context.fillStyle = 'white'
      context.fill()
    })
  };
};



canvasSketch(sketch, settings)

setInterval(() => {
  expandObjs(arr)
  // canvasSketch(sketch, settings)
}, 1000/fps/2)