function calculateFibonacci() {
    let num = parseInt(document.getElementById('num').value);
    
    if (isNaN(num) || num < 0) {
        document.getElementById('fibonacciLbl').textContent = "Please enter a valid non-negative integer.";
        return;
    }

    let result = fibonacci(num);
    document.getElementById('fibonacciLbl').textContent = result;
}

function fibonacci(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;

    let a = 0, b = 1, temp;

    for (let i = 2; i <= n; i++) {
        temp = a + b;
        a = b;
        b = temp;
    }

    return b;
}
