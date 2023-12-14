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
      const blockElement = document.createElement("div");
      blockElement.classList.add("block-element");

      const el = document.createElement(element);

      if (className === "price") {
        // Add dollar sign directly to the left side of the price
        el.textContent = `$${textContent}`;
      } else {
        el.textContent = textContent;
      }

      if (className) {
        el.classList.add(className);
        blockElement.appendChild(el);

        if (className === "tags") {
          const shopNowContainer = document.createElement("div");
          shopNowContainer.classList.add("shop-now-container");

          const shopNowText = document.createElement("span");
          shopNowText.classList.add("shop-now-text");
          shopNowText.textContent = "SHOP NOW";
          shopNowText.style.backgroundColor = "#DAA520";
          shopNowText.style.color = "#000"; // Black color
          shopNowText.style.padding = "10px";
          shopNowText.style.fontWeight = "bold"; // Bold text

          shopNowContainer.appendChild(shopNowText);
          blockElement.appendChild(shopNowContainer);
        }
      }

      card.appendChild(blockElement);
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
        productContainer.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Error rendering product cards:", error.message);
  }
};

document.addEventListener("DOMContentLoaded", renderStoreItemsCards);
