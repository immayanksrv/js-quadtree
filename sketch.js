let qtree;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  let boundary = new Rectangle(windowWidth / 2, windowHeight / 2, width / 2, windowHeight / 2);
  qtree = QuadTree.create();
  for (let i = 0; i < 1000; i++) {
    let x = randomGaussian(windowWidth / 2, windowWidth / 8);
    let y = randomGaussian(windowHeight / 2, windowHeight / 8);
    let p = new Point(x, y);
    qtree.insert(p);
  }
}

function draw() {
  background(0);

  let range = new Circle(mouseX, mouseY, 100);
  show(qtree, range);
  stroke("blue");
  ellipse(range.x, range.y, range.r * 2);

  let points = qtree.query(range);
  for (let p of points) {
    stroke(0, 255, 0);
    strokeWeight(4);
    point(p.x, p.y);

    if (mouseIsPressed) {
      let neighbors = qtree.closest(new Point(p.x, p.y), 8);
      stroke(255, 255, 0, 50);
      strokeWeight(2);
      for (let n of neighbors) {
        line(p.x, p.y, n.x, n.y);
      }
    }
  }
}

function show(qtree, range) {
  noFill();
  strokeWeight(1);
  rectMode(CENTER);
  stroke(255, 41);
  if (range.intersects(qtree.boundary)) {
    stroke(255);
  }
  rect(qtree.boundary.x, qtree.boundary.y, qtree.boundary.w * 2, qtree.boundary.h * 2);

  stroke(255);
  strokeWeight(2);
  for (let p of qtree.points) {
    point(p.x, p.y);
  }

  if (qtree.divided) {
    show(qtree.northeast, range);
    show(qtree.northwest, range);
    show(qtree.southeast, range);
    show(qtree.southwest, range);
  }
}