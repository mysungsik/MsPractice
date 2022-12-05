class myClass {
  constructor(name) {
    this.name = name;
  }

  getName() {
    console.log(this.name);
  }

  static sayHello() {
    console.log("hello" + this.name);
  }
}

const ms = new myClass("no");
ms.getName();
myClass.sayHello();
