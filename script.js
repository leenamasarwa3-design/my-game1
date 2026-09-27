        /* ========================================================= */
        /* APPLICATION STATE & DATA STRUCTURES                       */
        /* ========================================================= */
        let currentUser = {
            name: '',
            school: '',
            grade: '',
            score: 0,
            completedGames: [],
            gameScores: Array(10).fill(0)
        };

        let currentGameIndex = 0;
        let currentGameAttempts = 3;
        let currentSubQuestionIndex = 0;

        let leaderboardData = [
            { name: "سارة محمود عبيدات", school: "مدرسة حرثا الثانوية الشاملة للبنات", score: 1000, rank: "بطل الإسعاف 🏆" },
            { name: "أحمد علي ملكاوي", school: "مدرسة ابن رشد الثانوية للبنين", score: 950, rank: "مسعف متميز 🥇" },
            { name: "فرح خالد الروسان", school: "مدرسة سما الروسان الثانوية", score: 900, rank: "مسعف متميز 🥇" },
            { name: "مريم عبد الله الكفرسومي", school: "مدرسة كفرسوم الثانوية للبنات", score: 850, rank: "مسعف متقدم 🥈" }
        ];

        /* ========================================================= */
        /* MINI-GAMES DEFINITIONS (10 SEQUENTIAL LEVELS)             */
        /* ========================================================= */
        const miniGamesData = [
            {
                id: 1,
                title: "المستوى 1: فحص سلامة المكان",
                icon: "fa-magnifying-glass-location",
                instruction: "قبل الاقتراب من أي مصاب، حددي جميع المخاطر في المشاهد التالية لتأمين الحادث أولاً:",
                questions: [
                    {
                        scene: "المشهد 1: سقط طالب في المختبر المدرسي وبجواره سائل مجهول وزجاج مكسور.",
                        hazards: [
                            { id: "h1", name: "زجاج مكسور حاد", icon: "fa-dumpster-fire", color: "text-red-600" },
                            { id: "h2", name: "سائل كيميائي مسكوب", icon: "fa-vial-virus", color: "text-amber-600" }
                        ],
                        safeAction: "ارتداء القفازات وتأمين المكان بحذر قبل تقديم الإسعاف."
                    },
                    {
                        scene: "المشهد 2: حادث تسرب كهربائي قرب ساحة الرياضة.",
                        hazards: [
                            { id: "h3", name: "سلك كهرباء عارٍ ينزلق", icon: "fa-bolt-lightning", color: "text-yellow-600" },
                            { id: "h4", name: "تجمع ماء قرب السلك", icon: "fa-water", color: "text-sky-600" }
                        ],
                        safeAction: "فصل التيار الكهربائي فوراً وعدم لمس الماء."
                    }
                ]
            },
            {
                id: 2,
                title: "المستوى 2: تقييم الوعي والاستجابة",
                icon: "fa-user-check",
                instruction: "اختر التصرف الآمن والصحيح للتحقق من وعي واستجابة المصاب في المواقف التالية:",
                questions: [
                    {
                        scenario: "الموقف 1: طالبة سقطت فجأة في الممر وهي مستلقية ولا تتحرك.",
                        options: [
                            { text: "هزّ المصاب بقوة شديدة وضربه على الوجه ليرد عليك", correct: false, explanation: "تحذير! التحريك الشديد قد يسبب تلفاً خطيراً للعمود الفقري." },
                            { text: "النقر الخفيف على الكتفين والنداء بصوت واضح: (هل أنتِ بخير؟)", correct: true, explanation: "ممتاز! هذه هي طريقة الفحص الدولية الآمنة." }
                        ]
                    },
                    {
                        scenario: "الموقف 2: المصاب لا يستجيب للصوت أو اللمس الخفيف.",
                        options: [
                            { text: "فحص التنفس بالنظر إلى حركة الصدر لمدة 5-10 ثوانٍ وطلب الطوارئ", correct: true, explanation: "تصرف بطولي! التأكد من التنفس هو الخطوة الحاسمة التالية." },
                            { text: "سكب ماء بارد جداً على وجهه فوراً", correct: false, explanation: "خطأ! سكب الماء قد يتسبب في الاختناق والشهوق." }
                        ]
                    }
                ]
            },
            {
                id: 3,
                title: "المستوى 3: الاتصال بالخدمات الطارئة (911)",
                icon: "fa-phone-volume",
                instruction: "اطلبي رقم الطوارئ الموحد الأردني (911) باستخدام لوحة المفاتيح أولاً، ثم أبلغي عن الحادث:",
                type: "dialpad_game",
                targetNumber: "911",
                questions: [
                    {
                        scenario: "المستقبل: (طوارئ الدفاع المدني 911، ما هو بلاغك؟)",
                        options: [
                            { text: "إعطاء الموقع الدقيق (اسم المكان أو أقرب معلم مميز) ونوع الإصابة وعدد المصابين", correct: true, explanation: "أحسنتِ! إعطاء المكان والحالة يساعد الإسعاف على الوصول بسرعة." },
                            { text: "الصراخ وإغلاق الهاتف فوراً دون تحديد المكان", correct: false, explanation: "خطأ! يجب إبقاء الخط مفتوحاً وتحديد الموقع بالضبط." }
                        ]
                    }
                ]
            },
            {
                id: 4,
                title: "المستوى 4: السيطرة على النزيف والرعاف",
                icon: "fa-hand-holding-medical",
                instruction: "تعاملي مع حالات النزيف المختلفة باختيار الإجراء الإسعافي السليم:",
                questions: [
                    {
                        scenario: "الحالة 1: جرح ينزف بغزارة في الساعد أثناء حصة المهني.",
                        options: [
                            { text: "الضغط المباشر بضماد معقم ورفع العضو أعلى من المستوى الطبيعي", correct: true, explanation: "رائع! الضغط المباشر يوقف معظم أنواع النزيف الشرياني والوريدي." },
                            { text: "غسل الجرح بالماء والصابون القوي فوراً أثناء النزيف الشديد", correct: false, explanation: "خطأ! في النزيف الشديد، أولوية المسعف هي إيقاف الدم أولاً بالضغط." }
                        ]
                    },
                    {
                        scenario: "الحالة 2: رعاف (نزيف من الأنف) لطالبة في الساحة المدرسية.",
                        options: [
                            { text: "إمالة الرأس للأسفل قليلاً والضغط على الجزء اللين من الأنف لمدة 10 دقائق", correct: true, explanation: "ممتاز! إمالة الرأس للأمام تمنع دخول الدم للمعدة أو مجرى التنفس." },
                            { text: "إمالة الرأس للخلف لأعلى قدر الاستطاعة", correct: false, explanation: "تحذير! إمالة الرأس للخلف تجعل الدم يتدفق للمعدة وقد تسبب التقيؤ والاختناق." }
                        ]
                    }
                ]
            },
            {
                id: 5,
                title: "المستوى 5: إسعاف الحروق بالدرجات المختلفة",
                icon: "fa-fire-burner",
                instruction: "حددي التصرف الصحيح لكل حالة حروق مع تجنب الأخطاء الشائعة:",
                questions: [
                    {
                        scenario: "الحالة 1: انسكاب ماء ساخن على اليد مما أدى لحرق أحمر بسيط.",
                        options: [
                            { text: "سكب ماء جاري معتدل (فاتر) لمدة 10-15 دقيقة لتبريد المكان", correct: true, explanation: "صحيح جداً! الماء الجاري يمتص الحرارة ويقلل تلف الأنسجة." },
                            { text: "وضع ثلج مباشر أو معجون أسنان أو زيت زيتون", correct: false, explanation: "خطأ! الثلج يحرق الجلد المتهيج، والمعجون يحبس الحرارة ويلوث الجرح." }
                        ]
                    },
                    {
                        scenario: "الحالة 2: ظهور فقاقيع مائية فوق مكان الحرق.",
                        options: [
                            { text: "تغطية الحرق بشاش معقم نظيف وعدم فتح أو ثقب الفقاقيع", correct: true, explanation: "أحسنتِ! الفقاقيع تحمي الجلد تحتها وثقبها ينقل الجراثيم." },
                            { text: "فتح الفقاقيع بدبوس لفرغ السائل منها", correct: false, explanation: "خطر! فتح الفقاقيع يعرّض الجرح للالتهاب البكتيري الشديد." }
                        ]
                    }
                ]
            },
            {
                id: 6,
                title: "المستوى 6: التعامل مع الغصة والانسداد",
                icon: "fa-child-reaching",
                instruction: "حددي التدخل المناسب لحالات انسداد مجرى الهواء حسب حالة المصاب:",
                questions: [
                    {
                        scenario: "الحالة 1: طالبة واعية تغص بقطعة تفاح وتسعل بشدة.",
                        options: [
                            { text: "تشجيعها على الاستمرار في السعال وعدم ضربها بقوة على الظهر طالما تسعل", correct: true, explanation: "صحيح! السعال القوي هو أفضل وسيلة لطرد الجسم الغريب طبيعياً." },
                            { text: "إعطاؤها كوب ماء كبير لابتلاعه بالقوة", correct: false, explanation: "خطأ! إعطاء الماء قد يزيد انسداد مجرى التنفس." }
                        ]
                    },
                    {
                        scenario: "الحالة 2: المصاب يتوقف عن السعال ويمسك رقبته بيده وغير قادر على التنفس.",
                        options: [
                            { text: "إجراء ضغطات البطن (مناورة هيمليك) نحو الداخل والأعلى حتى خروج الجسم الغريب", correct: true, explanation: "تصرف إنقاذي بطل! مناورة هيمليك ترفع ضغط الرئة لطرد الجسم الغريب." },
                            { text: "تركه واستدعاء المعلمة فقط دون أي تدخل", correct: false, explanation: "الاختناق التام يتطلب التدخل الفوري بالتوازي مع طلب المساعدة." }
                        ]
                    }
                ]
            },
            {
                id: 7,
                title: "المستوى 7: الإنعاش القلبي الرئوي (CPR)",
                icon: "fa-heart-pulse",
                instruction: "ركّزي على الخطوات الذهبية لإنعاش مصاب فاقد الوعي ولا يتنفس:",
                questions: [
                    {
                        scenario: "المرحلة 1: التأكد من عدم تنفس المصاب واكتشاف توقف القلب.",
                        options: [
                            { text: "البدء فوراً بالضغطات الصدرية في منتصف الصدر معدل 100-120 ضغطة/دقيقة", correct: true, explanation: "ممتاز! الضغط المستمر يضخ الأكسجين للمخ والقلب." },
                            { text: "الانتظار دون فعل شيء حتى وصول الإسعاف", correct: false, explanation: "خطأ! كل دقيقة تأخير تقلل فرص الحياة بنسبة 10%." }
                        ]
                    }
                ]
            },
            {
                id: 8,
                title: "المستوى 8: ربط أدوات حقيبة الإسعافات",
                icon: "fa-object-group",
                instruction: "صلي بين أداة الإسعاف في العمود الأول واستخدامها الصحيح في العمود الثاني بالنقر عليهما:",
                type: "matching_columns",
                pairs: [
                    { id: "p1", tool: "ضماد مثلث", use: "علاقة لتثبيت كسر الذراع" },
                    { id: "p2", tool: "شاش معقم", use: "تغطية الجروح والضغط عليها" },
                    { id: "p3", tool: "مقص معقم", use: "قص الضمادات والملابس" },
                    { id: "p4", tool: "ملقط إسعافي", use: "إزالة الشظايا والأجسام الغريبة" }
                ]
            },
            {
                id: 9,
                title: "المستوى 9: مطابقة الرموز والتشخيص الإسعافي",
                icon: "fa-images",
                instruction: "اربطي بين الرمز الإسعافي والعبارة الطبية المناسبة له:",
                type: "image_text_match",
                items: [
                    { id: "m1", icon: "fa-fire-flame-curled", text: "حرق حراري بالماء أو النار" },
                    { id: "m2", icon: "fa-bone", text: "كسور العظام وتثبيت العضو" },
                    { id: "m3", icon: "fa-droplet", text: "نزيف دموي متدفق" },
                    { id: "m4", icon: "fa-user-ninja", text: "إغماء وفقدان مؤقت للوعي" }
                ]
            },
            {
                id: 10,
                title: "المستوى 10: التحدي الشامل وسفيرات الهلال الأحمر",
                icon: "fa-crown",
                instruction: "التحدي النهائي! واجهي التقييم المركّب للأولويات الإسعافية للحصول على الشهادة مباشرة:",
                questions: [
                    {
                        scenario: "السيناريو المركب: حادث في ساحة المدرسة نتج عنه طالبان: الأول ينزف بغزارة من شريان الساق، والثاني مصاب بخلع في الأصبع ويركض خائفاً. أيهما تبدأين بإسعافه؟",
                        options: [
                            { text: "إسعاف نزيف الشريان فوراً لأنه مهدد للحياة بالصدمة والنزف", correct: true, explanation: "أحسنتِ القول والعمل! أولوية الإسعاف دائماً للحالات المهددة للحياة." },
                            { text: "إسعاف خلع الأصبع لت تهدئته أولاً", correct: false, explanation: "خطأ! الخلع ليس مهدداً للحياة مقارنة بالنزيف الشرياني." }
                        ]
                    }
                ]
            }
        ];

        /* ========================================================= */
        /* AUDIO SYNTHESIZER (TONE.JS)                               */
        /* ========================================================= */
        function playSoundEffect(type) {
            try {
                if (Tone.context.state !== 'running') {
                    Tone.start();
                }
                const synth = new Tone.Synth().toDestination();
                if (type === 'correct') {
                    synth.triggerAttackRelease("E5", "8n", Tone.now());
                    synth.triggerAttackRelease("A5", "8n", Tone.now() + 0.12);
                } else if (type === 'wrong') {
                    synth.triggerAttackRelease("C3", "8n", Tone.now());
                    synth.triggerAttackRelease("F2", "8n", Tone.now() + 0.15);
                } else if (type === 'win') {
                    synth.triggerAttackRelease("C5", "8n", Tone.now());
                    synth.triggerAttackRelease("E5", "8n", Tone.now() + 0.1);
                    synth.triggerAttackRelease("G5", "8n", Tone.now() + 0.2);
                    synth.triggerAttackRelease("C6", "4n", Tone.now() + 0.3);
                }
            } catch(e) {
                // Fallback quiet
            }
        }

        /* ========================================================= */
        /* APPLICATION CONTROLLERS & NAVIGATION                      */
        /* ========================================================= */
        function toggleOtherSchoolInput() {
            const select = document.getElementById('playerSchool');
            const wrapper = document.getElementById('otherSchoolWrapper');
            const otherInput = document.getElementById('playerSchoolOther');
            if (select.value === 'أخرى') {
                wrapper.classList.remove('hidden');
                otherInput.required = true;
            } else {
                wrapper.classList.add('hidden');
                otherInput.required = false;
                otherInput.value = '';
            }
        }

        function handleStartGame(e) {
            e.preventDefault();
            const name = document.getElementById('playerName').value.trim();
            const schoolSelectValue = document.getElementById('playerSchool').value;
            const schoolOtherValue = document.getElementById('playerSchoolOther').value.trim();
            const school = schoolSelectValue === 'أخرى' ? schoolOtherValue : schoolSelectValue;
            const grade = document.getElementById('playerGrade').value;

            if (!name || !school || !grade) {
                return;
            }

            currentUser.name = name;
            currentUser.school = school;
            currentUser.grade = grade;

            // UI Updates
            document.getElementById('navUserName').innerText = currentUser.name;
            document.getElementById('navUserSchool').innerText = currentUser.school;
            document.getElementById('dashWelcomeTitle').innerText = `أهلاً بكِ يا ${currentUser.name.split(' ')[0]}!`;

            document.getElementById('topUserBar').classList.remove('hidden');
            document.getElementById('screenLogin').classList.add('hidden');
            document.getElementById('screenDashboard').classList.remove('hidden');

            renderDashboardGamesGrid();
            updateDashboardStats();
            playSoundEffect('win');
        }

        function isLevelUnlocked(index) {
            if (index === 0) return true;
            return currentUser.completedGames.includes(index - 1);
        }

        function renderDashboardGamesGrid() {
            const container = document.getElementById('gamesGridContainer');
            container.innerHTML = '';

            miniGamesData.forEach((game, index) => {
                const isCompleted = currentUser.completedGames.includes(index);
                const unlocked = isLevelUnlocked(index);
                const score = currentUser.gameScores[index] || 0;

                const card = document.createElement('div');
                card.className = `light-card rounded-2xl p-5 border transition duration-300 relative overflow-hidden flex flex-col justify-between group ${
                    isCompleted 
                        ? 'border-emerald-300 bg-emerald-50/40' 
                        : (unlocked ? 'border-red-200 hover:border-red-500 hover:bg-red-50/30' : 'border-slate-200 bg-slate-100/60 opacity-80')
                }`;

                card.innerHTML = `
                    <div class="flex items-start justify-between mb-3">
                        <div class="w-12 h-12 rounded-xl ${
                            isCompleted 
                                ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' 
                                : (unlocked ? 'bg-red-100 text-red-600 border border-red-300' : 'bg-slate-200 text-slate-400 border border-slate-300')
                        } flex items-center justify-center text-xl font-bold shadow-sm">
                            <i class="fa-solid ${unlocked ? game.icon : 'fa-lock'}"></i>
                        </div>
                        <span class="text-[10px] font-bold px-2.5 py-1 rounded-full ${
                            isCompleted 
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                                : (unlocked ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-slate-200 text-slate-500 border border-slate-300')
                        }">
                            ${isCompleted ? 'مكتمل ✅' : (unlocked ? 'متاح للانطلاق 🔓' : 'مغلق 🔒')}
                        </span>
                    </div>

                    <div>
                        <h4 class="text-sm md:text-base font-black text-slate-900 ${unlocked ? 'group-hover:text-red-700' : ''} transition">${game.title}</h4>
                        <p class="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">${game.instruction}</p>
                    </div>

                    <div class="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                        <div class="flex items-center gap-1 text-amber-600 font-bold">
                            <i class="fa-solid fa-star text-amber-500"></i>
                            <span>${score} / 100</span>
                        </div>
                        
                        ${unlocked ? `
                            <button onclick="launchMiniGame(${index})" class="px-3.5 py-1.5 ${isCompleted ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'} text-white font-bold rounded-xl text-xs flex items-center gap-1 transition shadow-sm">
                                <span>${isCompleted ? 'إعادة اللعب' : 'ابدأ المستوى'}</span>
                                <i class="fa-solid fa-arrow-left"></i>
                            </button>
                        ` : `
                            <span class="text-[11px] text-slate-400 font-bold"><i class="fa-solid fa-lock ml-1"></i>أكمل المستوى السابق</span>
                        `}
                    </div>
                `;
                container.appendChild(card);
            });

            // Update Header Next Level Button text
            const nextUncompletedIdx = miniGamesData.findIndex((_, idx) => !currentUser.completedGames.includes(idx));
            const btnText = document.getElementById('startNextBtnText');
            if (nextUncompletedIdx !== -1) {
                btnText.innerText = `ابدأ ${miniGamesData[nextUncompletedIdx].title}`;
            } else {
                btnText.innerText = `عرض الشهادة التقديرية 🎓`;
            }
        }

        function launchNextSequentialGame() {
            const nextUncompletedIdx = miniGamesData.findIndex((_, idx) => !currentUser.completedGames.includes(idx));
            if (nextUncompletedIdx !== -1) {
                launchMiniGame(nextUncompletedIdx);
            } else {
                openCertificateModal();
            }
        }

        function updateDashboardStats() {
            const totalScore = currentUser.gameScores.reduce((a, b) => a + b, 0);
            currentUser.score = totalScore;
            const completedCount = currentUser.completedGames.length;

            document.getElementById('navUserPoints').innerText = totalScore;
            document.getElementById('navUserProgress').innerText = completedCount;
            document.getElementById('dashTotalScore').innerText = totalScore;

            const percent = Math.round((completedCount / 10) * 100);
            document.getElementById('dashPercentText').innerText = `${percent}%`;
            document.getElementById('dashProgressBar').style.width = `${percent}%`;

            let rank = "مسعف مبتدئ";
            if (totalScore >= 900) rank = "بطل الإسعاف 🏆";
            else if (totalScore >= 700) rank = "مسعف متميز 🥇";
            else if (totalScore >= 400) rank = "مسعف متقدم 🥈";
            else if (totalScore > 0) rank = "مسعف واعد 🥉";

            document.getElementById('dashRankTitle').innerText = rank;

            const certBtn = document.getElementById('finalCertBtn');
            if (completedCount === 10 || totalScore >= 800) {
                certBtn.disabled = false;
                certBtn.classList.remove('opacity-60', 'cursor-not-allowed', 'bg-slate-200', 'text-slate-500');
                certBtn.classList.add('bg-emerald-600', 'hover:bg-emerald-700', 'text-white', 'siren-glow-light');
            }
        }

        function exitGameToDashboard() {
            document.getElementById('screenGameArena').classList.add('hidden');
            document.getElementById('modalGameOver').classList.add('hidden');
            document.getElementById('modalLevelTransition').classList.add('hidden');
            document.getElementById('screenDashboard').classList.remove('hidden');
            updateDashboardStats();
            renderDashboardGamesGrid();
        }

        function restartCurrentMiniGame() {
            document.getElementById('modalGameOver').classList.add('hidden');
            launchMiniGame(currentGameIndex);
        }

        /* ========================================================= */
        /* MINI-GAME LAUNCHER & INTERACTIVE ENGINES                   */
        /* ========================================================= */
        function launchMiniGame(gameIndex) {
            currentGameIndex = gameIndex;
            currentGameAttempts = 3;
            currentSubQuestionIndex = 0;

            const game = miniGamesData[gameIndex];

            // Render Header Info
            document.getElementById('gameArenaIndexTag').innerText = `المستوى رقم ${gameIndex + 1} من 10`;
            document.getElementById('gameArenaTitle').innerText = game.title;
            document.getElementById('gameArenaInstruction').innerText = game.instruction;
            document.getElementById('gameArenaIconBox').innerHTML = `<i class="fa-solid ${game.icon}"></i>`;

            renderGameHearts();
            document.getElementById('gameFeedbackBox').classList.add('hidden');

            document.getElementById('screenDashboard').classList.add('hidden');
            document.getElementById('modalLevelTransition').classList.add('hidden');
            document.getElementById('screenGameArena').classList.remove('hidden');

            renderCurrentSubQuestion();
        }

        function renderGameHearts() {
            const container = document.getElementById('gameHeartsBox');
            container.innerHTML = '';
            for (let i = 0; i < 3; i++) {
                const heart = document.createElement('i');
                heart.className = i < currentGameAttempts ? 'fa-solid fa-heart text-red-600 text-sm' : 'fa-regular fa-heart text-slate-300 text-sm';
                container.appendChild(heart);
            }
        }

        function renderCurrentSubQuestion() {
            const game = miniGamesData[currentGameIndex];
            const viewport = document.getElementById('gameViewport');
            viewport.innerHTML = '';
            document.getElementById('gameFeedbackBox').classList.add('hidden');

            // Handle Custom Specialized Game Types
            if (game.type === "dialpad_game") {
                document.getElementById('gameSubStepText').innerText = `1 / 1`;
                renderDialpadEngine(viewport, game);
                return;
            }

            if (game.type === "matching_columns") {
                document.getElementById('gameSubStepText').innerText = `1 / 1`;
                renderMatchingColumnsEngine(viewport, game);
                return;
            }

            if (game.type === "image_text_match") {
                document.getElementById('gameSubStepText').innerText = `1 / 1`;
                renderImageTextMatchEngine(viewport, game);
                return;
            }

            // Standard Multiple Questions per Game
            if (game.questions) {
                const totalQ = game.questions.length;
                document.getElementById('gameSubStepText').innerText = `${currentSubQuestionIndex + 1} / ${totalQ}`;
                const currentQ = game.questions[currentSubQuestionIndex];

                if (currentQ.hazards) {
                    renderHazardsScene(viewport, currentQ);
                } else if (currentQ.options) {
                    renderMultipleChoiceOptions(viewport, currentQ);
                }
            }
        }

        /* SCENE SAFETY ENGINE */
        let currentFoundHazards = [];
        function renderHazardsScene(container, currentQ) {
            currentFoundHazards = [];
            const box = document.createElement('div');
            box.className = "space-y-4";
            box.innerHTML = `<p class="text-sm font-bold text-slate-800 bg-slate-100 p-3.5 rounded-2xl border border-slate-200">${currentQ.scene}</p>`;

            const grid = document.createElement('div');
            grid.className = "grid grid-cols-1 sm:grid-cols-2 gap-3 my-2";

            currentQ.hazards.forEach(hazard => {
                const btn = document.createElement('button');
                btn.id = `hazard-${hazard.id}`;
                btn.className = "p-4 rounded-2xl bg-white border border-slate-300 hover:border-red-500 text-center flex items-center justify-between transition group shadow-sm";
                btn.onclick = () => {
                    if (currentFoundHazards.includes(hazard.id)) return;
                    currentFoundHazards.push(hazard.id);
                    playSoundEffect('correct');
                    btn.classList.add('border-emerald-500', 'bg-emerald-50');
                    btn.innerHTML += `<span class="text-[10px] font-bold text-emerald-800 bg-emerald-200 px-2.5 py-1 rounded-full">تم التأمين ✅</span>`;

                    if (currentFoundHazards.length === currentQ.hazards.length) {
                        advanceSubQuestionOrFinish(100, currentQ.safeAction);
                    }
                };
                btn.innerHTML = `
                    <div class="flex items-center gap-3">
                        <i class="fa-solid ${hazard.icon} text-2xl ${hazard.color}"></i>
                        <span class="text-xs font-bold text-slate-800">${hazard.name}</span>
                    </div>
                `;
                grid.appendChild(btn);
            });

            box.appendChild(grid);
            container.appendChild(box);
        }

        /* MULTIPLE CHOICE ENGINE */
        function renderMultipleChoiceOptions(container, currentQ) {
            const box = document.createElement('div');
            box.className = "space-y-3 my-2";
            box.innerHTML = `<p class="text-sm font-bold text-slate-800 bg-slate-100 p-3.5 rounded-2xl border border-slate-200 leading-relaxed">${currentQ.scenario}</p>`;

            const optionsGrid = document.createElement('div');
            optionsGrid.className = "space-y-2.5";

            currentQ.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = "w-full text-right p-4 rounded-2xl bg-white border border-slate-300 hover:border-red-500 text-xs font-bold text-slate-800 transition flex items-center justify-between group shadow-sm";
                btn.onclick = () => {
                    if (opt.correct) {
                        playSoundEffect('correct');
                        btn.classList.add('border-emerald-500', 'bg-emerald-50', 'text-emerald-900');
                        advanceSubQuestionOrFinish(100, opt.explanation);
                    } else {
                        playSoundEffect('wrong');
                        btn.classList.add('border-red-500', 'bg-red-50', 'text-red-900', 'shake-anim');
                        btn.disabled = true;

                        currentGameAttempts--;
                        renderGameHearts();

                        if (currentGameAttempts <= 0) {
                            triggerGameOverScreen();
                        } else {
                            showFeedback(false, "محاولة غير دقيقة!", opt.explanation);
                        }
                    }
                };
                btn.innerHTML = `
                    <span>${opt.text}</span>
                    <i class="fa-regular fa-circle text-slate-400 group-hover:text-red-600 transition"></i>
                `;
                optionsGrid.appendChild(btn);
            });

            box.appendChild(optionsGrid);
            container.appendChild(box);
        }

        /* INTERACTIVE DIALPAD ENGINE (911 DIALING) */
        let dialedDigits = "";
        function renderDialpadEngine(container, game) {
            dialedDigits = "";

            const mainBox = document.createElement('div');
            mainBox.className = "max-w-xs mx-auto bg-white p-5 rounded-3xl border border-slate-300 space-y-4 text-center shadow-lg";

            const screen = document.createElement('div');
            screen.id = "dialpadScreen";
            screen.className = "bg-slate-900 p-3 rounded-2xl border border-slate-800 text-2xl font-black text-emerald-400 tracking-widest min-h-[50px] flex items-center justify-center siren-glow-light";
            screen.innerText = "___";

            const keypad = document.createElement('div');
            keypad.className = "grid grid-cols-3 gap-3";

            const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];
            digits.forEach(d => {
                const btn = document.createElement('button');
                btn.className = "w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-lg border border-slate-300 flex items-center justify-center mx-auto transition active:scale-95 shadow-sm";
                btn.innerText = d;
                btn.onclick = () => {
                    if (dialedDigits.length < 5) {
                        dialedDigits += d;
                        screen.innerText = dialedDigits;
                        playSoundEffect('correct');
                    }
                };
                keypad.appendChild(btn);
            });

            const actionRow = document.createElement('div');
            actionRow.className = "flex justify-center gap-4 pt-2";

            const callBtn = document.createElement('button');
            callBtn.className = "px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-full text-sm flex items-center gap-2 shadow-md";
            callBtn.innerHTML = `<i class="fa-solid fa-phone"></i> اتصال`;
            callBtn.onclick = () => {
                if (dialedDigits === game.targetNumber) {
                    playSoundEffect('win');
                    mainBox.innerHTML = `
                        <div class="p-4 bg-emerald-50 border border-emerald-400 rounded-2xl text-emerald-900 text-xs font-bold space-y-2">
                            <i class="fa-solid fa-phone-volume text-2xl text-emerald-600"></i>
                            <p>نجح الاتصال بالطوارئ (911)!</p>
                        </div>
                    `;
                    setTimeout(() => {
                        renderMultipleChoiceOptions(container, game.questions[0]);
                    }, 1000);
                } else {
                    playSoundEffect('wrong');
                    screen.classList.add('shake-anim');
                    setTimeout(() => screen.classList.remove('shake-anim'), 500);
                    dialedDigits = "";
                    screen.innerText = "خطأ! اطلبي (911)";
                    currentGameAttempts--;
                    renderGameHearts();
                    if (currentGameAttempts <= 0) triggerGameOverScreen();
                }
            };

            const clearBtn = document.createElement('button');
            clearBtn.className = "w-10 h-10 rounded-full bg-red-100 text-red-600 font-bold text-xs border border-red-300 flex items-center justify-center";
            clearBtn.innerHTML = `<i class="fa-solid fa-backspace"></i>`;
            clearBtn.onclick = () => {
                dialedDigits = "";
                screen.innerText = "___";
            };

            actionRow.appendChild(callBtn);
            actionRow.appendChild(clearBtn);

            mainBox.appendChild(screen);
            mainBox.appendChild(keypad);
            mainBox.appendChild(actionRow);

            container.appendChild(mainBox);
        }

        /* MATCH TWO COLUMNS ENGINE (CONNECT LISTS) */
        let selectedToolPair = null;
        let matchedPairIds = [];
        function renderMatchingColumnsEngine(container, game) {
            selectedToolPair = null;
            matchedPairIds = [];

            const grid = document.createElement('div');
            grid.className = "grid grid-cols-1 md:grid-cols-2 gap-6 my-2";

            const colTools = document.createElement('div');
            colTools.className = "space-y-3";
            colTools.innerHTML = `<h4 class="text-xs font-black text-red-700 uppercase">العمود الأول: الأداة الإسعافية</h4>`;

            const colUses = document.createElement('div');
            colUses.className = "space-y-3";
            colUses.innerHTML = `<h4 class="text-xs font-black text-amber-700 uppercase">العمود الثاني: الاستخدام المناسب</h4>`;

            const shuffledUses = [...game.pairs].sort(() => Math.random() - 0.5);

            game.pairs.forEach(pair => {
                const btn = document.createElement('button');
                btn.id = `tool-${pair.id}`;
                btn.className = "w-full p-3.5 rounded-2xl bg-white border border-slate-300 text-right text-xs font-bold text-slate-800 hover:border-red-500 transition flex items-center justify-between shadow-sm";
                btn.innerHTML = `<span>${pair.tool}</span> <i class="fa-solid fa-link text-slate-400"></i>`;
                btn.onclick = () => {
                    if (matchedPairIds.includes(pair.id)) return;
                    document.querySelectorAll('[id^="tool-"]').forEach(el => el.classList.remove('match-selected'));
                    btn.classList.add('match-selected');
                    selectedToolPair = pair.id;
                    playSoundEffect('correct');
                };
                colTools.appendChild(btn);
            });

            shuffledUses.forEach(pair => {
                const btn = document.createElement('button');
                btn.id = `use-${pair.id}`;
                btn.className = "w-full p-3.5 rounded-2xl bg-white border border-slate-300 text-right text-xs font-bold text-slate-800 hover:border-amber-500 transition flex items-center justify-between shadow-sm";
                btn.innerHTML = `<span>${pair.use}</span> <i class="fa-solid fa-bullseye text-slate-400"></i>`;
                btn.onclick = () => {
                    if (matchedPairIds.includes(pair.id)) return;
                    if (selectedToolPair === pair.id) {
                        playSoundEffect('correct');
                        matchedPairIds.push(pair.id);
                        document.getElementById(`tool-${pair.id}`).classList.add('match-done');
                        btn.classList.add('match-done');
                        selectedToolPair = null;

                        if (matchedPairIds.length === game.pairs.length) {
                            finishMiniGame(100, "أحسنتِ الربط ببراعة! طابقتِ أدوات حقيبة الإسعاف بوظائفها الدقيقة.");
                        }
                    } else {
                        playSoundEffect('wrong');
                        currentGameAttempts--;
                        renderGameHearts();
                        if (currentGameAttempts <= 0) triggerGameOverScreen();
                    }
                };
                colUses.appendChild(btn);
            });

            grid.appendChild(colTools);
            grid.appendChild(colUses);
            container.appendChild(grid);
        }

        /* IMAGE / ICON TO TEXT MATCH ENGINE */
        let matchedImageIds = [];
        let selectedIconId = null;
        function renderImageTextMatchEngine(container, game) {
            matchedImageIds = [];
            selectedIconId = null;

            const grid = document.createElement('div');
            grid.className = "grid grid-cols-1 md:grid-cols-2 gap-6 my-2";

            const colIcons = document.createElement('div');
            colIcons.className = "space-y-3";
            colIcons.innerHTML = `<h4 class="text-xs font-black text-red-700 uppercase">اختر الرمز الإسعافي:</h4>`;

            const colTexts = document.createElement('div');
            colTexts.className = "space-y-3";
            colTexts.innerHTML = `<h4 class="text-xs font-black text-emerald-700 uppercase">اختر المعنى الإسعافي:</h4>`;

            const shuffledTexts = [...game.items].sort(() => Math.random() - 0.5);

            game.items.forEach(item => {
                const btn = document.createElement('button');
                btn.id = `icon-${item.id}`;
                btn.className = "w-full p-4 rounded-2xl bg-white border border-slate-300 text-right text-xs font-bold text-slate-800 hover:border-red-500 transition flex items-center gap-3 shadow-sm";
                btn.innerHTML = `<i class="fa-solid ${item.icon} text-2xl text-red-600"></i> <span>رمز حالة طارئة</span>`;
                btn.onclick = () => {
                    if (matchedImageIds.includes(item.id)) return;
                    document.querySelectorAll('[id^="icon-"]').forEach(el => el.classList.remove('match-selected'));
                    btn.classList.add('match-selected');
                    selectedIconId = item.id;
                    playSoundEffect('correct');
                };
                colIcons.appendChild(btn);
            });

            shuffledTexts.forEach(item => {
                const btn = document.createElement('button');
                btn.id = `text-${item.id}`;
                btn.className = "w-full p-4 rounded-2xl bg-white border border-slate-300 text-right text-xs font-bold text-slate-800 hover:border-emerald-500 transition flex items-center justify-between shadow-sm";
                btn.innerHTML = `<span>${item.text}</span> <i class="fa-regular fa-check-circle text-slate-400"></i>`;
                btn.onclick = () => {
                    if (matchedImageIds.includes(item.id)) return;
                    if (selectedIconId === item.id) {
                        playSoundEffect('correct');
                        matchedImageIds.push(item.id);
                        document.getElementById(`icon-${item.id}`).classList.add('match-done');
                        btn.classList.add('match-done');
                        selectedIconId = null;

                        if (matchedImageIds.length === game.items.length) {
                            finishMiniGame(100, "ممتاز! قمتِ بمطابقة الرموز الإسعافية بالمعاني الصحيحة.");
                        }
                    } else {
                        playSoundEffect('wrong');
                        currentGameAttempts--;
                        renderGameHearts();
                        if (currentGameAttempts <= 0) triggerGameOverScreen();
                    }
                };
                colTexts.appendChild(btn);
            });

            grid.appendChild(colIcons);
            grid.appendChild(colTexts);
            container.appendChild(grid);
        }

        /* PROGRESSION & FEEDBACK CONTROLLERS */
        function advanceSubQuestionOrFinish(scoreAwarded, explanation) {
            const game = miniGamesData[currentGameIndex];
            if (game.questions && currentSubQuestionIndex < game.questions.length - 1) {
                showFeedback(true, "إجابة متقنة!", explanation);
                const nextBtn = document.getElementById('gameNextActionBtn');
                nextBtn.onclick = () => {
                    currentSubQuestionIndex++;
                    renderCurrentSubQuestion();
                };
            } else {
                finishMiniGame(scoreAwarded, explanation);
            }
        }

        function triggerGameOverScreen() {
            playSoundEffect('wrong');
            document.getElementById('modalGameOver').classList.remove('hidden');
        }

        function showFeedback(isSuccess, title, msg) {
            const box = document.getElementById('gameFeedbackBox');
            const icon = document.getElementById('gameFeedbackIcon');
            const titleEl = document.getElementById('gameFeedbackTitle');
            const msgEl = document.getElementById('gameFeedbackMessage');

            box.classList.remove('hidden', 'bg-emerald-50', 'border-emerald-400', 'text-emerald-900', 'bg-red-50', 'border-red-400', 'text-red-900');

            if (isSuccess) {
                box.classList.add('bg-emerald-50', 'border-emerald-400', 'text-emerald-900');
                icon.className = "fa-solid fa-circle-check text-emerald-600 text-xl";
            } else {
                box.classList.add('bg-red-50', 'border-red-400', 'text-red-900');
                icon.className = "fa-solid fa-circle-xmark text-red-600 text-xl";
            }

            titleEl.innerText = title;
            msgEl.innerText = msg;
        }

        function finishMiniGame(scoreAwarded, explanation) {
            playSoundEffect('win');
            confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });

            currentUser.gameScores[currentGameIndex] = scoreAwarded;
            if (!currentUser.completedGames.includes(currentGameIndex)) {
                currentUser.completedGames.push(currentGameIndex);
            }

            updateDashboardStats();

            // Check if Level 10 (Last Level) is completed
            if (currentGameIndex === 9 || currentUser.completedGames.length === 10) {
                // Directly redirect to the certificate after Level 10
                setTimeout(() => {
                    document.getElementById('screenGameArena').classList.add('hidden');
                    openCertificateModal();
                }, 1500);
            } else {
                // Show Level Transition Modal
                const nextGame = miniGamesData[currentGameIndex + 1];
                document.getElementById('nextLevelName').innerText = nextGame.title;
                document.getElementById('transitionTitle').innerText = `تم تجاوُز ${miniGamesData[currentGameIndex].title} بنجاح!`;
                
                setTimeout(() => {
                    document.getElementById('screenGameArena').classList.add('hidden');
                    document.getElementById('modalLevelTransition').classList.remove('hidden');
                }, 1200);
            }
        }

        function proceedToNextLevelFromModal() {
            document.getElementById('modalLevelTransition').classList.add('hidden');
            if (currentGameIndex < 9) {
                launchMiniGame(currentGameIndex + 1);
            } else {
                openCertificateModal();
            }
        }

        /* ========================================================= */
        /* MODAL DIALOG CONTROLLERS                                   */
        /* ========================================================= */
        function openSourcesModal() { document.getElementById('modalSources').classList.remove('hidden'); }
        function closeSourcesModal() { document.getElementById('modalSources').classList.add('hidden'); }

        function openLeaderboardModal() {
            const tbody = document.getElementById('leaderboardTbody');
            tbody.innerHTML = '';

            const existIdx = leaderboardData.findIndex(u => u.name === currentUser.name && u.school === currentUser.school);
            if (existIdx > -1) {
                leaderboardData[existIdx].score = currentUser.score;
            } else if (currentUser.name) {
                leaderboardData.push({
                    name: currentUser.name,
                    school: currentUser.school,
                    score: currentUser.score,
                    rank: document.getElementById('dashRankTitle').innerText
                });
            }

            leaderboardData.sort((a, b) => b.score - a.score);

            leaderboardData.forEach((row, i) => {
                const tr = document.createElement('tr');
                const isUser = row.name === currentUser.name;
                tr.className = isUser ? "bg-red-50 font-bold text-red-900" : "hover:bg-slate-50 text-slate-700";
                tr.innerHTML = `
                    <td class="p-3 font-black">${i === 0 ? '🥇 #1' : (i === 1 ? '🥈 #2' : (i === 2 ? '🥉 #3' : '#' + (i + 1)))}</td>
                    <td class="p-3">${row.name} ${isUser ? '<span class="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded mr-1">أنتِ</span>' : ''}</td>
                    <td class="p-3 text-slate-500">${row.school}</td>
                    <td class="p-3 font-black text-red-600">${row.score}</td>
                    <td class="p-3 text-emerald-700 font-bold">${row.rank || 'مسعف'}</td>
                `;
                tbody.appendChild(tr);
            });

            document.getElementById('modalLeaderboard').classList.remove('hidden');
        }
        function closeLeaderboardModal() { document.getElementById('modalLeaderboard').classList.add('hidden'); }

        function openCertificateModal() {
            document.getElementById('certStudentName').innerText = currentUser.name || "اسم الطالب الكريمة";
            document.getElementById('certStudentSchool').innerText = currentUser.school || "مدرسة حرثا الثانوية الشاملة للبنات";
            document.getElementById('certStudentGrade').innerText = currentUser.grade || "الصف العاشر";
            document.getElementById('certStudentScore').innerText = currentUser.score || 1000;
            document.getElementById('certStudentRank').innerText = document.getElementById('dashRankTitle').innerText || "بطل الإسعاف 🏆";

            const today = new Date();
            const dateStr = today.getFullYear() + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + String(today.getDate()).padStart(2, '0');
            document.getElementById('certDate').innerText = dateStr;

            // Generate unique random reference number
            document.getElementById('certRefNo').innerText = 'HA-' + today.getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

            document.getElementById('modalCertificate').classList.remove('hidden');
            playSoundEffect('win');
            confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
        }
        function closeCertificateModal() { document.getElementById('modalCertificate').classList.add('hidden'); }

        function shareOnWhatsApp() {
            const text = `🎉 أتممتُ بنجاح "مسعف المستقبل" في مديرية بني كنانة بمجموع ${currentUser.score} نقطة ونلت رتبة (${document.getElementById('dashRankTitle').innerText})! %0Aتعلم.. أنقذ حياة! 🚑`;
            window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
        }

        function resetAndPlayAgain() {
            // Reset user state
            currentUser = {
                name: '',
                school: '',
                grade: '',
                score: 0,
                completedGames: [],
                gameScores: Array(10).fill(0)
            };

            // Reset login form fields
            const loginForm = document.getElementById('loginForm');
            if (loginForm) loginForm.reset();

            // Close all modals
            closeCertificateModal();
            closeLeaderboardModal();
            closeSourcesModal();
            document.getElementById('modalGameOver').classList.add('hidden');
            document.getElementById('modalLevelTransition').classList.add('hidden');

            // Hide game views & top user bar
            document.getElementById('screenDashboard').classList.add('hidden');
            document.getElementById('screenGameArena').classList.add('hidden');
            document.getElementById('topUserBar').classList.add('hidden');

            // Show main screen login
            document.getElementById('screenLogin').classList.remove('hidden');

            // Scroll smoothly to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
