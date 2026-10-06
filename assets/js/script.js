const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const menu = $('#menu');
const nav = $('.main-nav');

if (menu && nav) {
  menu.addEventListener('click', () => nav.classList.toggle('open'));
}

function openModal(title = 'Agende sua avaliação', goal = '') {
  const modal = $('#modal');
  if (!modal) return;

  modal.classList.add('show');
  $('#modalTitle').textContent = title;

  if (goal) {
    const goalInput = $('[name="goal"]');
    if (goalInput) goalInput.value = goal;
  }
}

function closeAll() {
  $$('.modal').forEach((modal) => modal.classList.remove('show'));
}

$$('.close').forEach((button) => {
  button.addEventListener('click', closeAll);
});

$$('.modal').forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeAll();
  });
});

const bookingButton = $('#booking');
if (bookingButton) bookingButton.addEventListener('click', () => openModal());

$$('.cards-grid button').forEach((button) => {
  button.addEventListener('click', () => openModal('Avaliação personalizada', button.dataset.treatment));
});

const form = $('#form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const msg = `Olá! Meu nome é ${formData.get('name')}. Quero agendar uma avaliação na Derma Concept. Objetivo: ${formData.get('goal')}. WhatsApp: ${formData.get('phone')}.`;
    window.open(`https://wa.me/5579999999999?text=${encodeURIComponent(msg)}`, '_blank');
  });
}

$$('[data-plan]').forEach((button) => {
  button.addEventListener('click', () => {
    openModal('Plano ' + button.dataset.plan);
    const goalInput = $('[name="goal"]');
    if (goalInput) {
      goalInput.value = `Plano ${button.dataset.plan} — R$ ${Number(button.dataset.price).toLocaleString('pt-BR')}/mês`;
    }
  });
});

const customModal = $('#customModal');
const customButton = $('#custom');
if (customButton && customModal) {
  customButton.addEventListener('click', () => customModal.classList.add('show'));
}

const checks = $$('.options input');

function updateTotal() {
  const total = checks
    .filter((input) => input.checked)
    .reduce((sum, input) => sum + Number(input.dataset.price), 0);

  const totalField = $('#total');
  if (totalField) {
    totalField.textContent = 'R$ ' + total.toLocaleString('pt-BR');
  }
}

checks.forEach((input) => {
  input.addEventListener('change', updateTotal);
});

const sendCustom = $('#sendCustom');
if (sendCustom) {
  sendCustom.addEventListener('click', () => {
    const selected = checks.filter((input) => input.checked).map((input) => input.value);

    if (!selected.length) {
      alert('Selecione pelo menos um serviço.');
      return;
    }

    const msg = `Olá! Quero montar um Derma Custom. Serviços: ${selected.join(', ')}. Estimativa: ${$('#total').textContent}.`;
    window.open(`https://wa.me/5579999999999?text=${encodeURIComponent(msg)}`, '_blank');
  });
}

$$('.faq-list button').forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
  });
});
