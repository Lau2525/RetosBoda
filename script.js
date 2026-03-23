// --- CONFIGURACIÓN PARA GOOGLE DRIVE E INTERNET REAL-TIME ---
// Pega aquí el link que te dio tu script de Google Drive (el que termina en /exec)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxLTiDv_CqCXTruNbA_xEFCWxq4T74AJLH_XzIvV6P_KEFj_nzkJ31vCgxSGOTuGuPd/exec"; 


const challenges = [
    { id: "c1", points: 20, es: "Tómate una selfie con los novios", en: "Take a selfie with the bride and groom" },
    { id: "c2", points: 10, es: "Haz un brindis con alguien que no conozcas", en: "Make a toast with someone you don't know" },
    { id: "c3", points: 10, es: "Baila con una abuela o abuelo", en: "Dance with a grandmother or grandfather" },
    { id: "c4", points: 10, es: "Saca una foto a un momento romántico oculto", en: "Snap a photo of a hidden romantic moment" },
    { id: "c5", points: 10, es: "Tómate una foto divertida en el photobooth con amigos", en: "Take a funny photo in the photobooth with friends" },
    { id: "c6", points: 10, es: "Pide al DJ una canción y baila en el centro de la pista", en: "Request a song and dance in the middle of the dance floor" },
    { id: "c7", points: 10, es: "Deja un mensaje original en el libro de firmas", en: "Leave an original message in the guestbook" },
    { id: "c8", points: 10, es: "Encuentra a alguien que lleve un vestido/traje similar al tuyo", en: "Find someone wearing an outfit similar to yours" },
    { id: "c9", points: 15, es: "Tómale una foto a tu platillo favorito de la fiesta", en: "Take a picture of your favorite dish at the party" },
    { id: "c10", points: 10, es: "Tómate un shot con los novios", en: "Take a shot with the bride and groom" },
    { id: "c11", points: 50, isBonus: true, es: "Bonus: Atrapa el ramo de la novia", en: "Bonus: Catch the bride's bouquet" },
    { id: "c12", points: 50, isBonus: true, es: "Bonus: Atrapa el azahar del novio", en: "Bonus: Catch the groom's boutonniere" }
];

const uiTexts = {
    es: {
        title: "Retos de Boda",
        instructions: "¡Diviértete completando estos retos durante la fiesta!<br>Marca cada reto logrado, GANA PUNTOS y sube tu evidencia.",
        uploadLabel: "Subir foto",
        uploadedLabel: "Foto lista",
        playerLbl: "Jugador",
        ptsLbl: "pts",
        leaderboardBtn: "Tablero Global",
        welcomeTitle: "¡Bienvenido!",
        welcomeInstr: "Ingresa tu nombre para guardar tus puntos en el Tablero Global en tiempo real.",
        startBtn: "Comenzar",
        lbTitle: "Tablero Global",
        lbInstr: "Líderes de la boda en vivo",
        ptsWord: "pts",
        uploading: "Subiendo nube... ⏳",
        errUpload: "Error al subir ❌",
        viewPhoto: "Ver Foto (Drive)",
        concludeDesc: "Da click cuando te sientas satisfecho con tus retos cumplidos para concluir tu participación",
        concludeBtn: "Concluir mi participación",
        concludeSuccess: "¡Gracias por participar! Tu evidencia y tus puntos han sido enviados a los novios directamente.",
        concludeErr: "Hubo un error al enviar. ¿Aún tienes internet?"
    },
    en: {
        title: "Wedding Challenges",
        instructions: "Have fun completing these challenges!<br>Check off achieved challenges, EARN POINTS, and upload evidence.",
        uploadLabel: "Upload photo",
        uploadedLabel: "Photo ready",
        playerLbl: "Player",
        ptsLbl: "pts",
        leaderboardBtn: "Leaderboard",
        welcomeTitle: "Welcome!",
        welcomeInstr: "Enter your name to save your points on the Global Live Leaderboard.",
        startBtn: "Start",
        lbTitle: "Global Leaderboard",
        lbInstr: "Live wedding leaders",
        ptsWord: "pts",
        uploading: "Uploading cloud... ⏳",
        errUpload: "Upload Error ❌",
        viewPhoto: "View Photo (Drive)",
        concludeDesc: "Click when you feel satisfied with your completed challenges to conclude your participation",
        concludeBtn: "Conclude my participation",
        concludeSuccess: "Thank you for participating! Your evidence and points have been sent to the couple.",
        concludeErr: "There was an error sending. Try checking your internet connection."
    }
};

let currentLang = 'es';
let playerName = '';
let completedChallenges = [];
let uploadedUrls = {}; // Store image URLs
let totalPoints = 0;

function getBase64(file, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        callback(reader.result);
    };
    reader.onerror = function (error) {
        console.error('Error FileReader: ', error);
    };
}

function updateLiveScore() {
    if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL.includes("script.google.com") && playerName) {
        fetch(GOOGLE_SCRIPT_URL, {
            method: "POST", // text/plain payload to bypass preflight OPTIONS CORS
            body: JSON.stringify({
                type: "update_score",
                playerName: playerName,
                points: totalPoints
            })
        }).catch(err => console.error("Error updating live score:", err));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadState();

    const listContainer = document.getElementById("challenges-list");
    const btnEs = document.getElementById("btn-es");
    const btnEn = document.getElementById("btn-en");
    
    const nameModal = document.getElementById("name-modal");
    const nameInput = document.getElementById("guest-name-input");
    const nameSubmit = document.getElementById("name-submit-btn");

    const lbModal = document.getElementById("leaderboard-modal");
    const btnLeaderboard = document.getElementById("btn-leaderboard");
    const btnConclude = document.getElementById("btn-conclude");
    const clseLb = document.getElementById("close-leaderboard");

    function renderChallenges() {
        listContainer.innerHTML = '';
        
        challenges.forEach(item => {
            const el = document.createElement("div");
            el.className = "challenge-item";
            if (completedChallenges.includes(item.id)) {
                el.classList.add('completed');
            }
            el.id = `item-${item.id}`;
            
            const textToShow = item[currentLang];
            const uploadBtnText = uploadedUrls[item.id] ? uiTexts[currentLang].uploadedLabel : uiTexts[currentLang].uploadLabel;
            const ptsWord = uiTexts[currentLang].ptsWord;
            const isCompleted = completedChallenges.includes(item.id) ? 'checked' : '';
            const badgeClass = item.isBonus ? 'points-badge bonus-badge' : 'points-badge';
            
            el.innerHTML = `
                <div class="${badgeClass}">${item.points} ${ptsWord}</div>
                <div class="challenge-header">
                    <input type="checkbox" class="challenge-checkbox" id="check-${item.id}" ${isCompleted}>
                    <label for="check-${item.id}" class="challenge-text">${textToShow}</label>
                </div>
                <div class="challenge-actions">
                    <span class="file-name" id="filename-${item.id}"></span>
                    <label class="upload-lbl" for="file-${item.id}">
                        <i class="fa-solid fa-camera"></i> <span id="upload-txt-${item.id}">${uploadBtnText}</span>
                    </label>
                    <input type="file" id="file-${item.id}" class="file-input" accept="image/*,video/*">
                </div>
            `;
            listContainer.appendChild(el);
            
            const checkbox = document.getElementById(`check-${item.id}`);
            const fileInput = document.getElementById(`file-${item.id}`);
            const filenameSpan = document.getElementById(`filename-${item.id}`);
            const uploadTxt = document.getElementById(`upload-txt-${item.id}`);

            if (uploadedUrls[item.id]) {
                filenameSpan.innerHTML = `<a href="${uploadedUrls[item.id]}" target="_blank" style="color:var(--gold); font-size: 0.8rem; text-decoration: underline;">${uiTexts[currentLang].viewPhoto}</a>`;
            }

            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    el.classList.add('completed');
                    if (!completedChallenges.includes(item.id)) {
                        completedChallenges.push(item.id);
                    }
                } else {
                    el.classList.remove('completed');
                    completedChallenges = completedChallenges.filter(id => id !== item.id);
                }
                calculatePoints();
            });

            fileInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files.length > 0) {
                    const file = e.target.files[0];
                    
                    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.indexOf("script") === -1) {
                        filenameSpan.textContent = file.name;
                        uploadTxt.textContent = uiTexts[currentLang].uploadedLabel;
                        markCompleted();
                        return;
                    }

                    // MODO CLOUD DRIVE
                    filenameSpan.textContent = uiTexts[currentLang].uploading;
                    uploadTxt.textContent = "...";
                    fileInput.disabled = true; 
                    
                    getBase64(file, (base64Full) => {
                        const base64Data = base64Full.split(',')[1];
                        
                        const payload = {
                            type: "upload",
                            mimeType: file.type,
                            filename: playerName.replace(/\s+/g, '_') + "_" + item.id + "_" + file.name,
                            base64: base64Data
                        };

                        fetch(GOOGLE_SCRIPT_URL, {
                            method: "POST",
                            body: JSON.stringify(payload)
                        })
                        .then(r => r.json())
                        .then(data => {
                            if (data.success) {
                                uploadedUrls[item.id] = data.url;
                                saveState();
                                
                                filenameSpan.innerHTML = `<a href="${data.url}" target="_blank" style="color:var(--gold); font-size: 0.8rem; text-decoration: underline;">${uiTexts[currentLang].viewPhoto}</a>`;
                                uploadTxt.textContent = uiTexts[currentLang].uploadedLabel;
                                markCompleted();
                            } else {
                                console.error(data.error);
                                filenameSpan.textContent = uiTexts[currentLang].errUpload;
                                uploadTxt.textContent = uiTexts[currentLang].uploadLabel;
                            }
                        })
                        .catch(err => {
                            console.error("Fetch Error:", err);
                            filenameSpan.textContent = uiTexts[currentLang].errUpload;
                            uploadTxt.textContent = uiTexts[currentLang].uploadLabel;
                        })
                        .finally(() => {
                            fileInput.disabled = false;
                        });
                    });

                } else {
                    filenameSpan.textContent = '';
                    uploadTxt.textContent = uiTexts[currentLang].uploadLabel;
                    delete uploadedUrls[item.id];
                    saveState();
                }

                function markCompleted() {
                    if (!checkbox.checked) {
                        checkbox.checked = true;
                        el.classList.add('completed');
                        if (!completedChallenges.includes(item.id)) {
                            completedChallenges.push(item.id);
                        }
                        calculatePoints();
                    }
                }
            });
        });
    }

    function calculatePoints() {
        totalPoints = 0;
        completedChallenges.forEach(id => {
            const match = challenges.find(c => c.id === id);
            if (match) {
                totalPoints += match.points;
            }
        });
        document.getElementById("display-score").innerText = totalPoints;
        saveState();
        updateLiveScore(); // Send the live update to the cloud
    }

    function syncLanguage(lang) {
        currentLang = lang;
        saveState();

        document.getElementById("title").textContent = uiTexts[lang].title;
        document.getElementById("instructions").innerHTML = uiTexts[lang].instructions;
        document.getElementById("lbl-player").textContent = uiTexts[lang].playerLbl;
        document.getElementById("lbl-pts").textContent = uiTexts[lang].ptsLbl;
        document.getElementById("lbl-leaderboard-btn").textContent = uiTexts[lang].leaderboardBtn;
        
        document.getElementById("conclude-desc").textContent = uiTexts[lang].concludeDesc;
        document.getElementById("lbl-conclude-btn").textContent = uiTexts[lang].concludeBtn;
        
        document.getElementById("name-title").textContent = uiTexts[lang].welcomeTitle;
        document.getElementById("name-instruction").textContent = uiTexts[lang].welcomeInstr;
        document.getElementById("name-submit-btn").textContent = uiTexts[lang].startBtn;
        
        document.getElementById("leaderboard-title").innerHTML = `<i class="fa-solid fa-trophy" style="color:var(--gold)"></i> ${uiTexts[lang].lbTitle}`;
        document.getElementById("leaderboard-instruction").textContent = uiTexts[lang].lbInstr;

        challenges.forEach(item => {
            const label = document.querySelector(`label[for="check-${item.id}"]`);
            if (label) label.textContent = item[lang];
            
            const uploadTxt = document.getElementById(`upload-txt-${item.id}`);
            const filenameSpan = document.getElementById(`filename-${item.id}`);

            if (uploadedUrls[item.id]) {
                if (uploadTxt) uploadTxt.textContent = uiTexts[lang].uploadedLabel;
                if (filenameSpan && filenameSpan.innerHTML.includes("<a")) {
                    filenameSpan.innerHTML = `<a href="${uploadedUrls[item.id]}" target="_blank" style="color:var(--gold); font-size: 0.8rem; text-decoration: underline;">${uiTexts[lang].viewPhoto}</a>`;
                }
            } else {
                if (uploadTxt) uploadTxt.textContent = uiTexts[lang].uploadLabel;
            }
        });
        
        if (lang === 'es') {
            btnEs.classList.add('active');
            btnEn.classList.remove('active');
        } else {
            btnEs.classList.remove('active');
            btnEn.classList.add('active');
        }
    }

    /* Modals & State */
    function loadState() {
        const savedLang = localStorage.getItem('weddingChallengesLang');
        if (savedLang) currentLang = savedLang;

        const savedName = localStorage.getItem('weddingChallengesName');
        if (savedName) playerName = savedName;

        const savedObj = localStorage.getItem('weddingChallengesCompleted');
        if (savedObj) {
            try {
                completedChallenges = JSON.parse(savedObj);
            } catch(e) {}
        }

        const savedUrls = localStorage.getItem('weddingChallengesUrls');
        if (savedUrls) {
            try {
                uploadedUrls = JSON.parse(savedUrls);
            } catch(e) {}
        }
    }

    function saveState() {
        localStorage.setItem('weddingChallengesLang', currentLang);
        localStorage.setItem('weddingChallengesName', playerName);
        localStorage.setItem('weddingChallengesCompleted', JSON.stringify(completedChallenges));
        localStorage.setItem('weddingChallengesUrls', JSON.stringify(uploadedUrls));
    }

    function checkName() {
        if (!playerName) {
            nameModal.classList.add('show');
        } else {
            document.getElementById("display-name").textContent = playerName;
            document.getElementById("player-info-container").style.display = "flex";
            calculatePoints();
            updateLiveScore();
        }
    }

    nameSubmit.addEventListener("click", () => {
        const val = nameInput.value.trim();
        if (val) {
            playerName = val;
            saveState();
            nameModal.classList.remove('show');
            document.getElementById("display-name").textContent = playerName;
            document.getElementById("player-info-container").style.display = "flex";
            updateLiveScore(); 
        }
    });

    // GOOGLE DRIVE LIVE LEADERBOARD
    btnLeaderboard.addEventListener("click", () => {
        const list = document.getElementById("leaderboard-list");
        list.innerHTML = '<div style="text-align:center; padding: 2rem;"><i class="fa-solid fa-spinner fa-spin fa-2x" style="color:var(--gold)"></i></div>';
        lbModal.classList.add('show');
        
        if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL.includes("script.google.com")) {
            // Obtenemos los lideres globales reales de la base de datos de google
            fetch(GOOGLE_SCRIPT_URL + "?action=leaderboard")
            .then(res => res.json())
            .then(data => {
                list.innerHTML = '';
                if (data.success && data.leaderboard) {
                    let allPlayers = data.leaderboard;
                    
                    if (allPlayers.length === 0) {
                        list.innerHTML = '<p style="text-align:center; color:#888;">Aún no hay puntos registrados.</p>';
                        return;
                    }

                    allPlayers.forEach((p, index) => {
                        const div = document.createElement("div");
                        const isCurrent = (p.name === playerName);
                        div.className = isCurrent ? "lb-item current-user" : "lb-item";
                        
                        let medal = "";
                        if(index === 0) medal = "🥇 ";
                        else if(index === 1) medal = "🥈 ";
                        else if(index === 2) medal = "🥉 ";

                        div.innerHTML = `
                            <span>${medal}${p.name}</span>
                            <span class="lb-score">${p.pts} pts</span>
                        `;
                        list.appendChild(div);
                    });
                } else {
                    list.innerHTML = '<p style="text-align:center; color:#888;">No se pudo cargar el tablero.</p>';
                }
            })
            .catch(err => {
                list.innerHTML = '<p style="text-align:center; color:#888;">Conectando en modo local (Sin internet)...</p>';
                renderMockLeaderboard();
            });
        } else {
            // Fallback en caso de que borre su url por error
            renderMockLeaderboard();
        }

        function renderMockLeaderboard() {
            list.innerHTML = '';
            const allPlayers = [
                { name: "Carlos M.", pts: 110 },
                { name: "Sofía T.", pts: 95 },
                { name: playerName || (currentLang === 'es' ? "Tú" : "You"), pts: totalPoints, isCurrent: true }
            ];
            allPlayers.sort((a, b) => b.pts - a.pts);
            allPlayers.forEach((p, index) => {
                const div = document.createElement("div");
                div.className = p.isCurrent ? "lb-item current-user" : "lb-item";
                
                let medal = "";
                if(index === 0) medal = "🥇 ";
                else if(index === 1) medal = "🥈 ";
                else if(index === 2) medal = "🥉 ";
                div.innerHTML = `<span>${medal}${p.name}</span><span class="lb-score">${p.pts} pts</span>`;
                list.appendChild(div);
            });
        }
    });

    clseLb.addEventListener("click", () => {
        lbModal.classList.remove('show');
    });

    // ENVÍO DE RESULTADOS Y CULMINACIÓN AL CORREO DE NOVIOS
    btnConclude.addEventListener("click", () => {
        let urlListText = "";
        
        // Sumar todos los links a las fotos de su Drive
        completedChallenges.forEach(id => {
            const match = challenges.find(c => c.id === id);
            if (match) {
                const title = match[currentLang];
                const link = uploadedUrls[id] ? uploadedUrls[id] : (currentLang === 'es' ? "(No adjuntó foto)" : "(No photo attached)");
                urlListText += `- ${title}:\n  ${link}\n\n`;
            }
        });

        if (urlListText === "") {
            urlListText = currentLang === 'es' ? "No se completaron retos ni subieron fotos." : "No challenges or photos uploaded.";
        }

        const payload = {
            type: "conclude",
            playerName: playerName || "Jugador Desconocido",
            points: totalPoints,
            evidence: urlListText
        };

        if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL.includes("script.google.com")) {
            // Enviar a Google Drive para recibir correo final
            btnConclude.disabled = true;
            document.getElementById("lbl-conclude-btn").innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Finalizando...';
            
            fetch(GOOGLE_SCRIPT_URL, {
                method: "POST", 
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert(uiTexts[currentLang].concludeSuccess);
                } else {
                    alert(uiTexts[currentLang].concludeErr + " (" + data.error + ")");
                }
            })
            .catch(err => {
                alert(uiTexts[currentLang].concludeErr);
            })
            .finally(() => {
                btnConclude.disabled = false;
                syncLanguage(currentLang);
            });
            
        } else {
            // FALLBACK a correo manual si no se configuró Google Drive
            alert(currentLang === 'es' 
                ? "Como aún no se configura GOOGLE_SCRIPT_URL en el código, se abrirá tu app de correos para que envíes tu historial manualmente."
                : "Google Drive link is not set up in code. Your email app will open to send progress manually.");
                
            const coupleEmail = "boda@ejemplo.com"; 
            const subject = currentLang === 'es' 
                ? `Retos Boda - Participación de ${playerName}` 
                : `Wedding Challenges - ${playerName}'s Participation`;
            
            const body = currentLang === 'es'
                ? `¡Hola!\nHe concluido mi participación y he conseguido ${totalPoints} puntos.\nAquí están mis links si alguna me funcionó:\n\n${urlListText}Con cariño,\n${playerName}`
                : `Hello!\nI have concluded my participation and scored ${totalPoints} points.\nHere is my evidence:\n\n${urlListText}Best,\n${playerName}`;

            const mailtoLink = `mailto:${coupleEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
        }
    });

    // Init language switchers
    btnEs.addEventListener('click', () => syncLanguage('es'));
    btnEn.addEventListener('click', () => syncLanguage('en'));

    // Config Inicial
    syncLanguage(currentLang);
    renderChallenges();
    checkName();
});
