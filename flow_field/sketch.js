var inc = 0.1
var scl = 10
var cols, rows
var zoff
var moving
var showField
var particles = []
var flowfield

function setup(){
  createCanvas(700, 400)


  cols = floor(width/scl) -1
  rows = floor(height/scl)
  flowfield = new Array(cols * rows)
  zoff = 0
  red = createSlider(0,255,0)
  red.position(width + 10, 20)
  green = createSlider(0,255,0)
  green.position(width + 10, 60)
  blue = createSlider(0,255,0)
  blue.position(width + 10, 100)

  moving = true
  moving = createButton("Field Movement")
  moving.mousePressed(flipMoving)
  moving.position(width +10, 150)

  isShowField = false
  showField = createButton("Show field ")
  showField.mousePressed(flipShow)
  showField.position(width + 10, 190)

  red_label = createDiv("Red")
  red_label.position(width +10,0)
  red_label = createDiv("Green")
  red_label.position(width +10,45)
  red_label = createDiv("Blue")
  red_label.position(width +10, 85)




  background(255)
}

function draw(){
  if(isShowField){
    background(255)
  }
  var color = createVector(red.value(),green.value(),blue.value())
  fill(color.x,color.y,color.z)
  rect(width-10,0,20,height)
  var yoff = 0;
  for (var y = 0; y < rows; y++){
    var xoff = 0;
    for (var x = 0; x<cols; x++){

      flowfield[index] = v

      var angle = noise(xoff,yoff,zoff) * TWO_PI *2
      var v = p5.Vector.fromAngle(angle)
      // v.setMag(0.1)
      var index = (x + y *cols);
      xoff += inc;
      stroke(0, 50)
      push()
      translate(x * scl, y * scl)
      rotate(v.heading())
      if(isShowField){
        line(0,0,scl,0)
      }
      pop()
    }
    yoff+=inc;
  }


  if(moving){
    zoff += 0.03
  }

  if(mouseIsPressed && mouseX < width-scl && mouseY < height){
    var pos = createVector(mouseX,mouseY)
    particles.push(new Particle(pos, color))
  }

  if(particles[0] != null){
    for(var i = 0; i< particles.length; i++){
      particles[i].follow(flowfield)
      particles[i].update()
      particles[i].display()
      // particles[i].edges()
    }
  }
}

function flipMoving(){
  moving = !moving
}

function flipShow(){
  isShowField = !isShowField
  background(255)
}
