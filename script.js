// --- CONFIGURACIÓN PARA GOOGLE DRIVE E INTERNET REAL-TIME ---
// Pega aquí el link que te dio tu script de Google Drive (el que termina en /exec)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxLTiDv_CqCXTruNbA_xEFCWxq4T74AJLH_XzIvV6P_KEFj_nzkJ31vCgxSGOTuGuPd/exec"; 


const challenges = [
    { id: "c1", points: 10, es: "Dile un cumplido a los novios 💬", en: "Give the couple a compliment 💬" },
    { id: "c2", points: 50, isBonus: true, es: "Bonus: Tómate una selfie con los novios 📸 (sin ser invasiv@)", en: "Bonus: Take a selfie with the bride and groom 📸 (without being intrusive)" },
    { id: "c3", points: 10, es: "Toma una foto en la pista de baile 💃", en: "Take a photo on the dance floor 💃" },
    { id: "c4", points: 10, es: "Brinda con alguien 🥂", en: "Make a toast with someone 🥂" },
    { id: "c5", points: 20, es: "Graba un mini mensaje de buenos deseos para los esposos 💌", en: "Record a short video message for the newlyweds 💌" },
    { id: "c6", points: 15, es: "Tómale foto a tu platillo favorito de la celebración 🍽️", en: "Take a photo of your favorite dish at the celebration 🍽️" },
    { id: "c7", points: 50, isBonus: true, es: "Bonus: Atrapa el ramo de la novia 💐", en: "Bonus: Catch the bride's bouquet 💐" },
    { id: "c13", points: 50, isBonus: true, es: "Bonus: Brinda con los novios 🍾", en: "Bonus: Toast with the bride and groom 🍾" },
    { id: "c9", points: 15, es: "Foto con alguien que no conocías antes de la boda 🤝", en: "Take a photo with someone you didn't know before the wedding 🤝" },
    { id: "c10", points: 15, es: "Consigue una foto con alguien que lleve tu mismo color de outfit 👗", en: "Get a photo with someone wearing your same outfit color 👗" },
    { id: "c11", points: 20, es: "Captura un momento romántico entre los novios ✨", en: "Capture a romantic moment between the bride and groom ✨" },
    { id: "c12", points: 10, es: "Tómale una foto al pastel de bodas 🎂", en: "Take a picture of the wedding cake 🎂" },
    { id: "c14", points: 15, es: "Pide al DJ una canción especial 🎶", en: "Request a special song from the DJ 🎶" },
    { id: "c15", points: 20, es: "Gritar ¡Que vivan los novios!, ¡Beso, beso! o comenzar una porra 🥳", en: "Shout 'Long live the newlyweds!', 'Kiss, kiss!' or start a cheer 🥳" },
    { id: "c16", points: 15, es: "Juega al menos uno de los juegos que preparamos para ti 🎟️", en: "Play at least one of the games we prepared for you 🎟️" },
    { id: "c18", points: 15, es: "Toma una foto aesthetic del evento o de tu lugar favorito en la fiesta 📷", en: "Take an aesthetic photo of the event or your favorite spot at the party 📷" },
    { id: "c17", points: 50, isBonus: true, es: "Bonus: ¡Sé el ganador en el Bingo! 🏆", en: "Bonus: Be the Bingo winner! 🏆" }
];

const uiTexts = {
    es: {
        title: "Retos de Boda",
        instructions: "¡Diviértete completando estos retos durante la fiesta!<br>GANA PUNTOS y sube tus pruebas (foto, video o texto) según sea el caso para cada reto.",
        uploadLabel: "Subir evidencia (Foto/Video)",
        uploadedLabel: "Prueba lista",
        playerLbl: "Jugador",
        ptsLbl: "pts",
        leaderboardBtn: "Tablero Global",
        welcomeTitle: "¡Bienvenido!",
        welcomeInstr: "Ingresa tu nombre para guardar tus puntos en el Tablero Global en tiempo real.",
        startBtn: "Comenzar",
        lbTitle: "Tablero Global",
        lbInstr: "Líderes de la boda en vivo",
        lbTip: "¡Dale clic al tablero global para ver los puntos de los otros jugadores en tiempo real!",
        ptsWord: "pts",
        uploading: "Subiendo nube... ⏳",
        errUpload: "Error al subir ❌",
        viewPhoto: "Ver Archivo (Drive)",
        textPlaceholder: "...o escribe directamente tu prueba aquí",
        bonusSectionTitle: "💍 Bonus Especiales 💍",
        concludeDesc: "Da click cuando te sientas satisfecho con tus retos cumplidos para concluir tu participación",
        concludeBtn: "Concluir mi participación",
        concludeSuccess: "¡Gracias por participar! Tu evidencia y tus puntos han sido enviados a los novios directamente.",
        concludeErr: "Hubo un error al enviar. ¿Aún tienes internet?",
        deleteBtn: "Borrar mi usuario",
        deleteConfirm: "⚠️ ¿Estás de acuerdo? Esto borrará tu usuario del tablero y se perderá TODO tu avance. Tendrás que empezar desde cero."
    },
    en: {
        title: "Wedding Challenges",
        instructions: "Have fun completing these challenges!<br>EARN POINTS and upload your proof (photo, video, or text) depending on what the challenge asks for.",
        uploadLabel: "Upload file (Photo/Video)",
        uploadedLabel: "Evidence ready",
        playerLbl: "Player",
        ptsLbl: "pts",
        leaderboardBtn: "Leaderboard",
        welcomeTitle: "Welcome!",
        welcomeInstr: "Enter your name to save your points on the Global Live Leaderboard.",
        startBtn: "Start",
        lbTitle: "Global Leaderboard",
        lbInstr: "Live wedding leaders",
        lbTip: "Click the global leaderboard to see other players' live scores!",
        ptsWord: "pts",
        uploading: "Uploading cloud... ⏳",
        errUpload: "Upload Error ❌",
        viewPhoto: "View File (Drive)",
        textPlaceholder: "...or write your evidence directly here",
        bonusSectionTitle: "💍 Special Bonuses 💍",
        concludeDesc: "Click when you feel satisfied with your completed challenges to conclude your participation",
        concludeBtn: "Conclude my participation",
        concludeSuccess: "Thank you for participating! Your evidence and points have been sent to the couple.",
        concludeErr: "There was an error sending. Try checking your internet connection.",
        deleteBtn: "Delete my user",
        deleteConfirm: "⚠️ Are you sure? This will delete your user from the board and ALL your progress will be lost. You will have to start from scratch."
    }
};

let currentLang = 'es';
let playerName = '';
let completedChallenges = [];
let uploadedUrls = {}; // Store image URLs
let writtenTexts = {}; // Store written text evidence
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
    const bonusContainer = document.getElementById("bonus-list");
    const bonusTitle = document.getElementById("bonus-title");
    const btnEs = document.getElementById("btn-es");
    const btnEn = document.getElementById("btn-en");
    
    const nameModal = document.getElementById("name-modal");
    const nameInput = document.getElementById("guest-name-input");
    const nameSubmit = document.getElementById("name-submit-btn");

    const lbModal = document.getElementById("leaderboard-modal");
    const btnLeaderboard = document.getElementById("btn-leaderboard");
    const btnDeleteUser = document.getElementById("btn-delete-user");
    const btnConclude = document.getElementById("btn-conclude");
    const clseLb = document.getElementById("close-leaderboard");

    function renderChallenges() {
        listContainer.innerHTML = '';
        if (bonusContainer) bonusContainer.innerHTML = '';
        let hasBonus = false;
        
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
                <div class="challenge-actions" style="flex-direction: column; align-items: stretch; gap: 0.8rem; margin-top: 0.8rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="file-name" id="filename-${item.id}"></span>
                        <label class="upload-lbl" for="file-${item.id}">
                            <i class="fa-solid fa-camera"></i> <span id="upload-txt-${item.id}">${uploadBtnText}</span>
                        </label>
                        <input type="file" id="file-${item.id}" class="file-input" accept="image/*,video/*">
                    </div>
                    <input type="text" id="text-${item.id}" placeholder="${uiTexts[currentLang].textPlaceholder}" style="font-size: 0.95rem; padding: 0.6rem; border: 1px dashed var(--gold); border-radius: 4px; background: rgba(255,255,255,0.4); width: 100%; box-sizing: border-box; color: var(--text-dark); outline: none;">
                </div>
            `;
            
            if (item.isBonus && bonusContainer) {
                bonusContainer.appendChild(el);
                hasBonus = true;
            } else {
                listContainer.appendChild(el);
            }
            
            const checkbox = document.getElementById(`check-${item.id}`);
            const fileInput = document.getElementById(`file-${item.id}`);
            const filenameSpan = document.getElementById(`filename-${item.id}`);
            const uploadTxt = document.getElementById(`upload-txt-${item.id}`);
            const textInput = document.getElementById(`text-${item.id}`);

            if (uploadedUrls[item.id]) {
                filenameSpan.innerHTML = `<a href="${uploadedUrls[item.id]}" target="_blank" style="color:var(--gold); font-size: 0.8rem; text-decoration: underline;">${uiTexts[currentLang].viewPhoto}</a>`;
            }
            if (writtenTexts[item.id]) {
                textInput.value = writtenTexts[item.id];
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

            textInput.addEventListener('input', (e) => {
                const val = e.target.value.trim();
                if (val) {
                    writtenTexts[item.id] = val;
                    markCompleted(); // Automatically check it if they write something
                } else {
                    delete writtenTexts[item.id];
                }
                saveState();
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
            });
        });

        if (bonusTitle && bonusContainer) {
            bonusTitle.style.display = hasBonus ? "block" : "none";
        }
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
        
        if (document.getElementById("leaderboard-tip")) {
            document.getElementById("leaderboard-tip").textContent = uiTexts[lang].lbTip;
        }

        if (bonusTitle) {
            bonusTitle.textContent = uiTexts[lang].bonusSectionTitle;
        }

        document.getElementById("conclude-desc").textContent = uiTexts[lang].concludeDesc;
        document.getElementById("lbl-conclude-btn").textContent = uiTexts[lang].concludeBtn;
        if (document.getElementById("lbl-delete-btn")) {
            document.getElementById("lbl-delete-btn").textContent = uiTexts[lang].deleteBtn;
        }

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
            const textInput = document.getElementById(`text-${item.id}`);

            if (textInput) {
                textInput.placeholder = uiTexts[lang].textPlaceholder;
            }

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

        const savedTexts = localStorage.getItem('weddingChallengesTexts');
        if (savedTexts) {
            try {
                writtenTexts = JSON.parse(savedTexts);
            } catch(e) {}
        }
    }

    function saveState() {
        localStorage.setItem('weddingChallengesLang', currentLang);
        localStorage.setItem('weddingChallengesName', playerName);
        localStorage.setItem('weddingChallengesCompleted', JSON.stringify(completedChallenges));
        localStorage.setItem('weddingChallengesUrls', JSON.stringify(uploadedUrls));
        localStorage.setItem('weddingChallengesTexts', JSON.stringify(writtenTexts));
    }

    function checkName() {
        if (!playerName) {
            nameModal.classList.add('show');
            if (btnDeleteUser) btnDeleteUser.style.display = "none";
        } else {
            if (btnDeleteUser) btnDeleteUser.style.display = "inline-block";
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
            if (btnDeleteUser) btnDeleteUser.style.display = "inline-block";
            document.getElementById("display-name").textContent = playerName;
            document.getElementById("player-info-container").style.display = "flex";
            updateLiveScore(); 
        }
    });

    if (btnDeleteUser) {
        btnDeleteUser.addEventListener("click", () => {
            if (confirm(uiTexts[currentLang].deleteConfirm)) {
                if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL.includes("script.google.com") && playerName) {
                    fetch(GOOGLE_SCRIPT_URL, {
                        method: "POST",
                        body: JSON.stringify({
                            type: "delete_user",
                            playerName: playerName
                        })
                    }).catch(err => console.error("Error deleting user:", err));
                }
                localStorage.removeItem('weddingChallengesName');
                localStorage.removeItem('weddingChallengesCompleted');
                localStorage.removeItem('weddingChallengesUrls');
                localStorage.removeItem('weddingChallengesTexts');
                window.location.reload();
            }
        });
    }

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
            renderMockLeaderboard();
        }

        function renderMockLeaderboard() {
            list.innerHTML = '';
            const allPlayers = [];
            if (playerName) {
                allPlayers.push({ name: playerName, pts: totalPoints, isCurrent: true });
            }
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
        
        // Sumar todos los links a las fotos y textos escritos
        completedChallenges.forEach(id => {
            const match = challenges.find(c => c.id === id);
            if (match) {
                const title = match[currentLang];
                let link = "";
                
                if (uploadedUrls[id]) link += `Archivo adjunto: ${uploadedUrls[id]} \n  `;
                if (writtenTexts[id]) link += `Nota escrita: "${writtenTexts[id]}"`;
                
                if (!link) {
                    link = currentLang === 'es' ? "(Marcado sin adjuntar prueba)" : "(Checked without attaching proof)";
                }
                
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
                ? `¡Hola!\nHe concluido mi participación y he conseguido ${totalPoints} puntos.\nAquí están mis links y notas escritas de los retos:\n\n${urlListText}Con cariño,\n${playerName}`
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
