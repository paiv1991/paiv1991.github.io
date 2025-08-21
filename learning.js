// Learning Notes Hierarchical Navigation

// Toggle main category (AI or Economics)
function toggleCategory(category) {
    const content = document.getElementById(category + '-content');
    const arrow = event.target.querySelector('.category-arrow');
    
    if (content.style.display === 'block') {
        content.style.display = 'none';
        arrow.textContent = '▶';
    } else {
        // Close other categories first
        document.querySelectorAll('.category-content').forEach(cat => {
            cat.style.display = 'none';
        });
        document.querySelectorAll('.category-arrow').forEach(arr => {
            arr.textContent = '▶';
        });
        
        content.style.display = 'block';
        arrow.textContent = '▼';
    }
}

// Toggle subcategory (e.g., Mechanistic Interpretability)
function toggleSubcategory(subcategory) {
    const content = document.getElementById(subcategory + '-content');
    const arrow = event.target.querySelector('.subcategory-arrow');
    
    if (content.style.display === 'block') {
        content.style.display = 'none';
        arrow.textContent = '▶';
    } else {
        content.style.display = 'block';
        arrow.textContent = '▼';
    }
    
    // Stop event bubbling to parent
    event.stopPropagation();
}