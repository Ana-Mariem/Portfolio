document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', function () {
        const activeButton = document.querySelector('.accordion-button.active');
        if (activeButton && activeButton !== this) {
            activeButton.classList.toggle('active');
            activeButton.nextElementSibling.style.maxHeight = null;
        }

        this.classList.toggle('active');
        const content = this.nextElementSibling;
        if (this.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.style.maxHeight = null;
        }
    });
});
