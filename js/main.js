var searchBtn = document.getElementById('search-btn');
var mealList = document.getElementById('meal');
var $mealContentDetails = document.querySelector('.meal-content-details');
var recipeCloseBtn = document.getElementById('close-btn');
var $searchBox = document.querySelector('.search-box');
var $noFood = document.querySelector('.noFood');

var $nameButton = document.querySelector('.search-by.name');
var $firstButton = document.querySelector('.search-by.first');
var $randomButton = document.querySelector('.search-by.random');
var $ingredientButton = document.querySelector('.search-by.ingredients');

$nameButton.addEventListener('click', function (event) {
  data.searchBy = 'name';
  $searchBox.setAttribute('placeholder', 'Search by name...');
});

$firstButton.addEventListener('click', function (event) {
  data.searchBy = 'first';
  $searchBox.setAttribute('placeholder', 'Search by first letter...');
});

$randomButton.addEventListener('click', function (event) {
  data.searchBy = 'random';
  mealListAll(data.searchBy);
});

$ingredientButton.addEventListener('click', function (event) {
  data.searchBy = 'ingredients';
});

searchBtn.addEventListener('click', function (event) {
  var count = mealList.childElementCount;
  for (var i = 0; i < count; i++) {
    var child = mealList.firstElementChild;
    mealList.removeChild(child);
  }
  $noFood.classList.add('hidden');
  mealListAll(data.searchBy);
});

mealList.addEventListener('click', recipeList);

recipeCloseBtn.addEventListener('click', () => {
  var count = $mealContentDetails.childElementCount;
  for (var i = 0; i < count; i++) {
    var child = $mealContentDetails.firstElementChild;
    $mealContentDetails.removeChild(child);
  }
  $mealContentDetails.parentElement.classList.remove('showRecipe');
});

function recipeList(e) {
  e.preventDefault();
  if (e.target.classList.contains('recipe-btn')) {
    var count = $mealContentDetails.childElementCount;
    for (var i = 0; i < count; i++) {
      var child = $mealContentDetails.firstElementChild;
      $mealContentDetails.removeChild(child);
    }
    var mealItem = e.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
      .then(res => res.json())
      .then(data => mealRecipeModal(data.meals));
  }
}
function mealRecipeModal(meal) {
  meal = meal[0];
  var recipe = '';
  for (var i = 1; i <= 20; i++) {
    var ingredientId = 'strIngredient' + i;
    var measureId = 'strMeasure' + i;
    if (meal[ingredientId] !== '' && meal[measureId] !== '') {
      recipe += meal[ingredientId] + ' ' + meal[measureId] + ' & ';
    }
  }
  recipe = recipe.slice(0, recipe.length - 3);

  var $h2 = document.createElement('h2');
  $h2.className = 'recipe-title';
  $h2.textContent = meal.strMeal;

  var $firstP = document.createElement('p');
  $firstP.className = 'recipe-cat';
  $firstP.textContent = meal.strCategory;

  var $firstDiv = document.createElement('div');
  $firstDiv.className = 'recipe-inst';

  var $firstH3 = document.createElement('h3');
  $firstH3.textContent = 'Ingredients';
  $firstDiv.appendChild($firstH3);

  var $secondP = document.createElement('p');
  $secondP.textContent = recipe;
  $firstDiv.appendChild($secondP);

  var $secondH3 = document.createElement('h3');
  $secondH3.textContent = 'Instructions';
  $firstDiv.appendChild($secondH3);

  var $thirdP = document.createElement('p');
  $thirdP.textContent = meal.strInstructions;
  $firstDiv.appendChild($thirdP);

  var $secondDiv = document.createElement('div');
  $secondDiv.className = 'recipe-img';

  var $image = document.createElement('img');
  $image.setAttribute('src', meal.strMealThumb);
  $image.setAttribute('alt', '');
  $secondDiv.appendChild($image);

  var $thirdDiv = document.createElement('div');
  $thirdDiv.className = 'recipe-link';

  var $a = document.createElement('a');
  $a.setAttribute('href', meal.strYoutube);
  $a.setAttribute('target', '_blank');
  $a.textContent = 'Watch Video';
  $thirdDiv.appendChild($a);

  $mealContentDetails.appendChild($h2);
  $mealContentDetails.appendChild($firstP);
  $mealContentDetails.appendChild($firstDiv);
  $mealContentDetails.appendChild($secondDiv);
  $mealContentDetails.appendChild($thirdDiv);

  $mealContentDetails.parentElement.classList.add('showRecipe');
}

function mealListAll(dataSearchBy) {
  var apiUrl;
  var searchInputTxt;
  switch (dataSearchBy) {
    case 'ingredients':
      searchInputTxt = document.getElementById('search-input').value.trim();
      apiUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=' + searchInputTxt;
      break;
    case 'name':
      searchInputTxt = document.getElementById('search-input').value.trim();
      apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchInputTxt;
      break;
    case 'first':
      searchInputTxt = document.getElementById('search-input').value.trim();
      apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?f=' + searchInputTxt;
      break;
    case 'random':
      apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
      break;
    default:
      return;
  }
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.meals) {
        for (var meal of data.meals) {
          var $firstDiv = document.createElement('div');
          $firstDiv.className = 'meal-item';
          $firstDiv.setAttribute('data-id', meal.idMeal);

          var $secondDiv = document.createElement('div');
          $secondDiv.className = 'meal-img';
          $firstDiv.appendChild($secondDiv);

          var $image = document.createElement('img');
          $image.setAttribute('src', meal.strMealThumb);
          $image.setAttribute('alt', 'food');
          $secondDiv.appendChild($image);

          var $thirdDiv = document.createElement('div');
          $thirdDiv.className = 'meal-name';
          $firstDiv.appendChild($thirdDiv);

          var $h2 = document.createElement('h2');
          $h2.textContent = meal.strMeal;
          $thirdDiv.appendChild($h2);

          var $a = document.createElement('a');
          $a.className = 'recipe-btn';
          $a.textContent = 'Get Recipe';
          $a.setAttribute('href', '#');
          $thirdDiv.appendChild($a);

          mealList.appendChild($firstDiv);
        }
      } else {
        $noFood.classList.remove('hidden');
      }
    });
}
