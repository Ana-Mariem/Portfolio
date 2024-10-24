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

document.getElementById('schedule-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene que se recargue la página al enviar el formulario

    // Obtener los valores del formulario
    const date = document.getElementById('date').value;
    const timeStart = document.getElementById('time-start').value;
    const timeEnd = document.getElementById('time-end').value;
    const activity = document.getElementById('activity').value;
    const place = document.getElementById('place').value;
    const type = document.getElementById('type').value;
    const notes = document.getElementById('notes').value;
    const flag = document.getElementById('flag').value;
    const freeBusy = document.getElementById('free-busy').checked ? 'Busy' : 'Free';

    // Crear una nueva fila en la tabla
    const table = document.getElementById('schedule-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    // Insertar celdas con los datos en la nueva fila
    newRow.insertCell(0).textContent = date;
    newRow.insertCell(1).textContent = timeStart;
    newRow.insertCell(2).textContent = timeEnd;
    newRow.insertCell(3).textContent = activity;
    newRow.insertCell(4).textContent = place;
    newRow.insertCell(5).textContent = type;
    newRow.insertCell(6).textContent = notes;
    newRow.insertCell(7).textContent = flag;
    newRow.insertCell(8).textContent = freeBusy;

    // Limpiar el formulario después de enviar
    document.getElementById('schedule-form').reset();
});
