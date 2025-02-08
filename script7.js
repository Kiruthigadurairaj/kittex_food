// JSON Data (Replace with actual API call if needed)
const menuData = [
    { id: 1, name: "Classic Burger", price: 8.99 },
    { id: 2, name: "Cheeseburger", price: 9.99 },
    { id: 3, name: "Bacon Burger", price: 10.99 },
    { id: 4, name: "Veggie Burger", price: 7.99 },
    { id: 5, name: "Double Burger", price: 12.99 },
  ];
  
  // Function to fetch and display the menu
  function getMenu() {
    const menuDiv = document.getElementById("menu");
    menuData.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.textContent = `${item.name} - $${item.price}`;
      menuDiv.appendChild(itemDiv);
    });
  }
  
  // Function to simulate taking an order
  function takeOrder() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const burgers = [];
        for (let i = 0; i < 3; i++) {
          const randomBurger = menuData[Math.floor(Math.random() * menuData.length)];
          burgers.push(randomBurger);
        }
        resolve({ burgers });
      }, 2500);
    });
  }
  
  // Function to simulate order preparation
  function orderPrep() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ order_status: true, paid: false });
      }, 1500);
    });
  }
  
  // Function to simulate payment
  function payOrder() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ order_status: true, paid: true });
      }, 1000);
    });
  }
  
  // Function to display thank you message
  function thankyouFnc() {
    alert("Thank you for your order! Enjoy your meal!");
  }
  
  // Event listener for the order button
  document.getElementById("orderBtn").addEventListener("click", async () => {
    const orderStatusDiv = document.getElementById("orderStatus");
  
    // Fetch and display menu
    getMenu();
  
    // Take order
    orderStatusDiv.textContent = "Placing your order...";
    const order = await takeOrder();
    orderStatusDiv.textContent = `Order placed: ${order.burgers.map(b => b.name).join(", ")}`;
  
    // Prepare order
    orderStatusDiv.textContent = "Preparing your order...";
    const prepStatus = await orderPrep();
    if (prepStatus.order_status) {
      orderStatusDiv.textContent = "Order is being prepared...";
    }
  
    // Pay for order
    orderStatusDiv.textContent = "Processing payment...";
    const paymentStatus = await payOrder();
    if (paymentStatus.paid) {
      orderStatusDiv.textContent = "Order paid successfully!";
      thankyouFnc();
    }
  });