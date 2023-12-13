const apiUrl = "https://uwp-test-store.myshopify.com/products.json";

// Function to fetch data from the API

const fetchData = async () => {
  try {
    // Fetch data from the API
    const response = await fetch(apiUrl);

    // Log the response for debugging purposes
    console.log("API Response:", response);

    // Check if the response is successful (status code in the range of 200-299)
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    // Parse the response as JSON
    const data = await response.json();

    // Return the 'products' array from the data
    return data.products;
  } catch (error) {
    // Log and rethrow the error
    console.error("Error fetching data:", error.message);
    throw error; // Optionally, rethrow the error if needed.
  }
};

// Function to create a product card element
const createProductCard = ({ title, images, variants, tags }) => {
  // Create a 'div' element with the class 'card'
  const card = document.createElement("div");
  card.classList.add("card");

  // Function to add an image to the card
  const addImage = () => {
    // Check if there is at least one image with a source
    if (images && images.length > 0 && images[0].src) {
      const { src, alt = title } = images[0];
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      card.appendChild(img);
    }
  };

  // Call the addImage function to add an image to the card
  addImage();

  // Function to add an element to the card
  const addElement = (element, textContent, className) => {
    // Check if textContent is defined
    if (textContent !== undefined) {
      const el = document.createElement(element);
      el.textContent = textContent;
      // Add the specified class to the element if provided
      if (className) {
        el.classList.add(className);
      }
      // Append the element to the card
      card.appendChild(el);
    }
  };

  // Add an 'h3' element with the product title
  addElement("h3", title);
  // Add a 'div' element with the first variant's price and the class 'price'
  addElement("div", variants?.[0]?.price, "price");
  // Add a 'div' element with tags (if available) and the class 'tags'
  addElement("div", tags ? `Tags: ${tags.join(", ")}` : undefined, "tags");

  // Return the created card element
  return card;
};

// Function to render product cards on the page
const renderProductCards = async () => {
  try {
    // Get the product container element from the DOM
    const productContainer = document.getElementById("productContainer");
    // Fetch products using the fetchData function
    const products = await fetchData();

    // Check if products exist
    if (products) {
      // Iterate through each product and create a card for it
      products.forEach((product) => {
        const card = createProductCard(product);
        // Append the card to the product container
        productContainer.appendChild(card);
      });
    }
  } catch (error) {
    // Log and handle the error during rendering
    console.error("Error rendering product cards:", error.message);
    // Optionally, you can perform additional error handling here.
    // For example, displaying an error message on the page.
  }
};

// Event listener for DOMContentLoaded event, which triggers rendering of product cards
document.addEventListener("DOMContentLoaded", renderProductCards);
