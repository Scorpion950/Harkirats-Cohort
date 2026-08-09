interface People{
    name: string,
    age:number,
    // greet(): string
}

let person: People = {
    name: "John",
    age: 30,
    // greet() {
    //     return "Hello";
    // }
}



class Manager implements People {
    name: string;
    age: number;
    number: string;

    constructor (name: string, age: number){
        this.name = name;
        this.age = age;
        this.number = "123123";
    }
}
