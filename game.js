let points = 0;

function addPoints(x){
  points += x;
  localStorage.setItem("points", points);
}

function getPoints(){
  return localStorage.getItem("points") || 0;
}
