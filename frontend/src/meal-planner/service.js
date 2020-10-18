export function getPlan() {
    return fetch('/api/mealPlanner/getPlan').then(res => res.json())
}

export function getRecipes() {
    return fetch('/api/mealPlanner/getRecipes').then(res => res.json())
}

export function savePlan(plan) {

}

export function addRecipe(recipe) {

}


async function getItems() {
    return fetch('/api/assignment03/getItems').then(res => res.json())
}

async function getCart() {
    return fetch('/api/assignment03/getCart').then(res => res.json())
}

async function saveCart(cart) {
    fetch('/api/assignment03/saveCart', {
        method: 'POST',
        body: JSON.stringify(cart)
    })
}

async function checkout(address) {
    return fetch('/api/assignment03/checkout', {
        method: 'POST',
        body: JSON.stringify(address)
    }).then(res => {
        if (!res.ok)
            throw new Error('Checkout endpoint returned 400 error')
        return res.json()
    })
}