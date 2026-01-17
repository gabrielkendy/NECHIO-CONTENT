/**
 * NECHIO Design Processor
 * Processamento de imagens e PDFs via Codia AI + n8n
 * 
 * REGRAS:
 * - Máximo 20 imagens OU 1 PDF
 * - Sem armazenamento de dados
 * - F5 reinicia tudo
 */

// ===== CONFIGURAÇÃO =====
const CONFIG = {
    webhookUrl: 'https://agenciabase.app.n8n.cloud/webhook/codia-process',
    maxImages: 20,
    maxFileSize: 10 * 1024 * 1024, // 10MB por arquivo
    allowedImageTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'],
    allowedPdfType: 'application/pdf'
};

// ===== ESTADO =====
let selectedFiles = [];

// ===== ELEMENTOS DOM =====
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const previewSection = document.getElementById('previewSection');
const previewGrid = document.getElementById('previewGrid');
const fileCount = document.getElementById('fileCount');
const clearBtn = document.getElementById('clearBtn');
const processBtn = document.getElementById('processBtn');
const loadingSection = document.getElementById('loadingSection');
const loadingText = document.getElementById('loadingText');
const progressFill = document.getElementById('progressFill');
const resultsSection = document.getElementById('resultsSection');
const resultsGrid = document.getElementById('resultsGrid');
const downloadAllBtn = document.getElementById('downloadAllBtn');
const errorSection = document.getElementById('errorSection');
const errorMessage = document.getElementById('errorMessage');
const retryBtn = document.getElementById('retryBtn');


// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', init);

function init() {
    setupDragAndDrop();
    setupEventListeners();
    console.log('🎨 Design Processor inicializado');
}

// ===== DRAG AND DROP =====
function setupDragAndDrop() {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
        dropZone.addEventListener(event, preventDefaults);
    });

    ['dragenter', 'dragover'].forEach(event => {
        dropZone.addEventListener(event, () => dropZone.classList.add('drag-over'));
    });

    ['dragleave', 'drop'].forEach(event => {
        dropZone.addEventListener(event, () => dropZone.classList.remove('drag-over'));
    });

    dropZone.addEventListener('drop', handleDrop);
    dropZone.addEventListener('click', () => fileInput.click());
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleDrop(e) {
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
}


// ===== EVENT LISTENERS =====
function setupEventListeners() {
    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        handleFiles(files);
    });

    clearBtn.addEventListener('click', clearFiles);
    processBtn.addEventListener('click', processFiles);
    retryBtn.addEventListener('click', resetToUpload);
    downloadAllBtn.addEventListener('click', downloadAll);
}

// ===== MANIPULAÇÃO DE ARQUIVOS =====
function handleFiles(files) {
    // Resetar erro
    hideError();

    // Validar arquivos
    const validation = validateFiles(files);
    if (!validation.valid) {
        showError(validation.message);
        return;
    }

    // Se é PDF, limpar tudo e adicionar apenas o PDF
    if (files.some(f => f.type === CONFIG.allowedPdfType)) {
        const pdfFile = files.find(f => f.type === CONFIG.allowedPdfType);
        selectedFiles = [pdfFile];
    } else {
        // Adicionar imagens (até o limite)
        const newImages = files.filter(f => CONFIG.allowedImageTypes.includes(f.type));
        const totalImages = selectedFiles.length + newImages.length;
        
        if (totalImages > CONFIG.maxImages) {
            const canAdd = CONFIG.maxImages - selectedFiles.length;
            selectedFiles = [...selectedFiles, ...newImages.slice(0, canAdd)];
            showError(`Limite de ${CONFIG.maxImages} imagens. Apenas ${canAdd} foram adicionadas.`);
        } else {
            selectedFiles = [...selectedFiles, ...newImages];
        }
    }

    updatePreview();
    updateProcessButton();
}


function validateFiles(files) {
    // Verificar se há arquivos
    if (!files || files.length === 0) {
        return { valid: false, message: 'Nenhum arquivo selecionado.' };
    }

    // Verificar se há PDF misturado com imagens
    const hasPdf = files.some(f => f.type === CONFIG.allowedPdfType);
    const hasImages = files.some(f => CONFIG.allowedImageTypes.includes(f.type));

    if (hasPdf && hasImages) {
        return { valid: false, message: 'Não é possível processar PDF e imagens juntos. Escolha um tipo.' };
    }

    if (hasPdf && files.filter(f => f.type === CONFIG.allowedPdfType).length > 1) {
        return { valid: false, message: 'Apenas 1 PDF é permitido por vez.' };
    }

    // Verificar tipos de arquivo
    for (const file of files) {
        const isValidType = CONFIG.allowedImageTypes.includes(file.type) || file.type === CONFIG.allowedPdfType;
        if (!isValidType) {
            return { valid: false, message: `Tipo de arquivo não suportado: ${file.name}` };
        }

        if (file.size > CONFIG.maxFileSize) {
            return { valid: false, message: `Arquivo muito grande (máx 10MB): ${file.name}` };
        }
    }

    return { valid: true };
}

function clearFiles() {
    selectedFiles = [];
    fileInput.value = '';
    updatePreview();
    updateProcessButton();
    hideError();
}


// ===== PREVIEW =====
function updatePreview() {
    previewGrid.innerHTML = '';

    if (selectedFiles.length === 0) {
        previewSection.classList.add('hidden');
        return;
    }

    previewSection.classList.remove('hidden');

    selectedFiles.forEach((file, index) => {
        const item = document.createElement('div');
        item.className = 'preview-item';

        if (file.type === CONFIG.allowedPdfType) {
            item.innerHTML = `
                <div class="pdf-icon">📄</div>
                <button class="remove-btn" data-index="${index}">×</button>
            `;
        } else {
            const reader = new FileReader();
            reader.onload = (e) => {
                item.innerHTML = `
                    <img src="${e.target.result}" alt="${file.name}">
                    <button class="remove-btn" data-index="${index}">×</button>
                `;
            };
            reader.readAsDataURL(file);
        }

        previewGrid.appendChild(item);
    });

    // Event listeners para remover
    previewGrid.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            removeFile(index);
        });
    });

    fileCount.textContent = selectedFiles.length;
}

function removeFile(index) {
    selectedFiles.splice(index, 1);
    updatePreview();
    updateProcessButton();
}

function updateProcessButton() {
    processBtn.disabled = selectedFiles.length === 0;
}


// ===== PROCESSAMENTO =====
async function processFiles() {
    if (selectedFiles.length === 0) return;

    showLoading();
    hideError();

    try {
        const formData = new FormData();
        
        // Adicionar arquivos ao FormData
        selectedFiles.forEach((file, index) => {
            formData.append('files', file, file.name);
        });

        // Metadados
        formData.append('metadata', JSON.stringify({
            count: selectedFiles.length,
            type: selectedFiles[0].type === CONFIG.allowedPdfType ? 'pdf' : 'images',
            timestamp: new Date().toISOString()
        }));

        updateProgress(10);
        setLoadingText('Enviando arquivos...');

        const response = await fetch(CONFIG.webhookUrl, {
            method: 'POST',
            body: formData
        });

        updateProgress(50);
        setLoadingText('Processando com Codia AI...');

        if (!response.ok) {
            throw new Error(`Erro no servidor: ${response.status}`);
        }

        const result = await response.json();

        updateProgress(90);
        setLoadingText('Preparando downloads...');

        // Simular delay para UX
        await new Promise(r => setTimeout(r, 500));

        updateProgress(100);
        showResults(result);

    } catch (error) {
        console.error('Erro:', error);
        showError(`Falha no processamento: ${error.message}`);
    }
}


// ===== UI HELPERS =====
function showLoading() {
    loadingSection.classList.remove('hidden');
    resultsSection.classList.add('hidden');
    errorSection.classList.add('hidden');
    processBtn.disabled = true;
}

function hideLoading() {
    loadingSection.classList.add('hidden');
}

function setLoadingText(text) {
    loadingText.textContent = text;
}

function updateProgress(percent) {
    progressFill.style.width = `${percent}%`;
}

function showResults(result) {
    hideLoading();
    resultsSection.classList.remove('hidden');
    resultsGrid.innerHTML = '';

    // Processar resultados
    const files = result.files || result.outputs || [];
    
    if (files.length === 0) {
        resultsGrid.innerHTML = '<p style="text-align:center;color:var(--text-secondary);">Nenhum arquivo processado.</p>';
        return;
    }

    files.forEach((file, index) => {
        const item = document.createElement('div');
        item.className = 'result-item';
        item.innerHTML = `
            <img src="${file.preview || file.url}" alt="Resultado ${index + 1}">
            <button class="btn-download" data-url="${file.url || file.download_url}" data-name="${file.name || `resultado_${index + 1}`}">
                📥 Baixar
            </button>
        `;
        resultsGrid.appendChild(item);
    });

    // Event listeners para download individual
    resultsGrid.querySelectorAll('.btn-download').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const url = e.target.dataset.url;
            const name = e.target.dataset.name;
            downloadFile(url, name);
        });
    });

    // Armazenar arquivos para download em massa
    window.processedFiles = files;
}


function showError(message) {
    hideLoading();
    errorSection.classList.remove('hidden');
    errorMessage.textContent = message;
    processBtn.disabled = selectedFiles.length === 0;
}

function hideError() {
    errorSection.classList.add('hidden');
}

function resetToUpload() {
    hideError();
    hideLoading();
    resultsSection.classList.add('hidden');
    processBtn.disabled = selectedFiles.length === 0;
}

// ===== DOWNLOADS =====
function downloadFile(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function downloadAll() {
    const files = window.processedFiles || [];
    files.forEach((file, index) => {
        setTimeout(() => {
            downloadFile(file.url || file.download_url, file.name || `resultado_${index + 1}`);
        }, index * 500); // Delay para evitar bloqueio
    });
}

// ===== LOG =====
console.log('📁 Design Processor v1.0');
console.log('🔗 Webhook:', CONFIG.webhookUrl);
