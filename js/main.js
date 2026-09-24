(() => {
  const html = document.documentElement;

  // 테마 토글 (저장된 값 → 시스템 설정 순)
  const toggle = document.getElementById('themeToggle');
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
  }
  toggle.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark');
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
  });

  // 모바일 메뉴
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    })
  );

  // 프로젝트 자세히 보기 토글
  document.querySelectorAll('.more-btn').forEach(btn => {
    const detail = document.getElementById(btn.getAttribute('aria-controls'));
    const label = btn.querySelector('.more-label');
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', open);
      detail.hidden = !open;
      label.textContent = open ? '접기' : '자세히 보기';
      if (!open) btn.closest('.project').scrollIntoView({ block: 'start' });
    });
  });

  // 스크롤 등장 애니메이션
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // 현재 섹션 네비 하이라이트
  const links = [...document.querySelectorAll('.nav-links a')];
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('section[id]').forEach(s => spy.observe(s));
})();
