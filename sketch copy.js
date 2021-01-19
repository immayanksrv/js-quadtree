let qt;
function setup(){
  createCanvas(400,400);
  let  boundary = new Rectangle(200,200,200,200);
   qt= new QuadTree(boundary,4);
   qt.show();
  console.log(qt);

  for ( let i = 0 ; i < 9 ; i++){
    let p= new Point(random(width),random(height));
    qt.insert(p);
 
  }
  background(0);
  qt.show();



  
}

function draw(){
  if(mouseIsPressed){
    let m = new Point (mouseX,mouseY);
    qt.insert(m);
  }
  background(0);
  qt.show();
}


