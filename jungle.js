// ANIMAL CLASS
class Animal {
  static remainingAnimals = 0;

  #name;
  #species;
  #energy;
  #isAlive = true;

  constructor(name, species, energy) {
    this.#name = name;
    this.#species = species;
    this.#energy = energy;

    if (energy > 0) {
      Animal.remainingAnimals++;
    }
  }

// Getters and Setters:
  get name() { return this.#name; }
  set name(value) { this.#name = value; }

  get species() { return this.#species; }
  set species(value) { this.#species = value; }

  get energy() { return this.#energy; }
  set energy(value) { this.#energy = Math.max(0, value); }

// attack method:
  attack(target, damage) {
    if (!this.#isAlive) {
      console.log(`${this.#name} has no energy and can't attack.`);
      return;
    }

    if (!target.#isAlive) {
      console.log(`${target.#name} is already out of energy.`);
      return;
    }

    this.energy -= damage;
    target.energy -= damage;

    console.log(`${this.#name} attacks ${target.name} for ${damage} damage!`);
    console.log(`${this.#name}'s energy: ${this.energy}`);
    console.log(`${target.name}'s energy: ${target.energy}`);

    this.#checkWinner(target);
  }

// eating method:
  eat(amount = 10) {
    if (!this.#isAlive) {
      console.log(`${this.#name} can't eat because it's out of energy.`);
      return;
    }
    this.energy += amount;
    console.log(`${this.#name} eats and gains ${amount} energy. Current energy: ${this.energy}`);
  }

// method if animal died:
  #checkWinner(target) {
    if (this.#energy === 0 && this.#isAlive) {
      this.#isAlive = false;
      Animal.remainingAnimals--;
      console.log(`${target.name} wins! ${this.#name} is out of energy!`);
    }

    if (target.energy === 0 && target.#isAlive) {
      target.#isAlive = false;
      Animal.remainingAnimals--;
      console.log(`${this.#name} wins! ${target.name} is out of energy!`);
    }
  }
}

// SUBCLASS: BIRD
class Bird extends Animal {
  #canFly;

  constructor(name, species, canFly = true) {
    super(name, species, 100);
    this.#canFly = canFly;
  }

// Getters and Setters:
  get canFly() { return this.#canFly; }
  set canFly(value) { this.#canFly = value; }

// Bird-specific method
  fly() {
    if (!this.#canFly) return console.log(`${this.name} can't fly.`);
    if (this.energy <= 0) return console.log(`${this.name} hasn't energy to fly.`);
    console.log(`${this.name} is flying!`);
  }

// Attack:
  attack(target) {
    if (this.energy <= 0) return console.log(`${this.name} hasn't energy and can't attack.`);
    console.log(`${this.name} swoops in to attack ${target.name}!`);
    super.attack(target, 20);
  }

  eat() {
    super.eat(10);
  }
}

// SUBCLASS: MAMMAL

class Mammal extends Animal {
  #furColor;

  constructor(name, species, furColor) {
    super(name, species, 200);
    this.#furColor = furColor;
  }

// Getters and Setters:
  get furColor() { return this.#furColor; }
  set furColor(value) { this.#furColor = value; }

// Attack:
  attack(target) {
    if (this.energy <= 0) return console.log(`${this.name} hasn't energy and can't attack.`);
    console.log(`${this.name} lunges to attack ${target.name}!`);
    super.attack(target, 50);
  }

  eat() {
    super.eat(20);
  }
}

// SUBCLASS: REPTILE
class Reptile extends Animal {
  #coldBlooded;

  constructor(name, species, coldBlooded = true) {
    super(name, species, 100);
    this.#coldBlooded = coldBlooded;
  }

// Getters and Setters:
  get coldBlooded() { return this.#coldBlooded; }
  set coldBlooded(value) { this.#coldBlooded = value; }

  isColdBlooded() {
    return this.#coldBlooded;
  }

// Attack:
  attack(target) {
    if (this.energy <= 0) return console.log(`${this.name} hasn't energy and can't attack.`);
    console.log(`${this.name} strikes to attack ${target.name}!`);
    super.attack(target, 30);
  }

  eat() {
    super.eat(15);
  }
}

// DRIVER CODE

const eagle = new Bird("Eagle", "Bird of Prey", true);
console.log(`Name: ${eagle.name}, Species: ${eagle.species}, Can Fly: ${eagle.canFly}`);

const lion = new Mammal("Lion", "Big Cat", "Golden");
console.log(`Name: ${lion.name}, Species: ${lion.species}, Fur Color: ${lion.furColor}`);

const snake = new Reptile("Snake", "Serpent", true);
console.log(`Name: ${snake.name}, Species: ${snake.species}, Cold-Blooded: ${snake.isColdBlooded()}`);

console.log("\n--- Attacks ---");
eagle.attack(lion);
lion.attack(snake);
lion.attack(eagle);
eagle.attack(snake);

console.log(`\nRemaining animals with energy: ${Animal.remainingAnimals}`);

console.log("\n--- Eating ---");
eagle.eat();
eagle.eat();
eagle.eat();
eagle.eat();
eagle.eat();
eagle.eat();
eagle.eat();
snake.eat();
snake.eat();
snake.eat();
snake.eat();
lion.eat();
lion.eat();



console.log("\n--- More Attacks ---");
snake.attack(eagle);
eagle.attack(lion);
snake.attack(lion);

console.log(`\nRemaining animals with energy: ${Animal.remainingAnimals}`);

console.log("\n--- More Eating ---");
eagle.eat();
eagle.eat();
eagle.eat();
snake.eat();
snake.eat();
lion.eat();
lion.eat();

console.log("\n--- Final Attacks ---");
snake.attack(eagle);
lion.attack(eagle);
lion.attack(snake);

console.log(`\nFinal Remaining animals with energy: ${Animal.remainingAnimals}`);
