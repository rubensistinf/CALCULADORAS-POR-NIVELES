/* =========================================
   GLOBAL JAVASCRIPT - PRO LEVEL
   ========================================= */

// Inject Floating Manual Button
function injectFloatingManual() {
    const btn = document.createElement('a');
    btn.href = '../6. manual/index.html'; // Adjust relative path dynamically if needed
    
    let path = window.location.pathname.toLowerCase();
    if (path.includes('/nivel') || path.includes('/manual') || path.includes('todos los niveles')) {
        btn.href = '../6. manual/index.html';
    } else {
        btn.href = '6. manual/index.html';
    }

    btn.className = 'floating-manual-btn';
    btn.innerHTML = `
        <i class="fa-solid fa-file-pdf"></i>
        <span class="tooltip">Descargar Manual Completo</span>
    `;
    document.body.appendChild(btn);
}

// Global Tab Switcher Logic
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Find parent container
            const container = btn.closest('.glass-panel') || document.body;
            
            // Remove active class from siblings
            container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            if(targetId) {
                document.getElementById(targetId).classList.add('active');
            }
        });
    });
}

// Utility to display results
function showResult(elementId, html, type = 'normal') {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.innerHTML = html;
    el.className = 'result-box active ' + type;
    el.style.display = 'block';
}

function hideResult(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.style.display = 'none';
}

function clearSection(sectionId, resultId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.querySelectorAll('input').forEach(input => {
            if (input.type === 'number' || input.type === 'text') {
                input.value = '';
            }
        });
    }
    if (resultId) hideResult(resultId);
}

document.addEventListener('DOMContentLoaded', () => {
    injectFloatingManual();
    setupTabs();
});
