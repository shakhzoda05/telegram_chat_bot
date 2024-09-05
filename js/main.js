const botToken = "7404943937:AAFJ6ukRj7BarDs06IoleimmdGZuviKzJRA";
const chatId = "-1002211526880";

fetch("https://dummyjson.com/products")
  .then((response) => response.json())
  .then((data) => {
    let productsContainer = document.getElementById("products");

    data.products.forEach((product) => {
      let productCard = `
        <div class="bg-orange-50 rounded-lg shadow-lg product-card p-4 flex flex-col justify-between">
          <img src="${product.thumbnail}" alt="${product.title}" class="h-48 w-full object-cover rounded-t-lg">
          <div class="p-4">
            <h3 class="text-xl font-bold text-gray-800 mb-2">${product.title}</h3>
            <p class="text-gray-600 mb-4">${product.description}</p>
            <p class="text-lg font-semibold text-gray-900 mb-4">${product.price} USD</p>
            <button onclick="orderProduct(${product.id}, '${product.title}', '${product.thumbnail}')" class="bg-orange-400 hover:bg-orange-600 text-white w-full font-bold text-[20px] font-bold py-2 px-4 rounded">Order</button>
          </div>
        </div>
      `;
      productsContainer.innerHTML += productCard;
    });
  });

function orderProduct(productId, productTitle, productThumbnail) {
  fetch(`https://dummyjson.com/products/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      const message = `🛒 Mahsulot nomi: ${product.title}\n💵 Narxi: ${product.price} USD\n📝 Batafsil: ${product.description}`;

      fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          photo: productThumbnail,
          caption: message,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.ok) {
            alert("Mahsulot Telegram kanaliga yuborildi!");
          } else {
            alert("Xatolik yuz berdi!");
          }
        })
        .catch((error) => {
          console.error("Xato:", error);
        });
    });
}
