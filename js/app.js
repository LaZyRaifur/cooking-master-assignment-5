const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

//event listeners
searchBtn.addEventListener('click',getMealList);
mealList.addEventListener('click',getMealRecipe);
recipeCloseBtn.addEventListener('click',()=>{
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


//get meal list that matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(res => res.json())
    .then(data => {

        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt ="food">
                        </div>
                        <div class="meal-name d-flex justify-content-center">
                            <h3 class="recipe-btn">${meal.strMeal}</h3>
                        </div>

                    </div>         
                `;
            });
            mealList.classList.remove('notFound');
        }else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }
        mealList.innerHTML = html;
    });
}

//get mealRecipe
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){

        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(res=>res.json())
        .then(data => mealRecipeModel(data.meals));
    }
}

//create model
function mealRecipeModel(meal){
    console.log(meal);
    meal = meal[0];
    let html= `
        <div class="meal-item">
        
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
            </div>
            <div class="ingredients-style list-style recipe-title">
                <h2>${meal.strMeal}</h2>
                <p>Ingredients</p>
                
          
            
            
            <li><i class="fas fa-check-square"> ${meal.strMeasure1} ${meal.strIngredient1}</i></li>
            <li><i class="fas fa-check-square"> ${meal.strMeasure2} ${meal.strIngredient2}</i></li>
            <li><i class="fas fa-check-square"> ${meal.strMeasure3} ${meal.strIngredient3}</i></li>
            <li><i class="fas fa-check-square"> ${meal.strMeasure4} ${meal.strIngredient4}</i></li>
            <li><i class="fas fa-check-square"> ${meal.strMeasure5} ${meal.strIngredient5}</i></li>
            <li><i class="fas fa-check-square"> ${meal.strMeasure6} ${meal.strIngredient6}</i></li>
            </div>
            </div>

            </div>


    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}