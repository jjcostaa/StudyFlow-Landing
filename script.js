document.addEventListener('DOMContentLoaded',()=>{
  const navbar=document.getElementById('navbar');
  const menu=document.getElementById('menuToggle');
  const links=document.getElementById('navLinks');
  const message=document.getElementById('ctaMessage');

  window.addEventListener('scroll',()=>navbar.classList.toggle('scrolled',window.scrollY>10),{passive:true});

  menu?.addEventListener('click',()=>{
    const open=links.classList.toggle('open');
    menu.classList.toggle('open',open);
    menu.setAttribute('aria-expanded',String(open));
  });

  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
    const target=document.querySelector(a.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});links.classList.remove('open');menu.classList.remove('open');menu.setAttribute('aria-expanded','false');}
  }));

  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  document.querySelectorAll('[data-cta]').forEach(button=>button.addEventListener('click',()=>{
    const cta=document.querySelector('.cta-final');
    if(!cta) return;
    if(!button.closest('.cta-final')) cta.scrollIntoView({behavior:'smooth',block:'center'});
    setTimeout(()=>{
      if(message){message.textContent='¡Gracias! Tu interés queda registrado como parte de la validación de StudyFlow.';message.animate([{opacity:0,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,fill:'forwards'});}
    },350);
  }));
});
