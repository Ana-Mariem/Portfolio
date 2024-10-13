document.getElementById('btn').addEventListener('click', function () {
    let num = parseInt(document.getElementById('num').value);
    let primes = sieveOfEratosthenes(num);
    document.getElementById('primes').textContent = primes.join(', ');
});

function sieveOfEratosthenes(limit) {
    let sieve = [];
    let primes = [];

    for (let i = 2; i <= limit; i++) {
        sieve[i] = true;
    }

    // Algoritmo de la Criba de Eratóstenes
    for (let p = 2; p * p <= limit; p++) {
        if (sieve[p]) {
            for (let multiple = p * p; multiple <= limit; multiple += p) {
                sieve[multiple] = false;
            }
        }
    }

    
    for (let i = 2; i <= limit; i++) {
        if (sieve[i]) {
            primes.push(i);
        }
    }

    return primes;
}
