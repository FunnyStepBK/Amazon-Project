
class Car {
  #brand;
  #model;
  speed = 0;
  isMoving;
  isTrunkOpen = false;

  constructor (carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo () {

    if (this.type === 'Race car') {    
    console.log(`Brand: ${this.#brand} Model: ${this.#model}, Speed: ${this.speed} km/hr isTrunkOpen: Race cars don't have trunk Stupid.`);
    } else if (!this.type) {
      console.log(`Brand: ${this.#brand} Model: ${this.#model}, Speed: ${this.speed} km/hr isTrunkOpen: ${this.isTrunkOpen}`);
    }
    
  }

  go () {
    if (this.isTrunkOpen) {
      console.log('Cannot start the car the trunk is open.');
      return;
    }
    if (this.speed >= 0 && this.speed <= 195) {
      this.speed += 5;
      this.isMoving = true;
    } else {
      console.log('Cannot Pass or reduce the speed limit.');
      return;
    }
  }

  break () {
    if (this.speed === 0) {
      console.log('Breaks were applied but the car is not moving.')
      return;
    }
    this.speed -= 5;
    if (this.speed === 0) {
      this.isMoving = false;
    }
  }

  stop () {
    this.speed = 0;
    this.isMoving = false;
  }

  openTrunk () {
    if (this.isMoving) {
      console.log('Cannot open the trunk the Car is moving.');
      return;
    }
    this.isTrunkOpen = true;
    this.speed = 0;
  }

  closeTrunk () {
    this.isTrunkOpen = false;
  }
  
}

class RaceCar extends Car {
  
  #accelerationValue;
  #deAccelerationVlaue;
  type;

  constructor (carDetails) {
    super(carDetails);
    this.#accelerationValue = carDetails.accelerationValue;
    this.#deAccelerationVlaue = carDetails.deAccelerationVlaue;
    this.type = carDetails.type;
  }

  go () {
    if (this.speed >= 0 || this.speed <= 280) {
      this.speed += this.#accelerationValue;
    } else {
      console.log('Cannot Pass or reduce the speed limit.');
      return;
    }
  }

  break () {
    if (this.speed === 0) {
      console.log('Break was applied but the car is not moving.')
      return;
    }
    this.speed -= this.#deAccelerationVlaue;
    if (this.speed === 0) {
      this.isMoving = false;
    }
  }

}


const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla'
});

const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3'
});

const raceCar1 = new RaceCar({
  brand: 'Mclaren',
  model: 'F1',
  accelerationValue: 20,
  deAccelerationVlaue: 10,
  type: 'Race car'
});

car1.openTrunk();
car1.closeTrunk();

car1.go();
car1.go();
car1.go();

car1.stop();

car1.openTrunk();


car2.go();
car2.go();
car2.go();
car2.break()

raceCar1.go();
raceCar1.go();
raceCar1.go();

raceCar1.break();
raceCar1.break();
raceCar1.break();

// raceCar1.stop();

car1.displayInfo();
car2.displayInfo();
raceCar1.displayInfo();
