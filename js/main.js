var searchBtn = document.getElementById('search-btn');
var mealList = document.getElementById('meal');
var $mealContentDetails = document.querySelector('.meal-content-details');
var recipeCloseBtn = document.getElementById('close-btn');

searchBtn.addEventListener('click', mealLists);
mealList.addEventListener('click', recipeList);
recipeCloseBtn.addEventListener('click', () => {
  $mealContentDetails.parentElement.classList.remove('showRecipe');
});

// function foodData() {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast' + name);
//   xhr.responseType = 'json';
//   xhr.send();
//   xhr.addEventListener('load', function () {
//     if(data.meals !== null) {
//       $not
//     }else{

function mealLists() {
  var searchInputTxt = document.getElementById('search-input').value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
      var html = '';
      if (data.meals) {
        data.meals.forEach(meal => {
          html += `
                    <div class="meal-item" data-id = "${meal.idMeal}">
                    <div class="meal-img">
                    <img src="${meal.strMealThumb}" alt="food">
                    </div>
                    <div class="meal-name">
                    <h2>${meal.strMeal}</h2>
                    <a href="#" class="recipe-btn">Get Recipe</a>
                    </div>
                    </div>
                `;
        });
        mealList.classList.remove('notFound');
      } else {
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add('notFound');
      }

      mealList.innerHTML = html;
    });
}

function recipeList(e) {
  e.preventDefault();
  if (e.target.classList.contains('recipe-btn')) {
    var mealItem = e.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
      .then(res => res.json())
      .then(data => mealRecipeModal(data.meals));
  }
}

function mealRecipeModal(meal) {
  meal = meal[0];
  var html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
          <p class="recipe-cat">${meal.strCategory}</p>
          <div class="recipe-inst">
          <h3>Ingredients</h3>
            <p>${meal.strIngredient}</p>
          <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
          </div>
          <div class="recipe-img">
            <img src="${meal.strMealThumb}" alt="">
          </div>
          <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
          </div>
    `;
  $mealContentDetails.innerHTML = html;
  $mealContentDetails.parentElement.classList.add('showRecipe');
}
