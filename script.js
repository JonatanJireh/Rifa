document.addEventListener('DOMContentLoaded', () => {
    const nameForm = document.getElementById('nameForm');
    const nameInput = document.getElementById('nameInput');
    const nameList = document.getElementById('nameList');
    const selectRandomButton = document.getElementById('selectRandom');
    const randomNameDisplay = document.getElementById('randomName');

    // Recuperar nombres almacenados en localStorage
    const names = JSON.parse(localStorage.getItem('names')) || [];

    // Actualizar la lista de nombres en el DOM
    const updateNameList = () => {
        if (nameList) {
            nameList.innerHTML = '';
            names.forEach((name, index) => {
                const li = document.createElement('li');
                li.textContent = `${index + 1}. ${name}`;
                nameList.appendChild(li);
            });
        }
    };

    // Manejar el envío del formulario para agregar un nuevo nombre
    if (nameForm) {
        nameForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = nameInput.value.trim();
            if (name) {
                names.push(name);
                localStorage.setItem('names', JSON.stringify(names));
                nameInput.value = '';
                updateNameList();
            }
        });
    }

    // Manejar la selección aleatoria de un nombre y su eliminación de la lista
    if (selectRandomButton) {
        selectRandomButton.addEventListener('click', () => {
            const storedNames = JSON.parse(localStorage.getItem('names')) || [];
            if (storedNames.length > 0) {
                const randomIndex = Math.floor(Math.random() * storedNames.length);
                const selectedName = storedNames.splice(randomIndex, 1)[0];
                randomNameDisplay.textContent = selectedName;
                localStorage.setItem('names', JSON.stringify(storedNames));
                updateNameList();
            } else {
                randomNameDisplay.textContent = 'No hay nombres registrados.';
            }
        });
    }

    updateNameList();
});
