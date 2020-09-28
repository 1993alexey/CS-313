async function getItems() {
    return [
        {
            id: 1,
            title: 'iPhone 7',
            price: 150,
            description: 'My favorite phone'
        },
        {
            id: 2,
            title: 'iPhone 8',
            price: 150,
            description: 'This is the best phone ever'
        },
        {
            id: 3,
            title: 'iPhone X',
            price: 450,
            description: 'This is the best phone ever'
        },
        {
            id: 4,
            title: 'iPhone 11',
            price: 950,
            description: 'This is the best phone ever'
        }
    ]
}

async function getCart() {
    return [
        {
            id: 4,
            title: 'iPhone 11',
            price: 950,
            description: 'This is the best phone ever'
        }
    ]
}

async function saveCart(cart) {

}

async function checkout(address) {
    return {
        status: 200,
        body: [
            {
                id: 4,
                title: 'iPhone 11',
                price: 950,
                description: 'This is the best phone ever'
            }
        ]
    }
}

export {getItems, getCart, saveCart, checkout}