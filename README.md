# Sussex Coastal Property - One Page Website

A modern, responsive one-page website recreated from the original GoHighLevel site. Built with pure HTML, CSS, and JavaScript for fast loading and easy customization.

## Features

- **Hero Section** - Eye-catching hero with call-to-action buttons
- **About Section** - Company information and mission
- **Benefits Section** - Four key benefits displayed in cards
- **Projects Gallery** - Showcase of recent property projects
- **Working With Us** - Process explanation and CTA
- **Footer** - Contact information and quick links
- **Popup Form** - Lead capture form triggered by "Download" button
- **PDF Download** - Form submission triggers PDF download flow
- **Calendly Integration** - "Book a Call" buttons link to Calendly
- **Fully Responsive** - Mobile-first design that works on all devices

## File Structure

```
wordpress_onepage/
├── index.html      # Main HTML structure
├── styles.css      # All styling and responsive design
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Setup Instructions

1. **Download/Clone** the project files
2. **Open** `index.html` in a web browser
3. **No build process required** - works directly in the browser

## Customization

### Update Calendly Link

In `script.js`, find the `calendlyUrl` variable and replace with your actual Calendly URL:

```javascript
const calendlyUrl = 'https://calendly.com/your-calendly-link';
```

### Update PDF Download

The PDF download functionality is currently simulated. To implement actual PDF downloads:

1. Set up a backend API endpoint to handle form submissions
2. Generate or retrieve the PDF file
3. Update the `handlePDFDownload()` function in `script.js` with your actual PDF URL or download logic

Example backend integration:

```javascript
// In script.js, replace simulateFormSubmission with:
fetch('/api/submit-form', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    downloadLink.href = data.pdfUrl; // URL from your backend
    // Show success message
});
```

### Update Colors

In `styles.css`, modify the CSS variables at the top:

```css
:root {
    --primary-color: #1a4d7a;
    --secondary-color: #2d7a9f;
    --accent-color: #d4af37;
    /* ... other colors */
}
```

### Add Real Images

Replace the placeholder divs with actual images:

```html
<!-- Replace this: -->
<div class="image-placeholder">
    <span>Project 1</span>
</div>

<!-- With this: -->
<img src="path/to/image.jpg" alt="Project description">
```

## Form Submission

The form currently simulates submission. To connect to a real backend:

1. **Email Service** (e.g., EmailJS, SendGrid, Mailchimp API)
2. **CRM Integration** (e.g., HubSpot, Salesforce)
3. **Custom Backend** (Node.js, PHP, Python, etc.)

Example with EmailJS:

```javascript
emailjs.send('service_id', 'template_id', {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone
});
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- No external dependencies (except Google Fonts)
- Optimized CSS with minimal repaints
- Fast loading times
- Mobile-optimized images (add when replacing placeholders)

## WordPress/Elementor Migration

To convert this to WordPress + Elementor:

1. **Install WordPress** and Elementor plugin
2. **Create a new page** in WordPress
3. **Use Elementor** to recreate sections:
   - Hero Section widget
   - Text Editor widgets for About
   - Icon Box widgets for Benefits
   - Gallery widget for Projects
   - Form widget for popup (Elementor Pro)
   - Popup Builder (Elementor Pro) for the download form
4. **Match styling** using Elementor's style controls
5. **Add custom CSS** if needed in Appearance > Customize > Additional CSS

## Contact Information

Update the footer contact details in `index.html`:

```html
<div class="footer-section">
    <h4>Contact</h4>
    <ul>
        <li>Email: your-email@example.com</li>
        <li>Phone: +44 (0) 1234 567890</li>
    </ul>
</div>
```

## License

This project is created for Sussex Coastal Property. All rights reserved.

## Notes

- The site uses smooth scrolling for anchor links
- Mobile menu is hamburger-style for smaller screens
- Form validation includes email and phone number checks
- PDF download is simulated - implement actual backend integration for production
- All "Book a Call" buttons link to the same Calendly URL (customize as needed)
