// محاكاة بيانات المنتجات
const products = Array.from({ length: 100 }, (v, i) => ({
    id: i + 1,
    name: `منتج ${i + 1}`,
    description: `وصف المنتج ${i + 1}`,
    price: (i + 1) * 10,
    image: `https://via.placeholder.com/150?text=منتج+${i + 1}`
}));

// عرض المنتجات في الصفحة الرئيسية
function loadProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>السعر: $${product.price}</p>
            <a href="product.html?id=${product.id}">عرض التفاصيل</a>
        </div>
    `).join('');
}

// عرض تفاصيل المنتج
function loadProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product = products.find(p => p.id == productId);

    if (product) {
        const productDetails = document.getElementById('product-details');
        productDetails.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>السعر: $${product.price}</p>
            <button onclick="addToCart(${product.id})">أضف إلى السلة</button>
        `;
    }
}

// إضافة المنتج إلى السلة
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('تم إضافة المنتج إلى السلة');
}

// عرض عناصر السلة
function loadCartItems() {
    const cartItems = document.getElementById('cart-items');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.innerHTML = '';

    cart.forEach(productId => {
        const product = products.find(p => p.id == productId);
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>السعر: $${product.price}</p>
            </div>
        `;
    });
}

// إتمام الشراء
function checkout() {
    localStorage.removeItem('cart');
    alert('تم إتمام الشراء بنجاح');
}

// البحث عن المنتجات
function searchProducts() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
    );

    const productList = document.getElementById('product-list');
    productList.innerHTML = filteredProducts.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>السعر: $${product.price}</p>
            <a href="product.html?id=${product.id}">عرض التفاصيل</a>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('index.html')) {
        loadProducts();
    } else if (window.location.pathname.endsWith('product.html')) {
        loadProductDetails();
    } else if (window.location.pathname.endsWith('cart.html')) {
        loadCartItems();
    }
});
