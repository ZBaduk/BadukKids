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

export const themes = [catsAndBirds, bunniesAndCarrots, cowsAndMilk];