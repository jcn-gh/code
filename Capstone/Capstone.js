// Add event listener to the parent element using event delegation
document.querySelector('.burger').addEventListener('click', function(event) {
    // Check if the list has already been created
    if (!ul) {
        // Seleccionar todos los elementos con clase "nav-links"
        const navLinks = document.querySelectorAll('.nav-links');

        // Crear una lista <ul> para contener los elementos
        var ul = document.createElement('ul');

        // Iterar sobre los elementos y crear un <li> para cada uno
        navLinks.forEach(function(navLink) {
            const li = document.createElement('li');
            li.textContent = navLink.textContent;
            ul.appendChild(li);
        });

        // Guardar la lista en memoria
        event.target.appendChild(ul);
    } else {
        // Si la lista ya existe, mostrarla estableciendo el estilo display a "block"
        ul.style.display = 'block';
    }
});

// Add event listener to close the list when the burger is clicked again
document.querySelector('.burger').addEventListener('click', function(event) {
    // Check if the list exists
    if (ul) {
        // Ocultar la lista estableciendo el estilo display a "none"
        ul.style.display = 'none';
    }
});