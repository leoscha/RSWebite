// Blog data structure
const blogPosts = [
    {
        id: 1,
        title: "Getting Started with Heavy Haul Route Surveys",
        excerpt: "Learn how to efficiently plan and execute heavy haul route surveys with our comprehensive guide.",
        author: "John Doe",
        authorRole: "Senior Route Surveyor",
        date: "2024-01-15",
        image: "../assets/blog/getting-started.jpg",
        readTime: "5 min read",
        category: "Guides",
        tags: ["guide", "tutorial", "route-survey"]
    },
    {
        id: 2,
        title: "Top 10 Challenges in Heavy Haul Transportation",
        excerpt: "Discover the most common challenges faced in heavy haul transportation and learn effective strategies to overcome them.",
        author: "Sarah Williams",
        authorRole: "Transportation Specialist",
        date: "2024-01-22",
        image: "../assets/blog/challenges.jpg",
        readTime: "7 min read",
        category: "Industry Insights",
        tags: ["challenges", "transportation", "solutions"]
    },
    {
        id: 3,
        title: "Best Practices for Bridge Clearance Measurements",
        excerpt: "Essential tips and techniques for accurate bridge clearance measurements in route surveying.",
        author: "Michael Chen",
        authorRole: "Infrastructure Engineer",
        date: "2024-02-01",
        image: "../assets/blog/bridge-clearance.jpg",
        readTime: "6 min read",
        category: "Tips & Tricks",
        tags: ["measurements", "bridges", "safety"]
    },
    {
        id: 4,
        title: "Technology Trends Reshaping Route Surveying",
        excerpt: "Explore how GPS, LiDAR, and other emerging technologies are revolutionizing the route survey industry.",
        author: "Emily Rodriguez",
        authorRole: "Technology Consultant",
        date: "2024-02-10",
        image: "../assets/blog/tech-trends.jpg",
        readTime: "8 min read",
        category: "Industry News",
        tags: ["technology", "innovation", "future"]
    },
    {
        id: 5,
        title: "Route Survey Safety: Essential Guidelines",
        excerpt: "Comprehensive safety guidelines and best practices for conducting route surveys in challenging conditions.",
        author: "David Thompson",
        authorRole: "Safety Coordinator",
        date: "2024-02-15",
        image: "../assets/blog/safety.jpg",
        readTime: "6 min read",
        category: "Safety",
        tags: ["safety", "guidelines", "best-practices"]
    },
    {
        id: 6,
        title: "Case Study: Successful Wind Turbine Transport",
        excerpt: "A detailed analysis of a complex wind turbine transportation project and the crucial role of route surveying.",
        author: "Lisa Anderson",
        authorRole: "Project Manager",
        date: "2024-02-20",
        image: "../assets/blog/case-study.jpg",
        readTime: "10 min read",
        category: "Case Studies",
        tags: ["case-study", "wind-energy", "project-management"]
    }
];

// Get unique categories from blog posts
const categories = [...new Set(blogPosts.map(post => post.category))];

// Function to create category filter buttons
function createCategoryFilters() {
    const filterContainer = document.getElementById('category-filters');
    if (!filterContainer) return;

    // Add "All" button
    const allButton = document.createElement('button');
    allButton.textContent = 'All';
    allButton.className = 'px-4 py-2 bg-primary-600 text-white rounded-full text-sm hover:bg-primary-700 transition duration-150';
    allButton.dataset.category = 'all';
    filterContainer.appendChild(allButton);

    // Add category buttons
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.className = 'px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm hover:bg-primary-100 transition duration-150';
        button.dataset.category = category;
        filterContainer.appendChild(button);
    });

    // Add click event listeners
    filterContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            // Update active state of buttons
            filterContainer.querySelectorAll('button').forEach(btn => {
                btn.className = 'px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm hover:bg-primary-100 transition duration-150';
            });
            e.target.className = 'px-4 py-2 bg-primary-600 text-white rounded-full text-sm hover:bg-primary-700 transition duration-150';
            
            // Filter posts
            const selectedCategory = e.target.dataset.category;
            filterPosts(selectedCategory);
        }
    });
}

// Function to filter posts by category
function filterPosts(category) {
    const filteredPosts = category === 'all' 
        ? blogPosts 
        : blogPosts.filter(post => post.category === category);
    displayBlogPosts(filteredPosts);
}

// Function to create blog post cards
function createBlogPostCard(post) {
    return `
        <article class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1">
            <div class="relative h-48 overflow-hidden">
                <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover">
                <div class="absolute top-4 left-4">
                    <span class="px-3 py-1 bg-primary-600 text-white text-sm rounded-full">${post.category}</span>
                </div>
            </div>
            <div class="p-6">
                <h2 class="text-xl font-bold mb-3 text-gray-900 hover:text-primary-600">
                    <a href="post-${post.id}.html">${post.title}</a>
                </h2>
                <p class="text-gray-600 mb-4">${post.excerpt}</p>
                <div class="flex items-center justify-between text-sm text-gray-500">
                    <div class="flex items-center">
                        <div class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                            <i class="fas fa-user text-primary-600"></i>
                        </div>
                        <span>${post.author}</span>
                    </div>
                    <span>${post.readTime}</span>
                </div>
            </div>
        </article>
    `;
}

// Function to display blog posts
function displayBlogPosts(posts = blogPosts) {
    const container = document.querySelector('.blog-posts');
    if (!container) return;
    
    container.innerHTML = posts.map(post => createBlogPostCard(post)).join('');
}

// Function to display related posts
function displayRelatedPosts(currentPostId) {
    const relatedPosts = blogPosts
        .filter(post => post.id !== currentPostId)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    
    displayBlogPosts(relatedPosts);
}

// Function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Function to handle newsletter subscription
function handleNewsletterSubscription() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        if (!emailInput) return;

        // Here you would typically send this to your backend
        console.log('Newsletter subscription:', emailInput.value);
        
        // Show success message
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = 'Subscribed!';
        button.classList.add('bg-green-600');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('bg-green-600');
            emailInput.value = '';
        }, 2000);
    });
}

// Function to initialize social sharing
function initializeSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-buttons a');
    if (!shareButtons.length) return;

    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);

    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = button.querySelector('i').classList.contains('fa-twitter') ? 'twitter'
                : button.querySelector('i').classList.contains('fa-linkedin') ? 'linkedin'
                : button.querySelector('i').classList.contains('fa-facebook') ? 'facebook'
                : null;

            let shareUrl;
            switch (platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
                    break;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// Initialize mobile menu
function initializeMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!menuButton || !mobileMenu) return;

    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
    });
}

// Initialize blog functionality
document.addEventListener('DOMContentLoaded', () => {
    initializeMobileMenu();
    createCategoryFilters();
    displayBlogPosts();
    handleNewsletterSubscription();
    
    // If we're on a blog post page
    const postMatch = window.location.pathname.match(/post-(\d+)\.html$/);
    if (postMatch) {
        displayRelatedPosts(parseInt(postMatch[1]));
        initializeSocialSharing();
    }
}); 