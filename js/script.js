window.addEventListener('DOMContentLoaded', function(){


//tabs


let tabs = document.querySelectorAll('.tabheader__item'),
tabContent = document.querySelectorAll('.tabcontent'),
tabsParent = document.querySelector('.tabheader__items');

function hideTabContent(){
    tabContent.forEach(item =>{
        item.style.display = 'none';
    });
    tabs.forEach(item =>{
        item.classList.remove('tabheader__item_active');
    });
}
function showTabContent(i=0){
    tabContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
}
hideTabContent();
showTabContent(2);

tabsParent.addEventListener('click', function(event) {
    const target = event.target;
    if(target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            if (target == item) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});

//timer

const deadline = '2021-02-01';


function getTimeRemaining(endtime) {
     const t = Date.parse(endtime)- Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

     return {
         'total':t,
         'days':days,
         'hours':hours,
         'minutes':minutes,
         'seconds': seconds
     };

}
function getZero(num){
    if(num>=0 && num<10){
        return '0' + num;
    } else{
        return num;
    }
}

function setClock(selector, endtime) {

    const timer =document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML =getZero( t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if (t.total<=0){
                clearInterval(timeInterval);
            }
        }
}
setClock('.timer', deadline);

//modal window
const ModalTrigger = document.querySelectorAll('[data-modal]'),
modal = document.querySelector('.modal'),
ModalCloseBtn = document.querySelector('[data-close]');

//нам треба буде дві функціїї, перша, це, при натисненні кнопки модальне вікно відкривається
//друга функція - навпаки, закриває модальне вікно
ModalTrigger.forEach(btn => {
    btn.addEventListener('click', showModal);
});
function showModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modelTimer);

}
function closeModal(){
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    
}
modal.addEventListener('click', function(e){
    if(e.target === modal){
        closeModal();
    }
});
ModalCloseBtn.addEventListener('click', closeModal);


document.addEventListener('keydown', (e)=>{
    if(e.code === 'Escape' && modal.classList.contains('show')){
        closeModal();
    }
});
const modelTimer = setTimeout(showModal, 15000);

function showModalByScroll(){
    if ( window.pageYOffset + document.documentElement.clientHeight >= 
        document.documentElement.scrollHeight){
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
    }
}
window.addEventListener('scroll', showModalByScroll);
    

});

