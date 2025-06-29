/**
 * Contact form handling for RouteSurvey website
 * Includes form validation and submission
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Add input validation listeners
    const emailInput = document.getElementById('email');
    if (emailInput) {
      emailInput.addEventListener('blur', validateEmail);
    }
    
    const nameInput = document.getElementById('name');
    if (nameInput) {
      nameInput.addEventListener('blur', validateName);
    }
    
    const messageInput = document.getElementById('message');
    if (messageInput) {
      messageInput.addEventListener('blur', validateMessage);
    }
  }
});

/**
 * Handles form submission
 * @param {Event} event - The submit event
 */
function handleFormSubmit(event) {
  event.preventDefault();
  
  // Get form elements
  const form = event.target;
  const nameInput = form.elements.name;
  const emailInput = form.elements.email;
  const messageInput = form.elements.message;
  const companyInput = form.elements.company;
  const phoneInput = form.elements.phone;
  const interestSelect = form.elements.interest;
  
  // Validate required fields
  const isNameValid = validateName({ target: nameInput });
  const isEmailValid = validateEmail({ target: emailInput });
  const isMessageValid = validateMessage({ target: messageInput });
  
  // If all required fields are valid, proceed with submission
  if (isNameValid && isEmailValid && isMessageValid) {
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...';
    submitButton.disabled = true;
    
    // Prepare form data
    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
      company: companyInput ? companyInput.value : '',
      phone: phoneInput ? phoneInput.value : '',
      interest: interestSelect ? interestSelect.value : ''
    };
    
    // In a real implementation, you would send this data to a server
    // For this demo, we'll simulate a server response
    setTimeout(() => {
      console.log('Form data to be sent:', formData);
      
      // Simulate successful submission
      showFormMessage('success', 'Thank you for your message! We will get back to you soon.');
      form.reset();
      
      // Reset button
      submitButton.innerHTML = originalButtonText;
      submitButton.disabled = false;
      
      // Alternative: for actual submission when an endpoint is available:
      /*
      fetch('https://api.routesurvey.app/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        showFormMessage('success', 'Thank you for your message! We will get back to you soon.');
        form.reset();
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
      })
      .catch(error => {
        showFormMessage('error', 'There was an error sending your message. Please try again later.');
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
      });
      */
    }, 1500);
  }
}

/**
 * Validates email input
 * @param {Event} event - The input event
 * @returns {boolean} - Whether the email is valid
 */
function validateEmail(event) {
  const emailInput = event.target;
  const emailValue = emailInput.value.trim();
  const emailError = document.getElementById('email-error');
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(emailValue);
  
  if (!emailValue) {
    showInputError(emailInput, emailError, 'Email is required');
    return false;
  } else if (!isValid) {
    showInputError(emailInput, emailError, 'Please enter a valid email address');
    return false;
  } else {
    hideInputError(emailInput, emailError);
    return true;
  }
}

/**
 * Validates name input
 * @param {Event} event - The input event
 * @returns {boolean} - Whether the name is valid
 */
function validateName(event) {
  const nameInput = event.target;
  const nameValue = nameInput.value.trim();
  const nameError = document.getElementById('name-error');
  
  if (!nameValue) {
    showInputError(nameInput, nameError, 'Name is required');
    return false;
  } else if (nameValue.length < 2) {
    showInputError(nameInput, nameError, 'Name must be at least 2 characters');
    return false;
  } else {
    hideInputError(nameInput, nameError);
    return true;
  }
}

/**
 * Validates message input
 * @param {Event} event - The input event
 * @returns {boolean} - Whether the message is valid
 */
function validateMessage(event) {
  const messageInput = event.target;
  const messageValue = messageInput.value.trim();
  const messageError = document.getElementById('message-error');
  
  if (!messageValue) {
    showInputError(messageInput, messageError, 'Message is required');
    return false;
  } else if (messageValue.length < 10) {
    showInputError(messageInput, messageError, 'Message must be at least 10 characters');
    return false;
  } else {
    hideInputError(messageInput, messageError);
    return true;
  }
}

/**
 * Shows input error message
 * @param {HTMLElement} input - The input element
 * @param {HTMLElement} errorElement - The error display element
 * @param {string} message - The error message
 */
function showInputError(input, errorElement, message) {
  input.classList.add('border-red-500');
  input.classList.remove('border-gray-300', 'focus:border-indigo-500');
  
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
  }
}

/**
 * Hides input error message
 * @param {HTMLElement} input - The input element
 * @param {HTMLElement} errorElement - The error display element
 */
function hideInputError(input, errorElement) {
  input.classList.remove('border-red-500');
  input.classList.add('border-gray-300', 'focus:border-indigo-500');
  
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
  }
}

/**
 * Shows form message (success or error)
 * @param {string} type - The message type ('success' or 'error')
 * @param {string} message - The message text
 */
function showFormMessage(type, message) {
  const formMessage = document.getElementById('form-message');
  
  if (formMessage) {
    formMessage.textContent = message;
    formMessage.classList.remove('hidden', 'text-green-600', 'text-red-600');
    
    if (type === 'success') {
      formMessage.classList.add('text-green-600');
    } else {
      formMessage.classList.add('text-red-600');
    }
    
    // Scroll to the message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Hide the message after 5 seconds
    setTimeout(() => {
      formMessage.classList.add('hidden');
    }, 5000);
  }
} 