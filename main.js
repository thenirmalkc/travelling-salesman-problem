const { pow, sqrt } = Math;
const width = 600;
const height = 600;


let no_of_cities = 7;
let cities = [];
let order = [];
let best_order;
let min_dist = Infinity;

let current_permutation;
let total_permutation;


function setup() {
	const canvas = createCanvas(width, height);
  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);

	background(40);

  for(let i = 0; i < no_of_cities; i ++) {
    cities.push({x: floor(random(width - 100)) + 50, y: floor(random(height - 100)) + 50});
    order.push(i);
  }

  current_permutation = 0;
  total_permutation = calc_factorial(no_of_cities);
}


function draw() {
  background(40);

  // checking if current order of cities is best order or not
  const current_dist = calc_dist(cities, order);
  if(current_dist < min_dist) {
    min_dist = current_dist;
    best_order = [...order];
  }

  // displaying path
  stroke(255, 255, 255);
  strokeWeight(1)
  for(let i = 0; i < cities.length - 1; i ++)
    line(cities[order[i]].x, cities[order[i]].y, cities[order[i + 1]].x, cities[order[i + 1]].y);

  // displaying best path
  stroke(0, 255, 0);
  strokeWeight(4)
  for(let i = 0; i < cities.length - 1; i ++)
    line(cities[best_order[i]].x, cities[best_order[i]].y, cities[best_order[i + 1]].x, cities[best_order[i + 1]].y);

  // displaying cities
  noStroke();
  fill(255, 255, 255);
  for(let i = 0; i < cities.length; i ++)
    circle(cities[i].x, cities[i].y, 12);

  current_permutation ++;

  // calculating completion percentage
  const percentage_complete = current_permutation / total_permutation * 100

  // displaying completion percentage
  textSize(20);
  text(percentage_complete.toFixed(2) + ' % Completed !!', 20, height - 20);

  // evaluating next order
  lexicographic_order(order);
}


// calculates distance between 2 points
function calc_dist(cities, order) {
  let total_dist = 0;

  for(let i = 0; i < cities.length - 1; i ++) {
    total_dist += sqrt(pow(cities[order[i + 1]].x - cities[order[i]].x  , 2) + pow(cities[order[i + 1]].y - cities[order[i]].y , 2));
  }

  return total_dist;
}

// calculates factorial
function calc_factorial(value) {
  let factorial = 1;

  for(let i = 2; i <= value; i ++)
    factorial *= i;

  return factorial;
}


// evaluates next order
function lexicographic_order(order) {
  let lx = null; // largest x
  let ly = null; // largest y

  for(let i = 0; i < order.length - 1; i ++)
    if(order[i] < order[i + 1])
      lx = i;

  if(lx == null) {
    noLoop();
    return;
  }

  for(let i = 0; i < order.length; i ++)
    if(order[lx] < order[i])
      ly = i;

  swap(order, lx, ly);

  const temp = order.splice(lx + 1);
  temp.reverse();
  for(let i = 0; i < temp.length; i ++)
    order.push(temp[i]);

}


// swaps elements in array
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
