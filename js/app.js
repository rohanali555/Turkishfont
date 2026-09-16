/**
 * Fancy Text Generator Main Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const textInput = document.getElementById('textInput');
  const resultsGrid = document.getElementById('resultsGrid');
  const charCounter = document.getElementById('charCounter');
  const clearBtn = document.getElementById('clearBtn');
  const themeToggle = document.getElementById('themeToggle');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const toast = document.getElementById('toast');
  const filterChips = document.querySelectorAll('.filter-chip');
  const quickTools = document.querySelectorAll('.tool-btn');

  let activeCategory = 'all';

  // Default sample text if empty
  const defaultText = 'Fancy Text Generator';

  // Theme Management
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (themeToggle) {
    themeToggle.innerHTML = savedTheme === 'light' ? '🌙' : '☀️';
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      themeToggle.innerHTML = newTheme === 'light' ? '🌙' : '☀️';
    });
  }

  // Mobile Menu Toggle
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Render converted styles
  function renderStyles() {
    if (!resultsGrid) return;
    const currentText = textInput.value || defaultText;
    const convertedItems = UnicodeConverter.convertAll(currentText);

    resultsGrid.innerHTML = '';

    convertedItems.forEach((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return;
      }

      const card = document.createElement('div');
      card.className = 'style-card';
      card.setAttribute('data-category', item.category);

      card.innerHTML = `
        <div class="card-header">
          <span class="style-title">${item.name}</span>
        </div>
        <div class="style-preview" id="preview-${item.id}">${escapeHtml(item.result)}</div>
        <button class="copy-btn" data-target="preview-${item.id}" aria-label="Copy ${item.name} style">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          <span>Copy</span>
        </button>
      `;

      resultsGrid.appendChild(card);
    });

    // Attach copy event listeners
    document.querySelectorAll('.copy-btn').forEach((btn) => {
      btn.addEventListener('click', handleCopy);
    });
  }

  // Handle Copy function
  function handleCopy(e) {
    const btn = e.currentTarget;
    const targetId = btn.getAttribute('data-target');
    const targetElem = document.getElementById(targetId);

    if (!targetElem) return;

    const textToCopy = targetElem.innerText;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        showCopySuccess(btn);
      }).catch(() => {
        fallbackCopy(textToCopy, btn);
      });
    } else {
      fallbackCopy(textToCopy, btn);
    }
  }

  function fallbackCopy(text, btn) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showCopySuccess(btn);
  }

  function showCopySuccess(btn) {
    const originalText = btn.innerHTML;
    btn.classList.add('copied');
    btn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>Copied!</span>
    `;

    showToast('Copied to clipboard!');

    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = originalText;
    }, 2000);
  }

  function showToast(msg) {
    if (!toast) return;
    toast.querySelector('.toast-msg').innerText = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Live Input Event Listeners
  if (textInput) {
    textInput.addEventListener('input', () => {
      const len = textInput.value.length;
      if (charCounter) charCounter.innerText = `${len} characters`;
      if (clearBtn) clearBtn.style.display = len > 0 ? 'flex' : 'none';
      renderStyles();
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        textInput.value = '';
        charCounter.innerText = '0 characters';
        clearBtn.style.display = 'none';
        renderStyles();
        textInput.focus();
      });
    }
  }

  // Quick Tools (UPPERCASE, lowercase, Title Case, Reverse)
  quickTools.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!textInput || !textInput.value) return;
      const tool = btn.getAttribute('data-action');
      let val = textInput.value;

      if (tool === 'upper') {
        val = val.toUpperCase();
      } else if (tool === 'lower') {
        val = val.toLowerCase();
      } else if (tool === 'title') {
        val = val.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
      } else if (tool === 'reverse') {
        val = val.split('').reverse().join('');
      }

      textInput.value = val;
      renderStyles();
    });
  });

  // Category Filters
  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      filterChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.getAttribute('data-category');
      renderStyles();
    });
  });

  // Initial render
  renderStyles();
});
