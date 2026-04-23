// Get modal elements
const modal = document.getElementById("quoteModal");
const quoteBtn = document.getElementById("quoteBtn");
const closeBtn = document.querySelector(".close-btn");
const quoteForm = document.getElementById("quoteForm");

// Open the modal when the floating button is clicked
quoteBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

// Close the modal when the "X" is clicked
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close the modal when clicking outside of the modal content
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Handle form submission and redirect to WhatsApp
quoteForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload
    
    // 1. Gather data from the form
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const serviceDropdown = document.getElementById("service");
    const service = serviceDropdown.options[serviceDropdown.selectedIndex].text; // Gets the display text (e.g. "Epoxy Flooring")
    const message = document.getElementById("message").value.trim();
    
    // 2. Generate current date for the receipt
    const today = new Date();
    const dateString = today.toLocaleDateString('en-ZA');

    // 3. Construct the WhatsApp message in a receipt format
    let whatsappMessage = `*NEW QUOTATION REQUEST*\n`;
    whatsappMessage += `-----------------------------------\n`;
    whatsappMessage += `*Date:* ${dateString}\n\n`;
    
    whatsappMessage += `*CUSTOMER DETAILS*\n`;
    whatsappMessage += `*Name:* ${name}\n`;
    whatsappMessage += `*Phone:* ${phone}\n\n`;
    
    whatsappMessage += `*SERVICE DETAILS*\n`;
    whatsappMessage += `*Requested Service:* ${service}\n`;
    
    // Only include the notes section if the user actually typed a message
    if (message !== "") {
        whatsappMessage += `\n*Project Details*\n${message}\n`;
    }
    
    whatsappMessage += `-----------------------------------\n`;
    whatsappMessage += `Sent via Kudzai Epoxy Flooring Website`;

    // 4. URL Encode the message so it works in a web link
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // 5. Define your WhatsApp number (Country code 27, no '+' or spaces)
    const whatsappNumber = "27810778360";
    
    // 6. Create the official WhatsApp click-to-chat URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // 7. Open WhatsApp in a new tab
    window.open(whatsappURL, "_blank");
    
    // 8. Reset the form and close the modal behind the scenes
    quoteForm.reset();
    modal.style.display = "none";
});