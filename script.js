





//automatically add dots based on number of images in slideshow

const photoClassElements = document.getElementsByClassName('photo')
const numOfPhotos = photoClassElements.length
console.log(numOfPhotos)

const dotParentElement = document.getElementById('slideshow-dot-container')
for (let i = 0; i < numOfPhotos; i++) {
  dotParentElement.innerHTML += `<div class="dot" id="dot-${i}" onclick="dotScroll(${i})"></div>`
}


let currentDotPosition = 0
const dotElements = document.getElementsByClassName('dot')
dotElements[0].classList.add('dot-active')


const dotPositionChange = () => {
    // console.log(num)
    // console.log(dotElements)
    console.log(currentDotPosition)

    for (let i = 0; i < numOfPhotos; i++) {
        if (i == currentDotPosition) {
            dotElements[i].classList.add('dot-active')
        } else {
            dotElements[i].classList.remove('dot-active')
        }
    }
    // dotElements.forEach((element, index) => {
    //     console.log(index, num)
    //     // if (index == num) {
    //     //     element.classList.add('dot-active')
    //     // } else {
    //     //     element.classList.remove('dot-active')
    //     // }
        
    // })
}


const scrollableElement = document.getElementById('slideshow');
// const currentScrollPosition = scrollableElement.scrollLeft; // not necessary? always 0






const dotScroll = (dotIndex) => {
    console.log(dotIndex)

    scrollableElement.scrollTo({
        left: dotIndex * scrollableElement.scrollWidth/numOfPhotos,
        behavior: 'smooth'
    })

    currentDotPosition = dotIndex
    dotPositionChange()
    pauseScroll()
}


const scrollToLeft = () => {
    // console.log('hi')
    // const scrollableElement = document.getElementById('slideshow');

    // const currentScrollPosition = scrollableElement.scrollLeft;

//     scrollableElement.scrollTo({
//     // top: 0,/
//         left: -window.innerWidth,
//         behavior: 'smooth'
//   })

    // console.log(curr)
    // console.log(scrollableElement.scrollWidth/numOfPhotos)


    if (currentDotPosition > 0) {
        console.log(61, currentDotPosition)
         
        scrollableElement.scrollTo({
            // left:currentScrollPosition + document.getElementsByClassName('photo')[0].getBoundingClientRect().width + 2.5,
            // left:currentScrollPosition - scrollableElement.scrollWidth/numOfPhotos,
            left: (currentDotPosition - 1) * scrollableElement.scrollWidth/numOfPhotos,
            behavior: 'smooth'
        })

        currentDotPosition --
        dotPositionChange()
        

    } else {
        scrollableElement.scrollTo({
            left: scrollableElement.scrollWidth * (numOfPhotos - 1),
            behavior: "smooth"
        })
        currentDotPosition = numOfPhotos - 1
        dotPositionChange()
    }
}



const scrollToRight = () => {
    // const scrollableElement = document.getElementById('slideshow');

    // Get current horizontal scroll position

    // const currentScrollPosition = scrollableElement.scrollLeft;

    // Scroll to a specific horizontal position (e.g., 200 pixels from the left)
    // console.log(window.innerWidth)
    // scrollableElement.scrollLeft = ;

    // console.log(currentScrollPosition)
    // console.log(window.innerWidth)


    console.log(scrollableElement.scrollWidth)
    console.log(scrollableElement.getBoundingClientRect().width)
    // console.log(currentScrollPosition)
    // console.log(scrollableElement.scrollWidth - currentScrollPosition)
    console.log(window.innerWidth)

    console.log(document.getElementsByClassName('photo')[0].getBoundingClientRect().width)


    // const photoClassElements = document.getElementsByClassName('photo')
    // const numOfPhotos = photoClassElements.length


    if (currentDotPosition < numOfPhotos - 1) {
        scrollableElement.scrollTo({
            // left:currentScrollPosition + document.getElementsByClassName('photo')[0].getBoundingClientRect().width + 2.5,
            // left:currentScrollPosition + scrollableElement.scrollWidth/numOfPhotos,
            left: (currentDotPosition + 1) * scrollableElement.scrollWidth/numOfPhotos,
            behavior: 'smooth'
        })

        currentDotPosition ++ 
        dotPositionChange()
        

    } else {
        scrollableElement.scrollTo({
            left: 0,
            behavior: "smooth"
        })
        currentDotPosition = 0
        dotPositionChange()
    }





    // // if (scrollableElement.scrollWidth - currentScrollPosition <= document.getElementsByClassName('photo')[0].offsetWidth) {
    // if (scrollableElement.scrollWidth - currentScrollPosition <= window.outerWidth) {
    // // if (scrollableElement.scrollWidth - currentScrollPosition <= scrollableElement.getBoundingClientRect().width) {
    //     scrollableElement.scrollTo({
    //         left: 0,
    //         behavior: "smooth"
    //     })
    // } else {
    //     scrollableElement.scrollTo({
    //     // top: 0,/
    //     // left:currentScrollPosition + document.getElementsByClassName('photo')[0].scrollWidth,
    //     left:currentScrollPosition + document.getElementsByClassName('photo')[0].getBoundingClientRect().width + 2.5,
    //     // left:currentScrollPosition + scrollableElement.scrollWidth/numOfPhotos + 1,
    //     // left:currentScrollPosition + window.innerWidth,
    //     behavior: 'smooth'
    // })
    // }
}

addEventListener("resize", (event) => {
    scrollableElement.scrollTo({
        left: currentDotPosition * scrollableElement.scrollWidth/numOfPhotos,
        behavior: "auto"
    })
})





const elem = document.getElementById("progress-bar");   
let width = 0;
let id = setInterval(frame, 10);//10 = 10 sec
function frame() {
        if (width > 99) {
        // clearInterval(id);
        width = 0

        // const scrollableElement = document.getElementById('slideshow')

        
        scrollToRight()
        

        } else {
        width+=.1; 
        elem.style.width = width + '%'; 
        // elem.innerHTML = width * 1  + '%';
        }
    }

const scrollPlay = () => {
    scrollableElement.scrollTo({
        left: currentDotPosition * scrollableElement.scrollWidth/numOfPhotos,
        behavior: 'smooth'
    })
    
    id = setInterval(frame, 10);
}



const pauseScroll = () => {
    console.log('pausescroll called')
    elem.style.width = 0
    // id = null
    clearInterval(id)

    document.getElementById('autoplay').innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'
}

const playorpause = (el) => {
    console.log(el.innerHTML.trim())

    if (el.innerHTML.trim() == '<i class="fa fa-pause" aria-hidden="true"></i>') {
        
        pauseScroll()
    } else {
        el.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>'
        scrollPlay()
    }
}


// pauseScroll() //while developing

// scrollPlay() // autoscroll slideshow





const whenSlideShowIsScrolled = () => {
    pauseScroll()
    for (let index = 0; index < numOfPhotos; index++) {
        if (scrollableElement.scrollLeft >= (scrollableElement.scrollWidth / numOfPhotos) * index) {
        // if (scrollableElement.scrollLeft >= photoClassElements[index].offsetLeft) { // when slideshow fontsize is 0
            currentDotPosition = index
            dotPositionChange()
        }
    }  
}





scrollableElement.addEventListener('wheel', (event) => {
    console.log(264, event.deltaX, event.deltaY)
    // if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
    if (event.deltaX != 0) {
        whenSlideShowIsScrolled()
    // Horizontal scroll detected
    // console.log("Horizontal scroll:", event.deltaX);
    // event.preventDefault(); // optional: prevents vertical scrolling
  }
})
scrollableElement.addEventListener('touchmove', whenSlideShowIsScrolled)


// tempolarilry disabled ----- consider fix -----

// const photoDescriptions = document.getElementsByClassName('photo-description')

// for (let index = 0; index < photoDescriptions.length; index++) {
//     const element = photoDescriptions[index];
//     element.addEventListener('touchend', (e) => {
//         if(e.cancelable){
//             e.preventDefault()
//         }
//         element.classList.toggle('photo-description-tap-active');
//     })
// }

// const basesellerPhotos = document.getElementsByClassName('beseseller-photo')

// for (let index = 0; index < basesellerPhotos.length; index++) {
//     const element = basesellerPhotos[index];
//     element.addEventListener('touchend', (e) => {
//         console.log(e)
//         // if (Math.abs(e.deltaX)<5 && Math.abs(e.deltaY)<5) {
//         if(e.cancelable){
//             e.preventDefault()
//         }
        
//         element.classList.toggle('photo-img-active');
//         // }
        
//     })
// }

// document.querySelector('.bestseller-photos').addEventListener('mousemove', (e) => {

//     console.log(298)
//     // e.preventDefault()

//     for (let index = 0; index < basesellerPhotos.length; index++) {
//         const element = basesellerPhotos[index];
//         // element.addEventListener('touchstart', (e) => {
//             // e.preventDefault()
//             element.classList.remove('photo-img-active')
//             // element.classList.remove('photo-description-tap-active');
//         // })
//     }

//     for (let index = 0; index < photoDescriptions.length; index++) {
//         const element = photoDescriptions[index];

//         element.classList.remove('photo-description-tap-active');
    
//     }
// })






// tempolarilry disabled ----- consider fix END-----











// addEventListener("mousemove", (event) => {
//     for (let index = 0; index < basesellerPhotos.length; index++) {
//         const element = basesellerPhotos[index];
//         element.addEventListener('touchstart', (e) => {
//             e.preventDefault()
//             element.classList.remove('photo-img-active');
//         })
//     }
// })

// Prevent default CSS hover from being sticky on touch
// box.addEventListener('touchstart', (e) => {
//     console.log(280)
//   e.preventDefault(); // optional: prevents ghost click
//   box.classList.toggle('photo-description-tap-active');
//   document.querySelector()
// });


const hoursElement = document.getElementById('hours-container')
const hoursExpandButton = document.getElementById('expand-button')
const expandElement = document.getElementById('hours-expanded')
// hoursExpandButton.addEventListener('click', (e) => {
//     if (hoursExpandButton.innerHTML.trim() == '<i class="fa fa-angle-down" aria-hidden="true"></i>') {

//         hoursExpandButton.innerHTML = '<i class="fa fa-angle-up" aria-hidden="true"></i>'
//         // expandElement.style.removeProperty('display')
//         expandElement.style.display = 'block'
//         // hoursExpandButton.style.height = '7rem'
//         hoursElement.style.paddingTop = "5.0rem"
//     } else {
//         hoursExpandButton.innerHTML = '<i class="fa fa-angle-down" aria-hidden="true"></i>'
//         expandElement.style.display = 'none'
        
//         hoursElement.style.paddingTop = "2.5rem"
//     }

    
    
// })

// window.addEventListener('click', (e) => {
//     // if (!expandElement.contains(e.target) &&  hoursExpandButton.innerHTML.trim() == '<i class="fa fa-angle-down" aria-hidden="true"></i>') {
//     if (!expandElement.contains(e.target) && hoursExpandButton.contains(e.target) ) {
//         console.log('376')
//         hoursExpandButton.innerHTML = '<i class="fa fa-angle-down" aria-hidden="true"></i>'
//         expandElement.style.display = 'none'
        
//         hoursElement.style.paddingTop = "2.5rem"
//     }
// })


const refreshOpenorClosed = () => {
    const openHoursList = [
        {day: 'Sun', openFrom: '8:00am', endAt: '6:00pm'},
        {day: 'Mon', openFrom: '8:00am', endAt: '6:00pm'},
        {day: 'Tue', openFrom: '8:00am', endAt: '6:00pm'},
        {day: 'Wed', openFrom: '8:00am', endAt: '6:00pm'},
        {day: 'Thu', openFrom: '8:00am', endAt: '6:00pm'},
        {day: 'Fri', openFrom: '8:00am', endAt: '6:00pm'},
        {day: 'Sat', openFrom: '8:00am', endAt: '6:00pm'}
        
    ]

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const today = new Date()
    console.log(today.getDay())

    for (let index = 0; index < openHoursList.length; index++) {

        if (today.getDay() == index) {
            expandElement.innerHTML += `<div class="day-hour"><div class="day day-active">${openHoursList[index].day}</div><div class="a">${openHoursList[index].openFrom} - ${openHoursList[index].endAt}</div></div>`
        }else {
            expandElement.innerHTML += `<div class="day-hour"><div class="day">${openHoursList[index].day}</div><div class="a">${openHoursList[index].openFrom} - ${openHoursList[index].endAt}</div></div>`
        }

        
    }


    let todaysOpenStartFromHour = Number(openHoursList[today.getDay()].openFrom.split(':')[0])
    // console.log(openHoursList[today.getDay()].openFrom.split(':'))
    // console.log(todaysOpenStartFromHour)
    if (openHoursList[today.getDay()].openFrom.slice(-2) == 'pm') {
        todaysOpenStartFromHour += 12
    }

    const todaysOpenStartFromMin = Number(openHoursList[today.getDay()].openFrom.slice(-4,-2))
    // console.log(todaysOpenStartFromMin)


    let todaysOpenEndAtHour = Number(openHoursList[today.getDay()].endAt.split(':')[0])
    // console.log(openHoursList[today.getDay()].openFrom.split(':'))
    // console.log(todaysOpenStartFromHour)
    console.log(openHoursList[today.getDay()].endAt.slice(-2))
    if (openHoursList[today.getDay()].endAt.slice(-2) == 'pm') {
        
        todaysOpenEndAtHour += 12
    }

    let todaysOpenEndAtMin = Number(openHoursList[today.getDay()].endAt.slice(-4,-2))
    // console.log(todaysOpenStartFromMin)


    console.log(today.getHours())
    console.log(today.getMinutes())
    console.log(todaysOpenStartFromHour)
    console.log(todaysOpenEndAtHour)
    console.log(todaysOpenStartFromMin)
    console.log(todaysOpenEndAtMin)

    if (todaysOpenEndAtMin == 0){
        todaysOpenEndAtMin = 59
        todaysOpenEndAtHour -= 1
    }

    if (today.getHours() >= todaysOpenStartFromHour && today.getHours() <= todaysOpenEndAtHour
        && today.getMinutes() >= todaysOpenStartFromMin && today.getMinutes() <= todaysOpenEndAtMin) {

        document.getElementById('todays-hour').innerHTML = `${openHoursList[today.getDay()].openFrom} - ${openHoursList[today.getDay()].endAt}`
    } else {
        document.getElementById('hour-title').innerHTML = 'Closed'
        document.getElementById('hour-title').style.color = 'red'
        document.getElementById('todays-hour').innerHTML = ''
    }
}

refreshOpenorClosed()

// setInterval(refreshOpenorClosed, 60 * 1000);







const expandButton = document.getElementById('hours-container');

document.addEventListener('click', function(event) {
  if (expandButton.contains(event.target)) {
    console.log(466)

    if (hoursExpandButton.innerHTML.trim() == '<i class="fa fa-angle-down" aria-hidden="true"></i>') {

        hoursExpandButton.innerHTML = '<i class="fa fa-angle-up" aria-hidden="true"></i>'
        // expandElement.style.removeProperty('display')

        expandElement.style.display = 'block'

        // expandElement.style.opacity = '1'




        // hoursExpandButton.style.height = '7rem'
        hoursElement.style.paddingTop = "5.0rem"
    } else {
        hoursExpandButton.innerHTML = '<i class="fa fa-angle-down" aria-hidden="true"></i>'
        expandElement.style.display = 'none'

        // expandElement.style.opacity = '0'
        
        hoursElement.style.paddingTop = "2.5rem"
    }


    } else {
        hoursExpandButton.innerHTML = '<i class="fa fa-angle-down" aria-hidden="true"></i>'



        expandElement.style.display = 'none'

        // expandElement.style.opacity = '1'



        
        hoursElement.style.paddingTop = "2.5rem"
    }
    // Your logic here
});






// Initialize the map
// const map = L.map('map').setView([52.5194, 13.4089], 13); // [lat, lon], zoom
const map = L.map('map').setView([43.656797726924516, -79.38383984748788], 15); // [lat, lon], zoom

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
}).addTo(map);

// Optional: Add a marker
L.marker([43.656797726924516, -79.38383984748788])
    .addTo(map)
    .bindPopup('Reply')
    .openPopup();





// scroll active light feature

window.addEventListener('scroll', () => {
    const menuSectionHeader = document.getElementById('memu-section-header')
    const mobileMenuSectionHeader = document.getElementById('mobile-memu-section-header')
    const menuSection = document.getElementById('menu-section')

    const headerOffset = 85
    const scrollPosition = window.scrollY + headerOffset

    if ( scrollPosition >=  menuSection.offsetTop && scrollPosition <= (menuSection.offsetTop + menuSection.offsetHeight)) {
        menuSectionHeader.classList.add('header-option-active')
        mobileMenuSectionHeader.classList.add('mobile-header-option-active')
    } else {
        menuSectionHeader.classList.remove('header-option-active')
        mobileMenuSectionHeader.classList.remove('mobile-header-option-active')
    }

})

window.addEventListener('scroll', () => {
    const locationSectionHeader = document.getElementById('location-section-header')
    const mobileLocationSectionHeader = document.getElementById('mobile-location-section-header')
    // console.log(mobileLocationSectionHeader)
    const menuSection = document.getElementById('location-section')

    const headerOffset = 85
    const scrollPosition = window.scrollY + headerOffset

    if ( scrollPosition >=  menuSection.offsetTop && scrollPosition <= (menuSection.offsetTop + menuSection.offsetHeight)) {
        // console.log(564)
        locationSectionHeader.classList.add('header-option-active')
        // console.log(mobileLocationSectionHeader.classList)
        mobileLocationSectionHeader.classList.add('mobile-header-option-active') // why dows this not work???
        // console.log(mobileLocationSectionHeader.classList)
        // console.log()
        // mobileLocationSectionHeader.style.borderBottom = "1px solid rgb(197, 67, 178)"

        // console.log(567)
    } else {
        locationSectionHeader.classList.remove('header-option-active')
        mobileLocationSectionHeader.classList.remove('mobile-header-option-active') // why not working??????
        // mobileLocationSectionHeader.style.borderBottom = "none"
        
    }


})
window.addEventListener('scroll', () => {
    const StorySectionHeader = document.getElementById('story-section-header')
    const MobileStorySectionHeader = document.getElementById('mobile-story-section-header')
    const menuSection = document.getElementById('story-section')

    const headerOffset = 85
    const scrollPosition = window.scrollY + headerOffset

    if ( scrollPosition >=  menuSection.offsetTop && scrollPosition <= (menuSection.offsetTop + menuSection.offsetHeight)) {
        StorySectionHeader.classList.add('header-option-active')
        MobileStorySectionHeader.classList.add('mobile-header-option-active')
        // MobileStorySectionHeader.style.borderBottom = "1px solid rgb(197, 67, 178)"
    } else {
        StorySectionHeader.classList.remove('header-option-active')
        MobileStorySectionHeader.classList.remove('mobile-header-option-active')
        // MobileStorySectionHeader.style.borderBottom = "none"
    }


})






const expandMobileMenu = () => {
    console.log('589')
    const el = document.getElementById('mobile-menu-expanded')
    el.style.width = '100%'
    el.style.opacity = 1
    el.style.zIndex = 101
}

const closeMobileMenu = () => {
    console.log(597)
    const el = document.getElementById('mobile-menu-expanded')
    el.style.width = '0%'
    
    el.style.zIndex = 99
    el.style.opacity = 0
}




const scrollToCategory = (idName) => {
    const el = document.getElementById(idName)

    el.scrollIntoView({ behavior: 'smooth' });
}


const scrollToSection = (sectionName) => {
    const el = document.getElementById(sectionName)
    el.scrollIntoView({ behavior: 'smooth' });
    closeMobileMenu()
}