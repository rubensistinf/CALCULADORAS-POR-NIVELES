/* =========================================
   GLOBAL JAVASCRIPT - PRO LEVEL
   ========================================= */

// Inject Floating Manual Button
function injectFloatingManual() {
    let path = window.location.pathname.toLowerCase();
    let decodedPath = decodeURIComponent(path);
    
    // Detectar en qué nivel estamos basado en la ruta estricta
    const isNivel1 = decodedPath.includes('/1. nivel');
    const isNivel2 = decodedPath.includes('/2. nivel');
    const isNivel3 = decodedPath.includes('/3. nivel');
    const isNivel4 = decodedPath.includes('/4. nivel');
    const isGrafica = decodedPath.includes('/grafica/');
    const isManual = decodedPath.includes('/6. manual/');

    // Solo mostrar el botón del PDF si estamos estrictamente dentro de una calculadora
    if (!isNivel1 && !isNivel2 && !isNivel3 && !isNivel4 && !isGrafica) return;

    const btn = document.createElement('a');
    
    let targetParam = '?print=all';
    if (isNivel1) targetParam = '?print=1';
    else if (isNivel2) targetParam = '?print=2';
    else if (isNivel3) targetParam = '?print=3';
    else if (isNivel4) targetParam = '?print=4';
    else if (isGrafica) targetParam = '?print=5';

    // Como estamos garantizados a estar dentro de una subcarpeta (Nivel 1-4 o Grafica), 
    // la ruta relativa hacia el manual siempre es subir un nivel (../)
    btn.href = '../6. manual/index.html' + targetParam;

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
