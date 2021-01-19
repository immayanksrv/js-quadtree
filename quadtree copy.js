class Point {
    constructor(x,y){
        this.x=x;
        this.y=y;
    }

}

class Rectangle{
    constructor(x,y,w,h){
     this.x=x;
     this.y=y;
     this.h=h;
     this.w=w;
    }

    contains(point) {
        return (point.x >= this.x - this.w &&
          point.x <= this.x + this.w &&
          point.y >= this.y - this.h &&
          point.y <= this.y + this.h);
      }
    
}

class QuadTree{

    constructor(boundary,n){
        this.boundary = boundary;
        this.capacity = n;
        this.points=[];
        this.divided =false;

    }

    subdivide(){
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w / 2;
        let h = this.boundary.h / 2;
    
        let ne = new Rectangle(x + w, y - h, w, h);
        this.northeast = new QuadTree(ne, this.capacity);
        let nw = new Rectangle(x - w, y - h, w, h);
        this.northwest = new QuadTree(nw, this.capacity);
        let se = new Rectangle(x + w, y + h, w, h);
        this.southeast = new QuadTree(se, this.capacity);
        let sw = new Rectangle(x - w, y + h, w, h);
        this.southwest = new QuadTree(sw, this.capacity);
    
        this.divided = true;
    }

    insert(point){
        if (!this.boundary.contains(point)) {
            return false;
          }
      
          if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
          }
      
          if (!this.divided) {
            this.subdivide();
          }
      
          return (this.northeast.insert(point) || this.northwest.insert(point) ||
            this.southeast.insert(point) || this.southwest.insert(point));
        }


    show(){
        stroke(255);
        noFill();
        rectMode(CENTER)
        rect(this.boundary.x,this.boundary.y,this.boundary.w*2,this.boundary.h*2);
        if(this.divided){
            this.northwest.show();
            this.northwest.show();
            this.southeast.show();
            this.southwest.show();
        }
        for(let p of this.points){
            strokeWeight(4);
            point(p.x,p.y);
        }
    }
}