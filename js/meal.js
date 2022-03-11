document.getElementById('alert-message').style.display = 'none';
const loadSearch = async () => {
  const searchInput = document.getElementById('search-input');
  const searchText = searchInput.value;
  searchInput.value = '';
  if (searchText == '') {
    document.getElementById('alert-message').style.display = 'block';
  }
  else {
    document.getElementById('meal-details').textContent = '';
    document.getElementById('alert-message').style.display = 'none';
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    const response = await fetch(url);
    const data = await response.json();
    displayResult(data.meals);
  }
}
const displayResult = meals => {
  if (meals == null) {
    document.getElementById('alert-message').style.display = 'block';
  }
  else {
    const resultContainer = document.getElementById('result-container');
    resultContainer.textContent = '';
    meals.forEach(meal => {
      const div = document.createElement('div');
      div.classList.add('leading-6', 'p-5', 'rounded-xl', 'bg-green-200');
      div.setAttribute('onclick', `loadDetails('${meal.idMeal}')`);
      div.innerHTML = `
    <div>
        <img class="w-full rounded-xl"
          src="${meal.strMealThumb}"
          alt="">
      </div>
      <h2 class="text-3xl font-semibold my-2">${meal.strMeal}</h2>
      <p class="font-semibold">${meal.strInstructions.slice(0, 200)}</p>
    `
      resultContainer.appendChild(div);
    })
  }
}
const loadDetails = async mealId => {
  console.log(mealId);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.meals[0]);
}
const displayDetails = meal => {
  const mealDetails = document.getElementById('meal-details');
  mealDetails.innerHTML = `
  <div>
      <img class="rounded-xl"
        src="${meal.strMealThumb}"
        alt="">
    </div>
    <h2 class="text-3xl font-semibold my-2">${meal.strMeal}</h2>
    <ul class="text-gray-700">
      <li>${meal.strIngredient1}</li>
      <li>${meal.strIngredient2}</li>
      <li>${meal.strIngredient3}</li>
      <li>${meal.strIngredient4}</li>
      <li>${meal.strIngredient5}</li>
      <li>${meal.strIngredient6}</li>
    </ul>
  `
}