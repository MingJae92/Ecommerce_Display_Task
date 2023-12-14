// Define the Shopify store API URL
const apiUrl = "https://uwp-test-store.myshopify.com/products.json";

// Function to fetch store items from the Shopify store
const fetchStoreItems = async () => {
  try {
    console.log("Fetching data from the Shopify store API...");
    const response = await fetch(apiUrl);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    console.log("Data fetched successfully.");
    // Parse the response data as JSON
    const data = await response.json();

    // Return the products array from the data
    return data.products;
  } catch (error) {
    // Handle errors during the fetch operation
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

// Function to create a product card element
const createProductCard = ({ title, images, variants, tags }) => {
  console.log("Creating product card for:", title);

  // Create a div element for the product card
  const card = document.createElement("div");
  card.classList.add("card");

  // Function to add an image to the card
  const addImage = () => {
    if (images && images.length > 0 && images[0].src) {
      // Create a span element for gender text
      const genderText = document.createElement("span");
      genderText.classList.add("gender-text");
      genderText.textContent = "GENDER";
      genderText.style.padding = "8px";
      card.appendChild(genderText);

      // Create an img element for the product image
      const { src, alt = title } = images[0];
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      card.appendChild(img);
    }
  };

  // Function to add various elements to the card
  const addElement = (element, textContent, className) => {
    if (textContent !== undefined) {
      // Create a div element for the block
      const blockElement = document.createElement("div");
      blockElement.classList.add("block-element");

      // Create the specified element (h3, div, etc.)
      const el = document.createElement(element);

      // Set the text content of the element
      if (className === "price") {
        // Add dollar sign directly to the left side of the price
        el.textContent = `$${textContent}`;
      } else {
        el.textContent = textContent;
      }

      // Add the specified class to the element
      if (className) {
        el.classList.add(className);
        blockElement.appendChild(el);

        // Special handling for "tags" class
        if (className === "tags") {
          // Create a container for the "SHOP NOW" text
          const shopNowContainer = document.createElement("div");
          shopNowContainer.classList.add("shop-now-container");

          // Create a span element for the "SHOP NOW" text
          const shopNowText = document.createElement("span");
          shopNowText.classList.add("shop-now-text");
          shopNowText.textContent = "SHOP NOW";
          shopNowText.style.backgroundColor = "#DAA520";
          shopNowText.style.color = "#000"; // Black color
          shopNowText.style.padding = "10px";
          shopNowText.style.fontWeight = "bold"; // Bold text

          // Append the "SHOP NOW" text to its container
          shopNowContainer.appendChild(shopNowText);

          // Append the container to the block element
          blockElement.appendChild(shopNowContainer);
        }
      }

      // Append the block element to the card
      card.appendChild(blockElement);
    }
  };

  // Call the addImage and addElement functions
  addImage();
  addElement("h3", title);
  addElement("div", variants?.[0]?.price, "price");
  addElement("div", tags ? `Tags: ${tags.join(", ")}` : undefined, "tags");

  console.log("Product card created for:", title);

  // Return the created card element
  return card;
};

// Function to render product cards on the page
const renderStoreItemsCards = async () => {
  try {
    console.log("Rendering product cards...");

    // Get the product container element from the DOM
    const productContainer = document.getElementById("productContainer");

    // Fetch store items
    const products = await fetchStoreItems();

    // Check if products exist
    if (products) {
      // Iterate through each product and create a card for it
      products.forEach((product) => {
        const card = createProductCard(product);
        // Append the card to the product container
        productContainer.appendChild(card);
      });

      console.log("Product cards rendered successfully.");
    } else {
      console.warn("No products found.");
    }
  } catch (error) {
    // Handle errors during the rendering process
    console.error("Error rendering product cards:", error.message);
  }
};

// Event listener to trigger the rendering when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", renderStoreItemsCards);
