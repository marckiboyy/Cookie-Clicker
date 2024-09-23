// Hent elementerne fra DOM'en
const cookie = document.getElementById('cookie');
const cookieCounter = document.getElementById('cookieCounter');
const upgrade1 = document.getElementById('upgrade1');
const upgrade2 = document.getElementById('upgrade2');
const upgrade3 = document.getElementById('upgrade3');
const Sigma = document.getElementById('Sigma');
const Delta = document.getElementById('Delta');
const Phillip = document.getElementById('Phillip');
const Christoffer = document.getElementById('Christoffer');
const prestigeButton = document.getElementById('prestigeButton');
const prestigeMultiplierText = document.getElementById('prestigeMultiplier');
const resetButton = document.getElementById('resetButton');

// Reset-funktion: Nulstil alle værdier og fjern data fra localStorage
resetButton.addEventListener('click', () => {
    // Bekræft med brugeren, om de virkelig vil nustille spillet
    const confirmation = confirm("Er du sikker på, at du vil nulstille hele spillet? Al din progression vil forsvinde!");

    if (confirmation) {
        // Nulstil alle spilvariabler
        cookieCount = 0;
        cookiesPerClick = 1;
        prestigeMultiplier = 1.00;

        // Slet data fra localStorage
        localStorage.removeItem('cookieCount');
        localStorage.removeItem('cookiesPerClick');
        localStorage.removeItem('prestigeMultiplier');

        // Opdater UI for at vise de nulstillede værdier
        updateCookieCounter();
        updatePrestigeMultiplier();
        checkUpgrades();

        alert("Spillet er blevet nulstillet. Du starter nu helt forfra.");
    }
});

// Variabler til at holde styr på antal cookies og klikværdi
let cookieCount = 0;
let cookiesPerClick = 1;
let prestigeMultiplier = 1.00; // Startmultiplikator for prestige

// Hent data fra localStorage, hvis der er noget
function loadGameData() {
    const savedCookies = localStorage.getItem('cookieCount');
    const savedCookiesPerClick = localStorage.getItem('cookiesPerClick');
    const upgrade1Purchased = localStorage.getItem('upgrade1Purchased');
    const upgrade2Purchased = localStorage.getItem('upgrade2Purchased');
    const upgrade3Purchased = localStorage.getItem('upgrade3Purchased');
    const SigmaPurchased = localStorage.getItem('Sigma');
    const DeltaPurchased = localStorage.getItem('Delta');
    const PhillipPurchased = localStorage.getItem('Phillip');
    const ChristofferPurchased = localStorage.getItem('Christoffer');
    const savedPrestigeMultiplier = localStorage.getItem('prestigeMultiplier');

    if (savedCookies !== null) {
        cookieCount = parseInt(savedCookies, 10) || 0; // Hvis gemte cookies er NaN, brug 0
    }
    if (savedCookiesPerClick !== null) {
        cookiesPerClick = parseInt(savedCookiesPerClick, 10) || 1; // Hvis gemte klikværdi er NaN, brug 1
    }
    if (upgrade1Purchased === 'true') {
        upgrade1.disabled = true; // Deaktiver opgradering 1, hvis den allerede er købt
    }
    if (upgrade2Purchased === 'true') {
        upgrade2.disabled = true; // Deaktiver opgradering 2, hvis den allerede er købt
    }
    if (upgrade3Purchased === 'true') {
        upgrade3.disabled = true; // Deaktiver opgradering 3, hvis den allerede er købt
    }
    if (SigmaPurchased === 'true') {
        Sigma.disabled = true; // Deaktiver Sigma, hvis den allerede er købt
    }
    if (DeltaPurchased === 'true') {
        Delta.disabled = true; // Deaktiver Delta, hvis den allerede er købt
    }
    if (PhillipPurchased === 'true') {
        Phillip.disabled = true; // Deaktiver Phillip, hvis den allerede er købt
    }
    if (ChristofferPurchased === 'true') {
        Christoffer.disabled = true; // Deaktiver Christoffer, hvis den allerede er købt
    }
    if (savedPrestigeMultiplier !== null) {
        prestigeMultiplier = parseFloat(savedPrestigeMultiplier) || 1.00; // Hvis gemte muliplikator er NaN, brug 1.00
    }

    updateCookieCounter();
    updatePrestigeMultiplier();
}

// Gem data i localStorage
function saveGameData() {
    localStorage.setItem('cookieCount', cookieCount);
    localStorage.setItem('cookiesPerClick', cookiesPerClick);
    localStorage.setItem('upgrade1Purchased', upgrade1.disabled); // Gem om upgrade1 er købt
    localStorage.setItem('upgrade2Purchased', upgrade2.disabled); // Gem om upgrade2 er købt
    localStorage.setItem('upgrade3Purchased', upgrade3.disabled); // Gem om upgrade3 er købt
    localStorage.setItem('Sigma', Sigma.disabled); // Gem om Sigma er købt
    localStorage.setItem('Delta', Delta.disabled); // Gem om Delta er købt
    localStorage.setItem('Phillip', Phillip.disabled); // Gem om Phillip er købt
    localStorage.setItem('Christoffer', Christoffer.disabled); // Gem om Christoffer er købt
    localStorage.setItem('prestigeMultiplier', prestigeMultiplier);
}

// Opdater cookie tælleren på skærmen
function updateCookieCounter() {
    cookieCounter.textContent = `Cookies: ${Math.floor(cookieCount)}`; // Viser kun hele cookies
}

// Opdater prestige-multiplikatoren på skærmen
function updatePrestigeMultiplier() {
    prestigeMultiplierText.textContent = `Multiplikator: x${prestigeMultiplier.toFixed(2)}`; // Vis multiplikatoren med to decimaler
}

// Klik på cookie-billedet for at få flere cookies
cookie.addEventListener('click', () => {
    cookieCount += cookiesPerClick * prestigeMultiplier;
    updateCookieCounter();
    saveGameData(); // Gem data efter hvert klik
});

// Køb Opgradering 1: Øger cookies per klik med 1, koster 50 cookies
upgrade1.addEventListener('click', () => {
    if (cookieCount >= 100) {
        cookieCount -= 100;
        cookiesPerClick += 1;
        updateCookieCounter();
        upgrade1.disabled = true; // Deaktiver knappen efter køb
        saveGameData(); // Gem data efter køb
    }
});

// Køb Opgradering 2: Øger cookies per klik med 5, koster 200 cookies
upgrade2.addEventListener('click', () => {
    if (cookieCount >= 500) {
        cookieCount -= 500;
        cookiesPerClick += 3;
        updateCookieCounter();
        upgrade2.disabled = true; // Deaktiver knappen efter køb
        saveGameData(); // Gem data efter køb
    }
});

// Køb Opgradering 3: Øger cookies per klik med 10, koster 5000 cookies
upgrade3.addEventListener('click', () => {
    if (cookieCount >= 5000) {
        cookieCount -= 5000;
        cookiesPerClick += 10;
        updateCookieCounter();
        upgrade3.disabled = true; // Deaktiver knappen efter køb
        saveGameData(); // Gem data efter køb
    }
})

// Køb Sigma: Øger cookies per klik med 10.000, koster 1.000.000 cookies
Sigma.addEventListener('click', () => {
    if (cookieCount >= 1000000) {
        cookieCount -= 1000000;
        cookiesPerClick += 10000;
        updateCookieCounter();
        Sigma.disabled = true; // Deaktiver knappen efter køb
        saveGameData(); // Gem data efter køb
    }
})

// Køb Delta: Øger cookies per klik med 10.000, koster 1.000.000 cookies
Delta.addEventListener('click', () => {
    if (cookieCount >= 1000000) {
        cookieCount -= 1000000;
        cookiesPerClick += 10000;
        updateCookieCounter();
        Delta.disabled = true; // Deaktiver knappen efter køb
        saveGameData(); // Gem data efter køb
    }
})

// Køb Phillip: Øger cookies per klik med 1.000.000.000, koster 1.000.000.000 cookies
Phillip.addEventListener('click', () => {
    if (cookieCount >= 1000000000) {
        cookieCount -= 1000000000;
        cookiesPerClick += 1000000000;
        updateCookieCounter();
        Phillip.disabled = true; // Deaktiver knappen efter køb
        saveGameData(); // Gem data efter køb
    }
})

// Køb Christoffer: Øger cookies per klik med 69, koster 69 cookies
Christoffer.addEventListener('click', () => {
    if (cookieCount >= 69) {
        cookieCount -= 69;
        cookiesPerClick += 69;
        updateCookieCounter();
        Christoffer.disabled = true; // Deaktiver knappen efter køb
        saveGameData(); // Gem data efter køb
    }
})

// Prestige-funktion: Øger multiplikatoren og nulstiller cookies
prestigeButton.addEventListener('click', () => {
    if (cookieCount >= 100000) {
        cookieCount = 0; // Kostnad ved prestige
        cookiesPerClick = 1; // Nulstil cookies per klik
        prestigeMultiplier *= 1.25; // Øg multiplikatoren med 25%

        // Opdater tilstanden på opgraderingsknapper, da de nu er nulstillet
        updateCookieCounter();
        updatePrestigeMultiplier();
        checkUpgrades();
        saveGameData();

        alert(`Du har prestiget! Din nye multiplikator er x${prestigeMultiplier.toFixed(2)}. Du starter nu forfra med 0 cookies.`);
    }
});

// Opdater knaptilstand (deaktiver knapper, hvis der ikke er nok cookies)
function checkUpgrades() {
    upgrade1.disabled = cookieCount < 100;
    upgrade2.disabled = cookieCount < 500;
    upgrade3.disabled = cookieCount < 5000;
    Sigma.disabled = cookieCount < 1000000;
    Delta.disabled = cookieCount < 1000000;
    Phillip.disabled = cookieCount < 1000000000;
    Christoffer.disabled = cookieCount < 69;
    prestigeButton.disabled = cookieCount < 100000; // Deaktiver prestige-knappen, hvis der ikke er nok cookies
}

// Tjek opgraderingsmulighederne hvert klik
setInterval(checkUpgrades, 100);

// Når siden indlæses, skal vi hente de gemte data
window.onload = loadGameData;