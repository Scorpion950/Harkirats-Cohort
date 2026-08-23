class rectangle{
    constructor(height, width,color)   {
        this.height = height;
        this.width = width;
        this.color = color;
    }
    area() {
        const area = this.height*this.width;
        return area;
    }
    paint() {
        console.log("Painting with color " + this.color);

    }
}

const rect = new rectangle(10,20,"red");
const rect1 = new rectangle(1,2,"orange");

const area = rect.area();
const area1 = rect1.area();

rect.paint();
rect1.paint();

console.log(area);
console.log(area1);
    
 