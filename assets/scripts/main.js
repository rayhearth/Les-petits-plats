import recipes from './recipes.js'
import { RecipeCard } from './models/recipeCard.js'


//DOM
const recipesContainer = document.querySelector('#recettes')
const tags = document.querySelector('#tagsSelect')

//inputs
const ingredientFilter = document.querySelector('#ingredients-filter')
const applianceFilter = document.querySelector('#appliance-filter')
const ustensilFilter = document.querySelector('#ustensils-filter')

//app search listes
const ingLabel = document.querySelector('#ingL')
const ingSearch = document.querySelector('#ingredients')
const appLabel = document.querySelector('#appL')
const appSearch = document.querySelector('#appareils')
const ustLabel = document.querySelector('#ustL')
const ustSearch = document.querySelector('#ustensiles')

const principalSearch = document.querySelector('#search')

//ul
const resultIng = document.querySelector('.searchResult')
const listOfIngredients = document.querySelector('#ingredientsList')
const listOfUstensils = document.querySelector('#ustensilsList')
const listOfAppliances = document.querySelector('#applianceList')

const btnTags = document.querySelectorAll('.list-items')


//Création des Array
recipes: [] //array de toutes les recettes

/*traitement ing*/
let ing = recipes.map(i => i.ingredients.map(n => n.ingredient))
ing = ing + ''
//transforme string en array  
let ingData = ing.split(',')
//uniformise caract
const lowIngData = ingData.map(el => {
    return el.toLowerCase()
})
let ingredientsArray = [...new Set(lowIngData)] // array de tous les ingredients filtrés

/*traitement app*/
let app = recipes.map(a => a.appliance)
let appliancesArray = [...new Set(app)] //array de tous les appareils

/*traitement des ustensils*/
let ust = recipes.map(u => u.ustensils)
ust = ust + ','
let ustData = ust.split(',')
const lowUstData = ustData.map(el => {
    return el.toLowerCase()
})
let ustensilsArray = [...new Set(lowUstData)] // array de tous les ustenciles

// listeners Filters
ingredientFilter.addEventListener('click', (e) => {
    displayIngList()
})
applianceFilter.addEventListener('click', (e) => {
    displayAppList()
})
ustensilFilter.addEventListener('click', (e) => {
    displayUstList()
})


/*Affichage Liste Ing*/
const buildIngredientsList = (ingredient) => {
    return `<li class="list-items" data-type="ingredient">
    ${ingredient}</li>`
}

const displayIngList = (e) => {
    const ingList = ingredientsArray

    const renderAllIngredient = (ingredientsArray) => {
        let all = ''
        for (let ingredient of ingredientsArray) {
            all += buildIngredientsList(ingredient)
        }
        return all
    }
    ingLabel.classList.add('hidden')
    ingSearch.classList.remove('hidden')
    listOfIngredients.innerHTML = renderAllIngredient(ingList)
    listOfIngredients.style.display = ''
    listOfIngredients.setAttribute('aria-hidden', 'false')

    listOfAppliances.style.display = 'none'
    appLabel.classList.remove('hidden')
    appSearch.classList.add('hidden')

    listOfUstensils.style.display = 'none'
    ustLabel.classList.remove('hidden')
    ustSearch.classList.add('hidden')

    startTagsListener()
}
window.addEventListener('load', displayIngList)

/* Affichage Liste App*/
const buildApplianceList = (appliance) => {
    return `<li class="list-items" data-type="appliance">
        ${appliance}</li>`
}

const displayAppList = (e) => {
    const appList = appliancesArray

    const renderAllAppliance = (appliancesArray) => {
        let all = ''
        for (let appliance of appliancesArray) {
            all += buildApplianceList(appliance)
        }
        return all
    }
    appLabel.classList.add('hidden')
    appSearch.classList.remove('hidden')
    listOfAppliances.innerHTML = renderAllAppliance(appList)
    listOfAppliances.style.display = ''
    listOfAppliances.setAttribute('aria-hidden', 'false')


    listOfIngredients.style.display = 'none'
    ingLabel.classList.remove('hidden')
    ingSearch.classList.add('hidden')

    listOfUstensils.style.display = 'none'
    ustLabel.classList.remove('hidden')
    ustSearch.classList.add('hidden')

    startTagsListener()
}
window.addEventListener('load', displayAppList)


/*Affichage Liste Ust*/
const buildUstensilList = (ustensil) => {
    return `<li class="list-items" data-type="ustensil">
    ${ustensil}</li>`
}

const displayUstList = (e) => {
    const ustList = ustensilsArray

    const renderAllUstensils = (ustensilsArray) => {
        let all = ''
        for (let ustensil of ustensilsArray) {
            all += buildUstensilList(ustensil)
        }
        return all
    }
    ustLabel.classList.add('hidden')
    ustSearch.classList.remove('hidden')
    listOfUstensils.innerHTML = renderAllUstensils(ustList)
    listOfUstensils.style.display = ''
    listOfUstensils.setAttribute('aria-hidden', 'false')
    listOfIngredients.style.display = 'none'
    ingLabel.classList.remove('hidden')
    ingSearch.classList.add('hidden')

    listOfAppliances.style.display = 'none'
    appLabel.classList.remove('hidden')
    appSearch.classList.add('hidden')

    startTagsListener()
}
window.addEventListener('load', displayUstList)



let selectedTags = []
let selectedIngredients = []
let selectedApplainces = []
let selectedUstensils = []
let selectedRecipes = []

const renderTags = (currentTag) =>{
    return `
        <h3>${currentTag}</h3>
        <button class="tagBtn">
            <img src="./assets/img/clTag.svg" alt="">
        </button>`
}

const displayTags = (e) => {
    //cible endroit où tags select seront insérés
    tags.classList.add('.tagselected')
    tags.style.display = ''

    let currentTag = e.target
    console.log(currentTag)

    tags.innerHTML = renderTags(currentTag)
    // tags.innerHTML = renderTags(tagContainer)
}

const startTagsListener = () => {
    selectedTags = document.querySelectorAll('.list-items')//on recupere tous nos li
    // console.log(selectedTags)
    for (let t of selectedTags) {
        t.addEventListener('click', displayTags)
    }
}
window.addEventListener('load', displayTags)

//on injecte le html du render recipe ds notre section recette
const displayRecipes = () => {

    const container = recipes.map(r => new RecipeCard(r))
    // console.log(container)
    const renderAllRecipes = (recipes) => {
        let all = ''
        // console.log(all)
        for (let recipe of recipes) {
            all += recipe.renderRecipe()
            // console.log(all)
        }
        return all

    }
    recipesContainer.innerHTML = renderAllRecipes(container)
}

window.addEventListener('load', displayRecipes)

