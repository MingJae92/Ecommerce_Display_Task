const apiUrl = "https://uwp-test-store.myshopify.com/products.json";

const fetchStoreItems = async () => {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data.products;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

const createProductCard = ({ title, images, variants, tags }) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const addImage = () => {
    if (images && images.length > 0 && images[0].src) {
      const genderText = document.createElement("span");
      genderText.classList.add("gender-text");
      genderText.textContent = "GENDER";
      genderText.style.padding = "8px";
      card.appendChild(genderText);

      const { src, alt = title } = images[0];
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      card.appendChild(img);
    }
  };

  const addElement = (element, textContent, className) => {
    if (textContent !== undefined) {
      const el = document.createElement(element);
      el.textContent = textContent;
      if (className) {
        el.classList.add(className);
        if (className === "tags") {
          // Create shop-now-container within the tags container
          const shopNowContainer = document.createElement("div");
          shopNowContainer.classList.add("shop-now-container");

          const shopNowText = document.createElement("span");
          shopNowText.classList.add("shop-now-text");
          shopNowText.textContent = "SHOP NOW";
          shopNowText.style.backgroundColor = "#DAA520";
          shopNowText.style.color = "#FFF";
          shopNowText.style.padding = "8px";

          shopNowContainer.appendChild(shopNowText);
          card.appendChild(shopNowContainer);
        }
      }
      card.appendChild(el);
    }
  };

  addImage();
  addElement("h3", title);
  addElement("div", variants?.[0]?.price, "price");
  addElement("div", tags ? `Tags: ${tags.join(", ")}` : undefined, "tags");

  return card;
};

const renderStoreItemsCards = async () => {
  try {
    const productContainer = document.getElementById("productContainer");
    const products = await fetchStoreItems();

    if (products) {
      products.forEach((product) => {
        const card = createProductCard(product);

        // Append the card to the product container
        productContainer.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Error rendering product cards:", error.message);
  }
};

document.addEventListener("DOMContentLoaded", renderStoreItemsCards);
