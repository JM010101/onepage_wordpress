// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinkElements = document.querySelectorAll('.nav-link');
navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Popup Modal Functionality
const popupModal = document.getElementById('popupModal');
const downloadBtn = document.getElementById('downloadBtn');
const downloadGuideBtn = document.getElementById('downloadGuideBtn');
const downloadBtnSmall = document.getElementById('downloadBtnSmall');
const closeModal = document.getElementById('closeModal');
const downloadForm = document.getElementById('downloadForm');
const successMessage = document.getElementById('successMessage');
const downloadLink = document.getElementById('downloadLink');

// Open modal when any Download button is clicked
const downloadButtons = [downloadBtn, downloadGuideBtn, downloadBtnSmall].filter(Boolean);
downloadButtons.forEach(btn => {
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }
});

// Close modal when X button is clicked
if (closeModal) {
    closeModal.addEventListener('click', () => {
        closeModalFunc();
    });
}

// Close modal when clicking outside
if (popupModal) {
    popupModal.addEventListener('click', (e) => {
        if (e.target === popupModal) {
            closeModalFunc();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popupModal.classList.contains('active')) {
        closeModalFunc();
    }
});

function openModal() {
    if (popupModal) {
        popupModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Reset form
        downloadForm.reset();
        downloadForm.style.display = 'block';
        successMessage.style.display = 'none';
    }
}

function closeModalFunc() {
    if (popupModal) {
        popupModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Form Submission Handler
if (downloadForm) {
    downloadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim()
        };

        // Validate form
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
            alert('Please fill in all required fields.');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Show loading state
        const submitBtn = downloadForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        try {
            // Simulate API call - In production, this would be a real API endpoint
            await simulateFormSubmission(formData);

            // Hide form and show success message
            downloadForm.style.display = 'none';
            successMessage.style.display = 'block';

            // Set PDF download link
            // In production, this would come from your backend/API
            downloadLink.href = '#pdf-download'; // Replace with actual PDF URL
            downloadLink.onclick = (e) => {
                e.preventDefault();
                handlePDFDownload(formData);
            };

        } catch (error) {
            alert('There was an error processing your request. Please try again.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(formData) {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            // In production, you would make an actual API call here:
            /*
            fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                throw error;
            });
            */
            
            // For demo purposes, just log the data
            console.log('Form submitted:', formData);
            
            resolve({ success: true });
        }, 1500);
    });
}

// Handle PDF Download
function handlePDFDownload(formData) {
    // In production, this would:
    // 1. Generate or retrieve the PDF from your server
    // 2. Create a download link with proper authentication/token
    // 3. Trigger the download
    
    console.log('Downloading PDF for:', formData.email);
    
    // Example: Create a blob and download it
    // This is a placeholder - replace with actual PDF generation/download logic
    const pdfContent = `PDF Guide for ${formData.firstName} ${formData.lastName}`;
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sussex-coastal-property-guide.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Calendly Link Handler
const bookCallButtons = [
    document.getElementById('bookCallNavBtn'),
    document.getElementById('bookCallDarkBtn')
];

// Replace with your actual Calendly URL
const calendlyUrl = 'https://calendly.com/your-calendly-link';

bookCallButtons.forEach(btn => {
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Open Calendly in a new window
            window.open(calendlyUrl, '_blank');
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#pdf-download') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Form validation on input
const formInputs = document.querySelectorAll('#downloadForm input');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
    
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateField(this);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    } else if (field.type === 'tel' && value) {
        // Basic phone validation (adjust regex as needed)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value) || value.length < 10) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }

    // Remove existing error styling
    field.classList.remove('error');
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Add error styling and message if invalid
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        field.parentElement.appendChild(errorDiv);
    }

    return isValid;
}

// Add error styling to CSS (via JavaScript for dynamic validation)
const style = document.createElement('style');
style.textContent = `
    .form-group input.error {
        border-color: #dc3545;
    }
`;
document.head.appendChild(style);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Sussex Coastal Property site loaded');
});
