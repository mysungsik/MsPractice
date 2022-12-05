class Base {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `hi ${this.name}`;
  }
}

class Derived extends Base {
  constructor(name) {
    super(name);
  }

  sayHi() {
    return `${super.sayHello()}`;
  }
}

const ms = new Derived("ms");

console.log(ms.sayHi());
