document.addEventListener('DOMContentLoaded', function () {
    // конечная дата
    const deadline = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 01,24);
    // id таймера
    let timerId = null;
    // склонение числительных
    function declensionNum(num, words) {
      return words[[2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
    function countdownTimer() {
      const diff = deadline - new Date();
      if (diff <= 0) {
        clearInterval(timerId);
      }
      const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
      const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
      const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
      $hours.textContent = hours < 10 ? '0' + hours : hours;
      $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
      $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
     
      $hours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
      $minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
      $seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
      if ($lasthours) {
        $lasthours.textContent = hours < 10 ? '0' + hours : hours;
        $lasthours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
      }
      if ($lastminutes) {
        $lastminutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
        $lastminutes.textContent = minutes < 10 ? '0' + minutes : minutes;

      }
      if ($lastseconds) {
        $lastseconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
        $lastseconds.textContent = seconds < 10 ? '0' + seconds : seconds;

      }

      // показываем количество мест
      place.forEach(function(item) {
        item.textContent = hours;
        if (hours > 12) {
          item.textContent = hours - 1;
        } else if ( hours < 2) {
          item.textContent = 1;
        }
      })
    }
    // получаем элементы, содержащие компоненты даты
    const $hours = document.querySelector('.timer__hours');
    const $minutes = document.querySelector('.timer__minutes');
    const $seconds = document.querySelector('.timer__seconds');
    const $lasthours = document.querySelector('.last__hours');
    const $lastminutes = document.querySelector('.last__minutes');
    const $lastseconds = document.querySelector('.last__seconds');
    const place = document.querySelectorAll('#place-id');
    // вызываем функцию countdownTimer
    countdownTimer();
    // вызываем функцию countdownTimer каждую секунду
    timerId = setInterval(countdownTimer, 1000);


    const feedbackSlider = new Swiper('.feedback__body', {
      // Optional parameters
      loop: true,
  
      // If we need pagination
      pagination: {
        el: '.feedback-pagination',
      },
      navigation: {
        nextEl: '.feedback-navigation-next',
        prevEl: '.feedback-navigation-prev',
      },
    });
    const faqSlider = new Swiper('.faq__body', {
      // Optional parameters
      loop: true,
  
      // If we need pagination
      pagination: {
        el: '.faq-pagination',
      },
      navigation: {
        nextEl: '.faq-navigation-next',
        prevEl: '.faq-navigation-prev',
      },
      autoHeight:true,
    });

    //Модули обучения

    //необходимые переменные 
    const planText = document.querySelectorAll('.plan__text');
    const planBtn = document.querySelectorAll('.plan__tab');

    if (planBtn) {
      planBtn.forEach(function(btn){
        btn.addEventListener('click', () => {
          //меняем класс переключателя
          planBtn.forEach(function(i){
            i.classList.remove('active');
          })
          btn.classList.add('active');
  
          //меняем класс информации
          var currentTab = btn.dataset.tab;
          var currentText = document.querySelector(currentTab);
          planText.forEach(function(i){
            i.classList.remove('active')
          });
          currentText.classList.add('active');
        })
      })
    }
    
    // мобильная версия табов
    var accBtn = document.querySelectorAll('.plan-mobile__btn');
    var accList = document.querySelectorAll('.plan-mobile-info');

    if (accBtn) {

      for (i = 0; i < accBtn.length; i++) {
        accBtn[i].addEventListener('click', function() {

            if (!this.classList.contains('active-accord')) {
                const allAccord = document.querySelectorAll('.active-accord');
                allAccord.forEach(function(item){
                    item.click();
                })
            } 
            

            this.classList.toggle('active-accord')
            var accInfo = this.nextElementSibling;
            accInfo.classList.toggle('active')
  
            if (accInfo.style.maxHeight) {
                accInfo.style.maxHeight = null;
            } else {
                accInfo.style.maxHeight = accInfo.scrollHeight + 'px';
            }
        });
      }

      
    }

    var accBtn = document.querySelectorAll('.accordeon')
    var i;


    var playBtn = document.querySelector('.play-btn');
    var welcomeVideo = document.querySelector('.welcome-video');

    playBtn.addEventListener('click', ()=> {
      playBtn.classList.add('active');
      welcomeVideo.play();
      welcomeVideo.classList.add('active');
      welcomeVideo.setAttribute("controls", "controls")
    })
  });