// const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//         // console.log(entry);

//         if (entry.isIntersecting) {
//             entry.target.classList.add('show');
//         } else {
//             entry.target.classList.remove('show');
//         }
//     });
// });

// const hiddenElements = document.querySelectorAll('.hidden');

// hiddenElements.forEach(el => {
//     observer.observe(el)
// });


let options = {
    rootMargin: "0px",
    threshold: 1.0,
};

let addActive = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            let currentActive = document.querySelector("a.active-link");

            if (currentActive) {
                currentActive.classList.remove("active-link");
            }

            let newActive = document.querySelector(
                `a[href="#${entry.target.getAttribute("id")}"]`
            );
            newActive.classList.add("active-link");
        }
    });
};

let observer = new IntersectionObserver(addActive, options);

let sections = document.querySelectorAll("section");
sections.forEach((section) => {
    observer.observe(section);
});

// submiting contact form data into google sheet
const scriptURL = 'https://script.google.com/macros/s/AKfycbxw8xwnVKof9FnLZcbuiyeuySBRcIBN0PBq1AI7PcOoaBJX-Fk0R09pjV_dhOnZLnMc/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            form.reset();
            console.log('Success!', response)
        })
        .catch(error => console.error('Error!', error.message))
})

form.reset();