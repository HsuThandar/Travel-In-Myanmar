let menu = document.querySelector('#menubar');
let navbar = document.querySelector('.navbar');
const slidecontainer = [...document.querySelectorAll('.slide-container')];
const prebtn = [...document.querySelectorAll('.next-btn')];
const nextbtn = [...document.querySelectorAll('.pre-btn')];
menu.onclick = ()=>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}


document.querySelector('#search').onclick = ()=>{
    document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = ()=>{
    document.querySelector('#search-form').classList.remove('active');
}

slidecontainer.forEach((item,i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;
    nextbtn[i].addEventListener('click',()=>{
        item.scrollLeft += containerWidth;

    })
    prebtn[i].addEventListener('click',()=>{
        item.scrollLeft -= containerWidth;

    })
    

})
// read more
function myFunction(value1,value2,value3) {
    var dots = document.getElementById(value3);
    var moreText = document.getElementById(value2);
    var btnText = document.getElementById(value1);
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
  }
// for section click
let currentURL = window.location.href;

document.querySelectorAll(".navbar a").forEach(p => {
  if(currentURL.indexOf(p.getAttribute("href")) !== -1){
    p.classList.add("active");
  }
})
