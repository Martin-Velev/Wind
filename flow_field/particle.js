function Particle(pos, color) {
  this.pos = pos
  this.vel = createVector(random(),random())
  this.acc = createVector(0,0)
  this.color = color
  this.maxspeed = 1

  this.prevPos = this.pos.copy()

  this.update = function(){
    this.vel.add(this.acc)
    this.vel.limit(this.maxspeed)
    this.pos.add(this.vel)
    this.acc.mult(0)
  }

  this.applyForce = function(force){
    this.acc.add(force)
  }

  this.display = function(){
    if(isShowField){
      strokeWeight(4)
      stroke(this.color.x,this.color.y,this.color.z)
    }else{
      strokeWeight(2)
      stroke(this.color.x,this.color.y,this.color.z, 10)
    }
    line(this.pos.x, this.pos.y, this.prevPos.x,this.prevPos.y)
    this.prevPos = this.pos.copy()
    // point(this.pos.x, this.pos.y)
    strokeWeight(1)
  }

  this.edges = function(){
    if(this.pos.x > width - scl){
      this.pos.x = 0
    }
    if(this.pos.x <0){
      this.pos.x = width - scl
    }
    if(this.pos.y > height){
      this.pos.y = 0
    }
    if(this.pos.y < 0){
      this.pos.y = height
    }
  }

  this.follow = function(flowfileld){
    var x = floor(this.pos.x / scl)
    var y = floor(this.pos.y / scl)

    var index = x + y * cols
    var force = flowfileld[index]
    this.applyForce(force)
  }

}
