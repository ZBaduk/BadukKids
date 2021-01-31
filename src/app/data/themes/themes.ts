export interface GobanTheme {
  name: string,
  blackPath: string,
  whitePath: string,
  markerPath: string,
}

const catsAndBirds = {
  name: "Cats and birds",
  blackPath: "cat.svg",
  whitePath: "bird.svg",
  markerPath: "flower.svg",
}

const bunniesAndCarrots = {
  name: "Bunnies and carrots",
  blackPath: "bunny.svg",
  whitePath: "carrot.svg",
  markerPath: "flower.svg",
}

const cowsAndMilk = {
  name: "Cows and milk",
  blackPath: "cow.svg",
  whitePath: "milk.svg",
  markerPath: "flower.svg"
}

const owlsAndWorms = {
  name: "Owls and worms",
  blackPath: "owl.svg",
  whitePath: "worm.svg",
  markerPath: "flower.svg"
}

const frogsAndBugs = {
  name: "Frogs and bugs",
  blackPath: "frog.svg",
  whitePath: "bug.svg",
  markerPath: "flower.svg"
}

const pigsAndWolves = {
  name: "Pigs and wolves",
  blackPath: "pig.svg",
  whitePath: "wolf.svg",
  markerPath: "flower.svg"
}

const carsAndBarriers = {
  name: "Cars and barriers",
  blackPath: "barrier.svg",
  whitePath: "car.svg",
  markerPath: "flower.svg"
}

export const themes = [catsAndBirds, bunniesAndCarrots, cowsAndMilk, owlsAndWorms, frogsAndBugs, pigsAndWolves, carsAndBarriers];

export function randomTheme(): GobanTheme {
  const index = getRandomInt(themes.length);
  return themes[index];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
