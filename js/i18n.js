const i18nSelectors = {
  navAbout: ".nav-links li:nth-child(1) a, .mobile-links li:nth-child(1) a, .footer-links li:nth-child(1) a",
  navSkills: ".nav-links li:nth-child(2) a, .mobile-links li:nth-child(2) a, .footer-links li:nth-child(2) a",
  navProjects: ".nav-links li:nth-child(3) a, .mobile-links li:nth-child(3) a, .footer-links li:nth-child(3) a",
  navCerts: ".nav-links li:nth-child(4) a, .mobile-links li:nth-child(4) a, .footer-links li:nth-child(4) a",
  navContact: ".mobile-links li:nth-child(5) a, .footer-links li:nth-child(5) a",
  navHire: ".nav-cta",
  heroLine1: "#hero .hero-headline .line:nth-child(1) .line-inner",
  heroLine2: "#hero .hero-headline .line:nth-child(2) .line-inner",
  heroDesc: "#hero .hero-desc", scroll: "#hero .hero-scroll span",
  skillsLabel: "#services .section-label", skillsTitle: "#services .section-title",
  skill1Name: "#services .service-card:nth-child(1) h3", skill1Desc: "#services .service-card:nth-child(1) p",
  skill2Name: "#services .service-card:nth-child(2) h3", skill2Desc: "#services .service-card:nth-child(2) p",
  skill3Name: "#services .service-card:nth-child(3) h3", skill3Desc: "#services .service-card:nth-child(3) p",
  skill4Name: "#services .service-card:nth-child(4) h3", skill4Desc: "#services .service-card:nth-child(4) p",
  skill5Name: "#services .service-card:nth-child(5) h3", skill5Desc: "#services .service-card:nth-child(5) p",
  skill6Name: "#services .service-card:nth-child(6) h3", skill6Desc: "#services .service-card:nth-child(6) p",
  workLabel: "#work .section-label", workTitle: "#work .section-title",
  filterAll: "#work .filter-btn[data-filter='all']", filterWeb: "#work .filter-btn[data-filter='web']",
  filterSoftware: "#work .filter-btn[data-filter='software']", filterSystems: "#work .filter-btn[data-filter='systems']",
  visitProj: "#work .work-visit", exploreTag: "#work .work-card:last-child .work-tag", exploreMore: "#work .work-card:last-child .work-title",
  aboutLabel: "#about .section-label", aboutTitle: "#about .section-title",
  aboutText1: "#about .about-text:first-of-type", aboutText2: "#about .about-text:last-of-type",
  aboutStat1: "#about .about-stats > div:nth-child(1) .stat-label", aboutStat2: "#about .about-stats > div:nth-child(2) .stat-label",
  aboutStat3: "#about .about-stats > div:nth-child(3) .stat-label", aboutStat4: "#about .about-stats > div:nth-child(4) .stat-label",
  aboutCTA: "#about .about-cta",
  certsLabel: "#certifications .section-label", certsTitle: "#certifications .section-title", certsIntro: "#certifications .clients-intro",
  cert1Tag1: "#certifications .client-cell:nth-child(1) .work-tag:first-of-type", cert1Name: "#certifications .client-cell:nth-child(1) .client-name", cert1Tag2: "#certifications .client-cell:nth-child(1) .work-tag:last-of-type",
  cert2Tag1: "#certifications .client-cell:nth-child(2) .work-tag:first-of-type", cert2Name: "#certifications .client-cell:nth-child(2) .client-name", cert2Tag2: "#certifications .client-cell:nth-child(2) .work-tag:last-of-type",
  cert3Tag1: "#certifications .client-cell:nth-child(3) .work-tag:first-of-type", cert3Name: "#certifications .client-cell:nth-child(3) .client-name", cert3Tag2: "#certifications .client-cell:nth-child(3) .work-tag:last-of-type",
  cert4Tag1: "#certifications .client-cell:nth-child(4) .work-tag:first-of-type", cert4Name: "#certifications .client-cell:nth-child(4) .client-name", cert4Tag2: "#certifications .client-cell:nth-child(4) .work-tag:last-of-type",
  cert5Tag1: "#certifications .client-cell:nth-child(5) .work-tag:first-of-type", cert5Name: "#certifications .client-cell:nth-child(5) .client-name", cert5Tag2: "#certifications .client-cell:nth-child(5) .work-tag:last-of-type",
  contactLabel: "#contact .contact-eyebrow", contactTitle: "#contact .contact-headline", contactSub: "#contact .contact-sub",
  formName: "label[for='name']", formEmail: "label[for='email']", formMsg: "label[for='message']", formSubmit: "#contact-form button[type='submit']",
  btnEmail: ".contact-buttons .btn-primary", btnCV: ".cv-dropdown .btn-secondary",
  footerEyebrow: "footer .cta-eyebrow", footerTitle: "footer .cta-title", footerCTA: "footer .cta-huge-link",
  footerTagline: "footer .footer-tagline", footerCopy: "footer .footer-copy",
  langAvail: ".status-label"
};

const translations = {
  en: {
    navAbout: "About", navSkills: "Skills", navProjects: "Projects", navCerts: "Certifications", navContact: "Contact", navHire: "Hire Me",
    heroLine1: "Code. Design.", heroLine2: "Deploy.",
    heroDesc: "I am <strong style='font-family: var(--font-disp); letter-spacing: 0.05em;'>ABDENNOUR GUELLAA</strong>, a software engineering student at EMSI dedicated to crafting high-performance web applications and scalable software solutions.",
    scroll: "Scroll", langAvail: "Available",
    skillsLabel: "Technical Expertise", skillsTitle: "Core<br>Skills",
    skill1Name: "Languages", skill1Desc: "Proficient in C, C++, Java, and Python. Solid understanding of OOP principles and data structures.",
    skill2Name: "Web Development", skill2Desc: "Building modern apps with Django, Vue.js, and Laravel. Expertise in responsive design and interactive UIs.",
    skill3Name: "Databases", skill3Desc: "Designing and managing SQL (MySQL, PostgreSQL, SQLite) and NoSQL (MongoDB) database systems.",
    skill4Name: "Software Engineering", skill4Desc: "Applying UML modeling, design patterns, and system architecture principles for robust software delivery.",
    skill5Name: "Systems & Tools", skill5Desc: "Proficient in Linux environments, version control with Git/GitHub, and Redis caching for performance.",
    skill6Name: "Communication", skill6Desc: "Fluent in Arabic and English (C1), intermediate in French (B1). Strong cross-cultural collaboration and documentation skills.",
    workLabel: "Selected Work", workTitle: "Recent<br>Projects",
    filterAll: "All", filterWeb: "Web", filterSoftware: "Software", filterSystems: "Systems",
    visitProj: "Visit Project ↗", exploreMore: "Explore More<br>On GitHub", exploreTag: "GitHub · Projects",
    aboutLabel: "Background", aboutTitle: "Education &<br>Journey",
    aboutText1: "I am currently pursuing an <strong>Engineering Degree in Software Engineering</strong> at EMSI, Casablanca. My academic journey is focused on building a strong foundation in software architecture, data structures, and modern web technologies.",
    aboutText2: "Beyond my engineering studies, I've reached <strong>C1 proficiency in English</strong> at the American Language Centre and have a strong interest in full-stack development, from low-level C programming to high-level frameworks like Django and Vue.js.",
    aboutStat1: "Projects Completed", aboutStat2: "Languages Spoken", aboutStat3: "Certifications", aboutStat4: "Expected Graduation",
    aboutCTA: "Get in touch", certsLabel: "Verified Skills", certsTitle: "Certifications", certsIntro: "Continuous learning is key to staying ahead in the rapidly evolving software engineering landscape.",
    cert1Tag1: "Jan 2026 · EMSI", cert1Name: "JavaScript, jQuery, and JSON", cert1Tag2: "ID: O1YKU8LD7PZJ",
    cert2Tag1: "Dec 2025 · EPFL", cert2Name: "Introduction to OOP (C++)", cert2Tag2: "ID: UC3MNGVCU9CP",
    cert3Tag1: "2024 · freeCodeCamp", cert3Name: "Responsive Web Design", cert3Tag2: "300+ Hours · Verified",
    cert4Tag1: "2023 · ALC", cert4Name: "Advanced English (C1)", cert4Tag2: "Fluent Proficiency",
    cert5Tag1: "Ongoing", cert5Name: "Engineering Degree", cert5Tag2: "Expected 2028",
    contactLabel: "Let's Connect", contactTitle: "Open to Internship &<br><em>Collaboration Opportunities</em>", contactSub: "Currently based in Casablanca, Morocco. I am a 3rd-year engineering student actively seeking internships. Feel free to reach out!",
    formName: "Name", formEmail: "Email", formMsg: "Message", formSubmit: "Send Message",
    btnEmail: "Email Me", btnCV: "Download CV",
    footerEyebrow: "Have an idea?", footerTitle: "Let's build something <br><em>Extraordinary</em> together.", footerCTA: "Get in touch <span class=\"arrow\">↗</span>",
    footerTagline: "Software Engineering Student & Full-Stack Developer.", footerCopy: "© 2026 ABDENNOUR GUELLAA. Built with Passion.",
  },
  fr: {
    navAbout: "À propos", navSkills: "Compétences", navProjects: "Projets", navCerts: "Certifications", navContact: "Contact", navHire: "Recrutez-moi",
    heroLine1: "Coder. Créer.", heroLine2: "Déployer.",
    heroDesc: "Je suis <strong style='font-family: var(--font-disp); letter-spacing: 0.05em;'>ABDENNOUR GUELLAA</strong>, étudiant en génie logiciel à l'EMSI, passionné par la création d'applications web performantes.",
    scroll: "Défiler", langAvail: "Disponible",
    skillsLabel: "Expertise Technique", skillsTitle: "Compétences<br>Clés",
    skill1Name: "Langages", skill1Desc: "Maîtrise en C, C++, Java et Python. Solide compréhension de la POO et des structures de données.",
    skill2Name: "Développement Web", skill2Desc: "Création d'apps avec Django, Vue.js, Laravel. Expertise en design réactif et UI interactives.",
    skill3Name: "Bases de Données", skill3Desc: "Conception de systèmes SQL (MySQL, PostgreSQL) et NoSQL (MongoDB).",
    skill4Name: "Génie Logiciel", skill4Desc: "Modélisation UML, design patterns et architecture système.",
    skill5Name: "Systèmes & Outils", skill5Desc: "Environnement Linux, Git/GitHub, et Redis caching.",
    skill6Name: "Communication", skill6Desc: "Courant en Arabe et Anglais (C1), intermédiaire en Français (B1).",
    workLabel: "Sélection", workTitle: "Projets<br>Récents",
    filterAll: "Tout", filterWeb: "Web", filterSoftware: "Logiciel", filterSystems: "Systèmes",
    visitProj: "Visiter ↗", exploreMore: "Explorer sur<br>GitHub", exploreTag: "GitHub · Projets",
    aboutLabel: "Parcours", aboutTitle: "Éducation &<br>Parcours",
    aboutText1: "Je poursuis actuellement mon <strong>Diplôme d'Ingénieur en Génie Logiciel</strong> à l'EMSI Casablanca.",
    aboutText2: "Au-delà de mes études d'ingénieur, j'ai atteint le <strong>niveau C1 en anglais</strong> et je suis passionné par le développement full-stack.",
    aboutStat1: "Projets Réalisés", aboutStat2: "Langues Parlées", aboutStat3: "Certifications", aboutStat4: "Diplôme Prévu",
    aboutCTA: "Me contacter", certsLabel: "Compétences", certsTitle: "Certifications", certsIntro: "L'apprentissage continu est essentiel dans le domaine du génie logiciel.",
    cert1Tag1: "Jan 2026 · EMSI", cert1Name: "JavaScript, jQuery et JSON", cert1Tag2: "ID: O1YKU8LD7PZJ",
    cert2Tag1: "Déc 2025 · EPFL", cert2Name: "Introduction à la POO (C++)", cert2Tag2: "ID: UC3MNGVCU9CP",
    cert3Tag1: "2024 · freeCodeCamp", cert3Name: "Responsive Web Design", cert3Tag2: "300+ Heures",
    cert4Tag1: "2023 · ALC", cert4Name: "Anglais Avancé (C1)", cert4Tag2: "Niveau Courant",
    cert5Tag1: "En cours", cert5Name: "Diplôme d'Ingénieur", cert5Tag2: "Prévu 2028",
    contactLabel: "Contactez-moi", contactTitle: "Ouvert aux Stages &<br><em>Opportunités</em>", contactSub: "Basé à Casablanca, Maroc. Étudiant ingénieur en 3ème année à la recherche d'un stage.",
    formName: "Nom", formEmail: "E-mail", formMsg: "Message", formSubmit: "Envoyer Message",
    btnEmail: "M'envoyer un e-mail", btnCV: "Télécharger CV",
    footerEyebrow: "Une idée ?", footerTitle: "Construisons ensemble <br>quelque chose d'<em>Extraordinaire</em>.", footerCTA: "Contactez-moi <span class=\"arrow\">↗</span>",
    footerTagline: "Étudiant en Génie Logiciel & Développeur Full-Stack.", footerCopy: "© 2026 ABDENNOUR GUELLAA. Fait avec passion.",
  },
  ar: {
    navAbout: "نبذة", navSkills: "مهارات", navProjects: "مشاريع", navCerts: "الشهادات", navContact: "اتصال", navHire: "وظفني",
    heroLine1: "برمجة. تصميم.", heroLine2: "نشر.",
    heroDesc: "أنا <strong style='font-family: var(--font-disp); letter-spacing: 0.05em;'>عبد النور قلاع</strong>، طالب هندسة برمجيات مكرس لبناء تطبيقات ويب عالية الأداء.",
    scroll: "تمرير", langAvail: "متاح",
    skillsLabel: "الخبرة التقنية", skillsTitle: "المهارات<br>الأساسية",
    skill1Name: "لغات البرمجة", skill1Desc: "إجادة C و C++ و Java و Python. فهم قوي للبرمجة الموجهة للكائنات.",
    skill2Name: "تطوير الويب", skill2Desc: "بناء تطبيقات حديثة باستخدام Django و Vue.js و Laravel.",
    skill3Name: "قواعد البيانات", skill3Desc: "تصميم وإدارة أنظمة SQL (MySQL، PostgreSQL) و NoSQL.",
    skill4Name: "هندسة البرمجيات", skill4Desc: "تطبيق نمذجة UML وأنماط التصميم لبرمجيات قوية.",
    skill5Name: "الأنظمة والأدوات", skill5Desc: "إجادة Linux و Git/GitHub والتخزين المؤقت Redis.",
    skill6Name: "التواصل", skill6Desc: "طلاقة في العربية والإنجليزية (C1)، مستوى متوسط في الفرنسية (B1).",
    workLabel: "معرض الأعمال", workTitle: "أحدث<br>المشاريع",
    filterAll: "الكل", filterWeb: "ويب", filterSoftware: "برمجيات", filterSystems: "أنظمة",
    visitProj: "زيارة المشروع ↗", exploreMore: "اكتشف المزيد<br>على GitHub", exploreTag: "مشاريع · GitHub",
    aboutLabel: "خلفية", aboutTitle: "التعليم<br>والمسار",
    aboutText1: "أتابع حاليًا دراستي للحصول على <strong>شهادة هندسة في البرمجيات</strong> في EMSI بالدار البيضاء.",
    aboutText2: "بالإضافة إلى دراستي الهندسية، وصلت إلى مستوى <strong>C1 في اللغة الإنجليزية</strong>، ولدي شغف قوي بتطوير الويب.",
    aboutStat1: "مشاريع منجزة", aboutStat2: "لغات منطوقة", aboutStat3: "شهادات معتمدة", aboutStat4: "سنة التخرج",
    aboutCTA: "تواصل معي", certsLabel: "مهارات معتمدة", certsTitle: "الشهادات", certsIntro: "التعلم المستمر هو مفتاح التميز في عالم برمجيات الويب.",
    cert1Tag1: "يناير 2026 · EMSI", cert1Name: "JavaScript و jQuery و JSON", cert1Tag2: "المعرف: O1YKU8LD7PZJ",
    cert2Tag1: "ديسمبر 2025 · EPFL", cert2Name: "مقدمة في الجافا والـ OOP", cert2Tag2: "المعرف: UC3MNGVCU9CP",
    cert3Tag1: "2024 · freeCodeCamp", cert3Name: "تصميم الويب المتجاوب", cert3Tag2: "أكثر من 300 ساعة",
    cert4Tag1: "2023 · ALC", cert4Name: "الإنجليزية المتقدمة (C1)", cert4Tag2: "مستوى طلاقة",
    cert5Tag1: "مستمر", cert5Name: "شهادة الهندسة", cert5Tag2: "متوقع 2028",
    contactLabel: "لنتواصل", contactTitle: "أبحث عن تدريب و<br><em>فرص عمل</em>", contactSub: "مقيم حاليًا في الدار البيضاء، المغرب. أنا طالب مهندس في السنة الثالثة أبحث بنشاط عن تدريب. لا تتردد في التواصل!",
    formName: "الاسم", formEmail: "البريد الإلكتروني", formMsg: "رسالتك", formSubmit: "إرسال الرسالة",
    btnEmail: "راسلني بالبريد", btnCV: "تحميل السيرة الذاتية",
    footerEyebrow: "هل لديك فكرة؟", footerTitle: "لنبني شيئًا <br><em>استثنائيًا</em> معًا.", footerCTA: "تواصل معي <span class=\"arrow\">↗</span>",
    footerTagline: "طالب هندسة برمجيات ومطور متكامل.", footerCopy: "© 2026 عبد النور قلاع. صُنع بشغف.",
  }
};

const typedTranslations = {
  en: ['Software Engineering Student', 'Full-Stack Developer', 'Open to Internship Opportunities'],
  fr: ['Étudiant en Génie Logiciel', 'Développeur Full-Stack', 'Ouvert aux Opportunités de Stage'],
  ar: ['طالب هندسة برمجيات', 'مطور مواقع ويب', 'أبحث عن فرص تدريب']
};
window.typedTranslations = typedTranslations;

const projectTranslations = {
  ar: {
    "E-Commerce Web Application": {
      title: "تطبيق التجارة الإلكترونية",
      desc: "تطبيق متجر حديث وسريع مبني بواسطة Vite و Vanilla JS. يتميز بتصيير المنتجات ديناميكيًا وعربة تسوق كاملة.",
      challenge: "بناء تجربة تسوق ديناميكية بالكامل بدون استخدام أي إطار عمل أو خادم.",
      solution: "تصميم واجهة نظيفة ومقسّمة واستخدام LocalStorage لحفظ السلة."
    },
    "Mini E-Learning Platform": {
      title: "منصة التعليم عن بعد",
      desc: "بيئة تعليمية تفاعلية للأساتذة والطلاب، مبنية باستخدام Laravel و Vue.js.",
      challenge: "إدارة حالة تقدم الطالب المعقدة وتأخيرات الشبكة.",
      solution: "استخدام Vuex لإدارة الحالة والتخزين المؤقت المحلي."
    },
    "Stock Management System (C)": {
      title: "نظام إدارة المخزون (C)",
      desc: "تطبيق عالي الأداء لتتبع المخزون في الوقت الفعلي مبني بلغة C النقية.",
      challenge: "التعامل مع كميات هائلة من البيانات بأقل مساحة من الذاكرة.",
      solution: "بناء جداول تجزئة مخصصة لحفظ البيانات."
    },
    "Hotel Management Web Application": {
      title: "تطبيق إدارة الفنادق",
      desc: "لوحة تحكم إدارية شاملة لتبسيط حجوزات الفنادق.",
      challenge: "أتمتة حساب الفواتير المعقدة بأسعار متغيرة.",
      solution: "استخدام Strategy Pattern للفصل بين المنطق والتطبيق."
    },
    "Student Management System": {
      title: "نظام إدارة الطلاب",
      desc: "تطبيق سطح مكتب لإدارة سجلات وعلامات الطلاب بلغة Java.",
      challenge: "ضمان عمل التطبيق بسلاسة على بيئات مختلفة.",
      solution: "استخدام مكتبة Swing مع قاعدة بيانات SQLite."
    }
  },
  fr: {
    "E-Commerce Web Application": {
      title: "Application E-Commerce",
      desc: "Une application e-commerce rapide et moderne construite avec Vite et JS Vanilla.",
      challenge: "Construire une expérience dynamique sans backend lourd.",
      solution: "Gestion d'état propre via les modules ES et LocalStorage."
    },
    "Mini E-Learning Platform": {
      title: "Plateforme E-Learning",
      desc: "Environnement d'apprentissage numérique interactif avec Laravel et Vue.js.",
      challenge: "Gestion de transitions complexes entre les cours.",
      solution: "Utilisation de Vuex et synchronisation en arrière-plan."
    },
    "Stock Management System (C)": {
      title: "Gestion de Stock (C)",
      desc: "Application haute performance pour le suivi des stocks construite en C.",
      challenge: "Gérer de larges bases de données avec une empreinte mémoire minimale.",
      solution: "Développement d'une table de hachage personnalisée."
    },
    "Hotel Management Web Application": {
      title: "Gestion d'Hôtel",
      desc: "Tableau de bord administratif pour la gestion hôtelière.",
      challenge: "Automatisation logique de facturation complexe.",
      solution: "Design pattern Strategy pour la flexibilité."
    },
    "Student Management System": {
      title: "Gestion des Étudiants",
      desc: "App bureau en Java pour la gestion des dossiers étudiants.",
      challenge: "Assurer la compatibilité Linux/Windows.",
      solution: "Utilisation de Java Swing et base de données SQLite."
    }
  }
}
window.projectTranslations = projectTranslations;

function applyTranslation(lang) {
  const langTranslations = translations[lang] || translations.en;
  if (!langTranslations) return;

  // Translate static selectors
  Object.keys(i18nSelectors).forEach(key => {
    const els = document.querySelectorAll(i18nSelectors[key]);
    els.forEach(el => {
      // Exclude children if needed, or replace html if it has strong tags.
      const translation = langTranslations[key];
      if (translation) {
        if (el.innerHTML.includes('<svg') && el.innerHTML.includes('arrow')) {
          // Keep the arrow svg on footer CTA and project visits
          const btnContent = translation + ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/></svg>';
          el.innerHTML = translation.includes('<span class="arrow">') ? translation : btnContent;
        } else {
          el.innerHTML = translation;
        }
      }
    });
  });

  // Re-init typed.js via custom event 
  document.dispatchEvent(new CustomEvent('langChanged', { detail: lang }));
  
  // Update active state of language switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // RTL adjustments
  if (lang === 'ar') {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
    document.body.classList.add('rtl-mode');
  } else {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = lang;
    document.body.classList.remove('rtl-mode');
  }
}

window.setPortfolioLang = function(lang) {
  localStorage.setItem('portfolioLang', lang);
  applyTranslation(lang);
};

// Ensure the default lang is picked up on load
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('portfolioLang') || 'en';
  applyTranslation(savedLang);
  
  // Attach event listeners to language switcher buttons
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.target.getAttribute('data-lang');
      window.setPortfolioLang(lang);
    });
  });
});
