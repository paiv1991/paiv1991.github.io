// Learning Notes Hierarchical Navigation

// Toggle main category (AI or Economics)
function toggleCategory(category) {
    const content = document.getElementById(category + '-content');
    const arrow = event.target.querySelector('.category-arrow');
    
    if (!content) {
        console.error('Category content not found:', category);
        return;
    }
    
    if (content.classList.contains('show')) {
        content.classList.remove('show');
        arrow.textContent = '▶';
    } else {
        // Close other categories first
        document.querySelectorAll('.category-content').forEach(cat => {
            cat.classList.remove('show');
        });
        document.querySelectorAll('.category-arrow').forEach(arr => {
            arr.textContent = '▶';
        });
        
        content.classList.add('show');
        arrow.textContent = '▼';
    }
}

// Toggle subcategory (e.g., Mechanistic Interpretability)
function toggleSubcategory(subcategory) {
    const content = document.getElementById(subcategory + '-content');
    const arrow = event.target.querySelector('.subcategory-arrow');
    
    if (!content) {
        console.error('Subcategory content not found:', subcategory);
        return;
    }
    
    if (content.classList.contains('show')) {
        content.classList.remove('show');
        arrow.textContent = '▶';
    } else {
        content.classList.add('show');
        arrow.textContent = '▼';
    }
    
    // Stop event bubbling to parent
    event.stopPropagation();
}