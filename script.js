document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('resultModal');
    const closeButton = document.getElementsByClassName('close')[0];

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            showModal();
        }
    });

    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    function validateForm() {
        let isValid = true;

        const age = document.getElementById('age');
        const income = document.getElementById('income');
        const extraIncome = document.getElementById('extraIncome');
        const deductions = document.getElementById('deductions');
        
        if (age.value === '') {
            displayError(age, 'ageError', '!');
            isValid = false;
        } else {
            hideError('ageError');
        }

        if (income.value === '' || isNaN(income.value)) {
            displayError(income, 'incomeError', '!');
            isValid = false;
        } else {
            hideError('incomeError');
        }

        if (extraIncome.value === '' || isNaN(extraIncome.value)) {
            displayError(extraIncome, 'extraIncomeError', '!');
            isValid = false;
        } else {
            hideError('extraIncomeError');
        }

        if (deductions.value === '' || isNaN(deductions.value)) {
            displayError(deductions, 'deductionsError', '!');
            isValid = false;
        } else {
            hideError('deductionsError');
        }

        return isValid;
    }

    function displayError(input, errorId, errorMessage) {
        input.classList.add('error');
        const errorElement = document.getElementById(errorId);
        errorElement.style.display = 'inline';
        errorElement.textContent = errorMessage;
    }

    function hideError(errorId) {
        const errorElement = document.getElementById(errorId);
        errorElement.style.display = 'none';
    }

    function showModal() {
        const age = document.getElementById('age').value;
        const income = parseFloat(document.getElementById('income').value);
        const extraIncome = parseFloat(document.getElementById('extraIncome').value);
        const deductions = parseFloat(document.getElementById('deductions').value);

        let tax = 0;
        if (income + extraIncome - deductions > 800000) {
            if (age === '<40') {
                tax = 0.3 * (income + extraIncome - deductions - 800000);
            } else if (age === '≥40 &lt;60') {
                tax = 0.4 * (income + extraIncome - deductions - 800000);
            } else if (age === '≥60') {
                tax = 0.1 * (income + extraIncome - deductions - 800000);
            }
        }

        const overallIncome = (income + extraIncome - deductions) - tax;

        const result = document.getElementById('result');
        result.innerHTML = `Overall Income after Tax Deductions: ${overallIncome.toFixed(2)} `;
        modal.style.display = "block";
    }
});
