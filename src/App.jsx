import { useMemo, useState } from 'react';
import '../assets/css/style.css';

const treatments = [
  {
    id: 1,
    title: 'Rejuvenescimento',
    description: 'Estratégias para qualidade, firmeza e aparência da pele.',
    image:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 2,
    title: 'Harmonização facial',
    description: 'Planejamento estético com foco em equilíbrio e naturalidade.',
    image:
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 3,
    title: 'Corporal',
    description: 'Protocolos para contorno, textura e bem-estar.',
    image:
      'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 4,
    title: 'Skin health',
    description: 'Cuidados para manter a pele saudável, luminosa e bem cuidada.',
    image:
      'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=85',
  },
];

const plans = [
  { name: 'Glow', price: 489, features: ['1 sessão mensal', 'Avaliação inicial', 'Prioridade de agenda', 'Condições especiais'] },
  { name: 'Signature', price: 890, featured: true, features: ['2 sessões mensais', 'Acompanhamento', 'Combo facial/corporal', 'Condições especiais'] },
  { name: 'Private', price: 1490, features: ['4 sessões mensais', 'Protocolo personalizado', 'Agenda prioritária', 'Benefícios exclusivos'] },
];

const customOptions = [
  { label: 'Limpeza premium', value: 'Limpeza premium', price: 280 },
  { label: 'Peeling', value: 'Peeling', price: 390 },
  { label: 'Bioestimulador', value: 'Bioestimulador', price: 650 },
  { label: 'Tecnologia facial', value: 'Tecnologia facial', price: 520 },
  { label: 'Protocolo corporal', value: 'Protocolo corporal', price: 450 },
  { label: 'Drenagem premium', value: 'Drenagem premium', price: 320 },
];

const faqItems = [
  {
    question: 'Os planos mensais têm fidelidade?',
    answer: 'Os termos variam conforme o plano e são definidos na contratação.',
  },
  {
    question: 'Posso personalizar meu plano?',
    answer: 'Sim. O Derma Custom permite combinar serviços e frequência.',
  },
  {
    question: 'Preciso fazer avaliação antes?',
    answer: 'Para procedimentos específicos, a avaliação é essencial para verificar indicação e segurança.',
  },
  {
    question: 'O pagamento é real?',
    answer: 'Não. Esta é uma demonstração de interface; um gateway pode ser integrado depois.',
  },
];

function App() {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const total = useMemo(
    () => selectedOptions.reduce((sum, option) => sum + option.price, 0),
    [selectedOptions]
  );

  function openModal(goal = '') {
    setSelectedGoal(goal);
    const modal = document.getElementById('modal');
    if (modal) modal.classList.add('show');
  }

  function closeAllModals() {
    document.querySelectorAll('.modal').forEach((modal) => modal.classList.remove('show'));
  }

  function handleOptionToggle(option) {
    setSelectedOptions((previous) =>
      previous.some((item) => item.value === option.value)
        ? previous.filter((item) => item.value !== option.value)
        : [...previous, option]
    );
  }

  function submitForm(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const goal = formData.get('goal');
    const message = `Olá! Meu nome é ${name}. Quero agendar uma avaliação na Derma Concept. Objetivo: ${goal}. WhatsApp: ${phone}.`;
    window.open(`https://wa.me/5579999999999?text=${encodeURIComponent(message)}`, '_blank');
  }

  function submitCustomPlan() {
    if (!selectedOptions.length) {
      alert('Selecione pelo menos um serviço.');
      return;
    }

    const services = selectedOptions.map((item) => item.value).join(', ');
    const message = `Olá! Quero montar um Derma Custom. Serviços: ${services}. Estimativa: R$ ${total.toLocaleString('pt-BR')}.`;
    window.open(`https://wa.me/5579999999999?text=${encodeURIComponent(message)}`, '_blank');
  }

  return (
    <>
      <div className="topbar">ATENDIMENTO PERSONALIZADO • AGENDE SUA AVALIAÇÃO</div>

      <header className="site-header">
        <a className="logo" href="#inicio" aria-label="Página inicial">
          <b>DC</b>
          <span>
            DERMA
            <small>CONCEPT</small>
          </span>
        </a>

        <button id="menu" className="menu-button" aria-label="Abrir menu" onClick={() => setOpenMenu((value) => !value)}>
          ☰
        </button>

        <nav className={`main-nav ${openMenu ? 'open' : ''}`} aria-label="Navegação principal">
          <a href="#inicio">Início</a>
          <a href="#tratamentos">Tratamentos</a>
          <a href="#tecnologia">Tecnologia</a>
          <a href="#planos">Planos</a>
          <a href="#experiencia">Experiência</a>
          <a href="#contato">Contato</a>
        </nav>

        <a className="btn dark" href="#agendamento">
          Agendar avaliação
        </a>
      </header>

      <main id="inicio">
        <section className="hero">
          <div className="hero-bg" />
          <div className="shade" />

          <div className="hero-copy">
            <small>DERMA CONCEPT • ESTÉTICA DE ALTO PADRÃO</small>
            <h1>
              O cuidado com você
              <br />
              <i>elevado a outro nível.</i>
            </h1>
            <p>
              Protocolos personalizados, tecnologia avançada e uma experiência pensada nos mínimos detalhes para revelar sua melhor versão com naturalidade.
            </p>

            <div className="hero-actions">
              <a className="btn gold" href="#agendamento">
                Agendar avaliação
              </a>
              <a className="link" href="#tratamentos">
                Conhecer tratamentos ↗
              </a>
            </div>
          </div>
        </section>

        <section className="section intro" id="experiencia">
          <div className="kicker">01 / EXPERIÊNCIA</div>
          <div className="two-columns">
            <div>
              <h2>
                Resultados que respeitam <i>sua identidade.</i>
              </h2>
            </div>
            <div>
              <p className="lead">
                Cada jornada começa com escuta, avaliação e planejamento. A proposta é unir cuidado humano, conhecimento técnico e tecnologia para construir um protocolo coerente com seus objetivos.
              </p>
              <a className="under" href="#agendamento">
                Conheça nossa abordagem →
              </a>
            </div>
          </div>

          <div className="stats-grid">
            <div>
              <b>01</b>
              <span>
                Avaliação
                <br />
                individualizada
              </span>
            </div>
            <div>
              <b>02</b>
              <span>
                Plano de cuidado
                <br />
                sob medida
              </span>
            </div>
            <div>
              <b>03</b>
              <span>
                Acompanhamento
                <br />
                contínuo
              </span>
            </div>
            <div>
              <b>04</b>
              <span>
                Experiência
                <br />
                premium
              </span>
            </div>
          </div>
        </section>

        <section className="section darksec" id="tratamentos">
          <div className="head">
            <div>
              <div className="kicker">02 / TRATAMENTOS</div>
              <h2>
                Protocolos pensados
                <br />
                para <i>você.</i>
              </h2>
            </div>
            <p>
              Uma seleção de tratamentos faciais e corporais para diferentes objetivos, sempre com indicação personalizada.
            </p>
          </div>

          <div className="cards-grid">
            {treatments.map((treatment, index) => (
              <article key={treatment.id}>
                <img src={treatment.image} alt={treatment.title} />
                <div>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  <h3>{treatment.title}</h3>
                  <p>{treatment.description}</p>
                  <button type="button" data-treatment={treatment.title} onClick={() => openModal(treatment.title)}>
                    Explorar protocolo →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="tech" id="tecnologia">
          <div className="tech-img" />
          <div className="tech-copy">
            <div className="kicker">03 / TECNOLOGIA</div>
            <h2>
              Precisão técnica.
              <br />
              <i>Experiência humana.</i>
            </h2>
            <p>
              Equipamentos e protocolos são escolhidos de acordo com a avaliação e o objetivo de cada pessoa. A tecnologia entra como ferramenta — não como promessa.
            </p>

            <div className="tech-list">
              <div>
                <b>01</b>
                <strong>Lasers & luz</strong>
                <span>Tecnologias selecionadas para diferentes necessidades.</span>
              </div>
              <div>
                <b>02</b>
                <strong>Ultrassom</strong>
                <span>Protocolos corporais e faciais personalizados.</span>
              </div>
              <div>
                <b>03</b>
                <strong>Bioestimuladores</strong>
                <span>Planejamento individual conforme indicação profissional.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section plans" id="planos">
          <div className="center">
            <div className="kicker">04 / DERMA MEMBERSHIP</div>
            <h2>
              Seu cuidado não precisa
              <br />
              ser <i>pontual.</i>
            </h2>
            <p>Planos mensais e combos personalizáveis com condições diferenciadas.</p>
          </div>

          <div className="plan-grid">
            {plans.map((plan) => (
              <article key={plan.name} className={plan.featured ? 'featured' : ''}>
                {plan.featured && <label>MAIS ESCOLHIDO</label>}
                <small>{plan.featured ? 'ADVANCED' : plan.name === 'Glow' ? 'ESSENTIAL' : 'EXCLUSIVE'}</small>
                <h3>{plan.name}</h3>
                <strong>
                  R$ {plan.price.toLocaleString('pt-BR')}
                  <em>/mês</em>
                </strong>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`btn ${plan.featured ? 'gold' : 'outline'}`}
                  onClick={() => openModal(`Plano ${plan.name}`)}
                >
                  Escolher plano
                </button>
              </article>
            ))}
          </div>

          <div className="custom-banner">
            <div>
              <small>DERMA CUSTOM</small>
              <h3>Monte seu próprio combo.</h3>
              <p>
                Escolha serviços, frequência e objetivo. O valor é estimado e a equipe finaliza a proposta após a avaliação.
              </p>
            </div>
            <button type="button" className="btn dark" onClick={() => document.getElementById('customModal').classList.add('show')}>
              Montar meu plano →
            </button>
          </div>
        </section>

        <section className="section journey">
          <div className="kicker">05 / JORNADA</div>
          <h2>
            Do primeiro contato
            <br />
            ao seu <i>melhor cuidado.</i>
          </h2>

          <div className="journey-grid">
            <div>
              <b>01</b>
              <h3>Conversa</h3>
              <p>Entendemos sua rotina e prioridades.</p>
            </div>
            <div>
              <b>02</b>
              <h3>Avaliação</h3>
              <p>Uma análise individual orienta possibilidades.</p>
            </div>
            <div>
              <b>03</b>
              <h3>Planejamento</h3>
              <p>Construímos uma jornada personalizada.</p>
            </div>
            <div>
              <b>04</b>
              <h3>Acompanhamento</h3>
              <p>Você não fica sozinho depois do procedimento.</p>
            </div>
          </div>
        </section>

        <section className="quote">
          <span>“</span>
          <blockquote>
            O luxo está nos detalhes: ser ouvido, receber um plano pensado para você e sentir que cada etapa foi feita com cuidado.
          </blockquote>
          <small>EXPERIÊNCIA DERMA CONCEPT</small>
        </section>

        <section className="booking" id="agendamento">
          <div className="book-img" />
          <div className="book-copy">
            <div className="kicker">06 / AVALIAÇÃO</div>
            <h2>
              Vamos construir sua
              <br />
              <i>jornada personalizada?</i>
            </h2>
            <p>
              Agende uma conversa com nossa equipe. A avaliação é o primeiro passo para entender qual protocolo faz sentido para você.
            </p>
            <button type="button" className="btn gold" onClick={() => openModal()}>
              Agendar avaliação
            </button>
          </div>
        </section>

        <section className="section faq">
          <div className="kicker">07 / DÚVIDAS</div>
          <h2>
            Perguntas <i>frequentes.</i>
          </h2>

          <div className="faq-list">
            {faqItems.map((item, index) => (
              <button
                key={item.question}
                type="button"
                className={openFaq === index ? 'active' : ''}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span>{item.question}</span>
                <b>+</b>
                <p>{item.answer}</p>
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer id="contato">
        <div className="foot">
          <div>
            <a className="logo white" href="#inicio">
              <b>DC</b>
              <span>
                DERMA
                <small>CONCEPT</small>
              </span>
            </a>
            <p>
              Estética de alto padrão com foco em protocolos personalizados, tecnologia e acolhimento.
            </p>
          </div>
          <a className="btn dark" href="#agendamento">
            Agendar avaliação
          </a>
        </div>

        <div className="bottom">
          <span>© 2026 Derma Concept</span>
          <span>WhatsApp • (77) 99999-9999</span>
          <span>Instagram • @dermaconcept</span>
        </div>
      </footer>

      <a className="wa" href="https://wa.me/5579999999999" target="_blank" rel="noreferrer">
        WHATSAPP
      </a>

      <div className="modal" id="modal">
        <div className="box">
          <button className="close" type="button" aria-label="Fechar modal" onClick={closeAllModals}>
            ×
          </button>
          <div className="kicker">DERMA CONCEPT</div>
          <h2 id="modalTitle">{selectedGoal || 'Agende sua avaliação'}</h2>
          <p id="modalSub">Conte um pouco sobre seu objetivo.</p>
          <form id="form" onSubmit={submitForm}>
            <input required name="name" placeholder="Nome" />
            <input required name="phone" placeholder="WhatsApp" />
            <select name="goal" defaultValue={selectedGoal || 'Rejuvenescimento'}>
              <option>Rejuvenescimento</option>
              <option>Harmonização facial</option>
              <option>Tratamento corporal</option>
              <option>Skin health</option>
              <option>Ainda não sei</option>
            </select>
            <button className="btn dark" type="submit">
              Continuar pelo WhatsApp
            </button>
          </form>
        </div>
      </div>

      <div className="modal" id="customModal">
        <div className="box">
          <button className="close" type="button" aria-label="Fechar modal" onClick={closeAllModals}>
            ×
          </button>
          <div className="kicker">DERMA CUSTOM</div>
          <h2>Monte seu combo</h2>

          <div className="options">
            {customOptions.map((option) => (
              <label key={option.value}>
                <input
                  type="checkbox"
                  checked={selectedOptions.some((item) => item.value === option.value)}
                  onChange={() => handleOptionToggle(option)}
                />
                {option.label}
                <b>R$ {option.price.toLocaleString('pt-BR')}</b>
              </label>
            ))}
          </div>

          <div className="total">
            Estimativa mensal <strong id="total">R$ {total.toLocaleString('pt-BR')}</strong>
          </div>
          <button className="btn gold" id="sendCustom" type="button" onClick={submitCustomPlan}>
            Quero receber minha proposta
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
