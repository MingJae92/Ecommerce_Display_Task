const apiUrl = "https://uwp-test-store.myshopify.com/products.json";

// Function to fetch data from the API

const fetchStoreItems = async () => {
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
    


