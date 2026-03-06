  // Sample documents
        const documents = [
            {
                name: 'bill document make',
                desc: 'bassic details of demo world',
                url: 'DEMO WOLD.pdf'
            },
            {
                name: 'shadi ka chumawan',
                desc: 'bassic details of shadi',
                url: 'shadi ka chumawan.pdf'
            }
        ];

        // Generate matrix background characters
        function generateMatrixBg() {
            const bg = document.getElementById('matrixBg');
            const chars = '01アウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
            
            for (let i = 0; i < 15; i++) {
                const char = document.createElement('div');
                char.className = 'matrix-char';
                char.textContent = chars[Math.floor(Math.random() * chars.length)];
                char.style.left = Math.random() * 100 + '%';
                char.style.animationDuration = (Math.random() * 10 + 8) + 's';
                char.style.animationDelay = Math.random() * 2 + 's';
                bg.appendChild(char);
            }
        }

        let loginCompleted = false;

        // Show documents after welcome animation
        function showDocumentsAfterWelcome() {
            if (loginCompleted) return;
            loginCompleted = true;

            const overlay = document.getElementById('welcomeOverlay');
            overlay.classList.add('show');

            setTimeout(() => {
                overlay.classList.remove('show');
                document.getElementById('loginSection').style.display = 'none';
                document.getElementById('documentsSection').classList.add('show');
                populateDocuments();
            }, 2000);
        }

        // Handle login
        function handleLogin(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const errorMsg = document.getElementById('errorMsg');

            if (username.toLowerCase() === 'amrit') {
                const btn = event.target.querySelector('.login-btn');
                btn.textContent = 'AUTHENTICATING...';
                btn.style.pointerEvents = 'none';
                errorMsg.classList.remove('show');

                setTimeout(() => {
                    showDocumentsAfterWelcome();
                }, 500); // quicker after submit
            } else {
                errorMsg.textContent = '>> ERROR: INVALID CREDENTIALS - ACCESS DENIED!';
                errorMsg.classList.add('show');

                setTimeout(() => {
                    errorMsg.classList.remove('show');
                }, 3000);
            }
        }

        // Populate documents
        function populateDocuments() {
            const docsList = document.getElementById('documentsList');
            docsList.innerHTML = '';

            documents.forEach((doc, index) => {
                const docElement = document.createElement('div');
                docElement.className = 'document';
                if (doc.url) {
                    docElement.style.cursor = 'pointer';
                    docElement.addEventListener('click', () => {
                        window.open(doc.url, '_blank');
                    });
                }
                docElement.innerHTML = `
                    <div class="doc-name">${doc.name}</div>
                    <div class="doc-desc">${doc.desc}</div>
                `;
                docsList.appendChild(docElement);
            });
        }

        // Handle logout
        function handleLogout() {
            document.getElementById('documentsSection').classList.remove('show');
            document.getElementById('loginSection').style.display = 'block';
            document.getElementById('username').value = '';
            const btn = document.querySelector('.login-btn');
            btn.textContent = 'AUTHENTICATE';
            btn.style.pointerEvents = 'auto';
        }

        // Initialize
        generateMatrixBg();

        // trigger login as soon as username "Amrit" is typed
        const userInput = document.getElementById('username');
        userInput.addEventListener('input', () => {
            if (userInput.value.toLowerCase() === 'amrit') {
                showDocumentsAfterWelcome();
            }
        });

        // Add random glitch effect on header
        const header = document.querySelector('.header h1');
        setInterval(() => {
            if (Math.random() > 0.95) {
                header.style.textShadow = 'none';
                header.style.color = '#ff0000';
                setTimeout(() => {
                    header.style.textShadow = '0 0 20px #00ff00, 0 0 40px rgba(0, 255, 0, 0.5)';
                    header.style.color = '#00ff00';
                }, 100);
            }
        }, 2000);