let input, button, greeting;
let submit_remove = 0;
let canvas;
let gifLength = 5;

let started = 0;

let master_text = "";
let text_size = 60;

var num=1000;
let pos= new Array(num);
let vel= new Array(num);
let c = new Array(num);
var aux=0;

function setup() {

   var p5Canvas = createCanvas(windowWidth, windowHeight-10);
   canvas = p5Canvas.canvas;

   textAlign(CENTER,CENTER);
   textSize(200);
    strokeWeight(1);
    colorMode(HSB, random(360), 100, 100, 100);
    frameRate(30);
    background(0, 0, 0);
    for (var i=0; i<num; i=i+1) {
      pos[i]=new p5.Vector(720/2, 720/2);
      var r=7;
      var angle=random(360);
      var theta=radians(angle);
      var x=cos(theta)*r*cos(i);
      var y=sin(theta)*r;
      vel[i]=new p5.Vector(x, y);
      c[i]=color((aux%5)*50, 80, 50);
      aux++;
    }

    run_particles();
}


function save_photo(){
     save('pix.jpg');
}

function save_video(){
	if(started != 1){
	 capturer.start();
	 started = 1;
	 console.log("Starting to save");
 }

draw() ;
}

let count = 0;
function draw() {

  fill(0, 0, 0, 12);
  noStroke();
  rect(-1, -1, width+1, height+1);

   for (var i=0; i<num; i=i+1) {
    fill(c[i]);
    noStroke();
    pos[i].add(vel[i]);
    ellipse(pos[i].x, pos[i].y, 7, 7);

  }

 fill(255,0,100);
    blendMode(DIFFERENCE);

 //blendMode(DIFFERENCE);
 // text("Taylor",width/2,height/2);
  //fill(255,0,100);
  blendMode(NORMAL);
 //stroke(0);

 // let the user change the text size with the up and down arrow
   if (keyIsDown(UP_ARROW)) {
       if(text_size < 510){
         text_size += 20;
       }
    }

    if (keyIsDown(DOWN_ARROW)) {
      if(text_size > 20){
        text_size -= 20;
      }
    }

textSize(text_size);
  text(master_text,width/2,height/2);

//needed for capturing the screen
	if(started === 1 && count < 50){
		//capturer.start();

		capturer.capture(canvas);
		count++;
		console.log("started to capture");

	}else if (started === 1) {

		capturer.stop();
	 capturer.save();
	 started = 0;
	 count = 0;
	 console.log("done");
	}


}

function mouseClicked() {
  run_particles();
  console.log("Here");
}


//add this function make the text be dynamic
function keyReleased() {
 if (keyCode==8) {
   if (master_text.length>0) {
      master_text = master_text.substring(0, master_text.length-1);
   }
 }
 else if (keyCode>=65 && keyCode<=90 || keyCode==32 || keyCode==54) {
   master_text += str(key);
 }else if(keyCode == ENTER || keyCode == RETURN){
   console.log("hi");
   master_text = master_text + " " + master_text;
 }
}


function run_particles(){
  colorMode(HSB, random(360), random(100), 100, 100);

  for (var i=0; i<num; i=i+1) {
    pos[i]=new p5.Vector(mouseX, mouseY);
    var r=7;
    var angle=random(360);
    var theta=radians(angle);
    var x=cos(theta)*r*cos(i);
    var y=sin(theta)*r;
    vel[i]=new p5.Vector(x, y);
    c[i]=color((aux%5)*50, 80, 90);
    aux++;
  }

}
