
const toggle=document.querySelector('.pf-menu'),nav=document.querySelector('.pf-nav');
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);toggle.textContent=open?'關閉':'選單'});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='選單';toggle.focus()}});
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));document.querySelectorAll('[data-category]').forEach(a=>a.hidden=btn.dataset.filter!=='all'&&btn.dataset.filter!==a.dataset.category)}));
const progress=document.querySelector('.reading-progress');if(progress){const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.setProperty('--progress',(max>0?Math.min(100,scrollY/max*100):0)+'%')};addEventListener('scroll',update,{passive:true});update()}
const form=document.querySelector('.contact-form');if(form){const topic=new URLSearchParams(location.search).get('topic');if([...form.elements.topic.options].some(x=>x.value===topic))form.elements.topic.value=topic;form.addEventListener('submit',e=>{e.preventDefault();document.querySelector('#form-status').textContent='欄位已確認。此為設計預覽，資料未傳送或儲存。'})}

