const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // console.log(entry);

        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');

hiddenElements.forEach(el => {
    observer.observe(el)
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