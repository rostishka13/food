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

const deadline = '2021-03-01';


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
const modelTimer = setTimeout(showModal, 1500000);

function showModalByScroll(){
    if ( window.pageYOffset + document.documentElement.clientHeight >= 
        document.documentElement.scrollHeight){
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
    }
}
window.addEventListener('scroll', showModalByScroll);
    
// використовуємо класи для карточок

    class MenuCart{
        constructor(src, alt, title, decsription, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.decsription = decsription;
            this.price = price;
            this.transfer = 27;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.changeToUAH();

        }

        changeToUAH(){
            this.price = this.price*this.transfer;
            
        }
        render(){
            const element = document.createElement('div');
            if( this.classes.length === 0){
                this.element = 'menu__item'
                element.classList.add(this.element);
            }else {
            this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
             
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.decsription}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            
                    </div>`;
            this.parent.append(element);
        }
    }

    new MenuCart(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item',
        'big'


    ).render();

    new MenuCart(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        20,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCart(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        '.menu .container', 
        'menu__item'
    ).render();


    //forms

const forms = document.querySelectorAll('form');

const message = {
    loading: 'loading',
    success: 'Thank you',
    fail: 'something went wrong'
};

forms.forEach(item => {
    postData(item);
});

function postData(form){
    form.addEventListener('submit', (e)=>{
        e.preventDefault();

        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        form.append(statusMessage);
        const request = XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('content-type', 'multipart/form-data');

        const formData = new FormData(form);

        request.send(FormData);
        request.addEventListener('load', () => {
            if(request.status === 200){
                console.log(request.response);
                statusMessage.textContent = message.success;
            }else{
                statusMessage.textContent = message.fail;
            }
           
        });
    });
}





    });
