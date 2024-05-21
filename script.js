
    document.addEventListener("DOMContentLoaded", function() {
        const inputs = document.querySelectorAll('input[type="text"], input[type="number"], select');

        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (input.value.trim() !== "") {
                    input.classList.add('completed');
                } else {
                    input.classList.remove('completed');
                }
            });
        });
    });

