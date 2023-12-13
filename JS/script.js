const apiUrl = "https://uwp-test-store.myshopify.com/products.json";

const fetchStoreItems = async () => {
  try {
    const response = await fetch(apiUrl);
    console.log("API Response:", response);
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
      genderText.style.backgroundColor = "#DAA520";
      genderText.style.padding = "8px";
      card.appendChild(genderText);

      const { src, alt = title } = images[0];
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      card.appendChild(img);
    }
  };

  addImage();

  const addElement = (element, textContent, className) => {
    if (textContent !== undefined) {
      const el = document.createElement(element);
      el.textContent = textContent;
      if (className) {
        el.classList.add(className);
      }
      card.appendChild(el);
    }
  };

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
        productContainer.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Error rendering product cards:", error.message);
  }
};

document.addEventListener("DOMContentLoaded", renderStoreItemsCards);
