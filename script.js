document.addEventListener('DOMContentLoaded', () => {
    // Выбираем все элементы экранов и модальных окон
    const mainScreen = document.getElementById('main-screen');
    const exerciseGuideScreen = document.getElementById('exercise-guide-screen');
    const trainingSessionScreen = document.getElementById('training-session-screen');
    const screens = [mainScreen, exerciseGuideScreen, trainingSessionScreen];
    const customizationMenu = document.getElementById('customization-menu');
    const sessionSummaryModal = document.getElementById('session-summary-modal');
    const warmupPromptModal = document.getElementById('warmup-prompt-modal');

    // Элементы главного экрана
    const profilePic = document.getElementById('profile-pic');
    const profilePicUpload = document.getElementById('profile-pic-upload');
    const changePicBtn = document.getElementById('change-pic-btn');
    const userNameDisplay = document.getElementById('user-name');
    const editNameBtn = document.getElementById('edit-name-btn');
    const nameInputField = document.getElementById('name-input-field');
    const userLevelDisplay = document.getElementById('user-level');
    const currentExpDisplay = document.getElementById('current-exp');
    const nextLevelExpDisplay = document.getElementById('next-level-exp');
    const expBar = document.getElementById('exp-bar');
    const beginTrainingBtn = document.getElementById('begin-training-btn');
    const exerciseGuideBtn = document.getElementById('exercise-guide-btn');
    const customizationBtn = document.getElementById('customization-btn');

    // Элементы справки
    const closeGuideBtn = document.getElementById('close-guide-btn');
    const guideContent = document.querySelector('.guide-content');

    // Элементы экрана тренировки
    const sessionTypeDisplay = document.getElementById('session-type-display');
    const exitSessionBtn = document.getElementById('exit-session-btn');
    const sessionTimeDisplay = document.getElementById('session-time-display');
    const currentExerciseAnimation = document.getElementById('current-exercise-animation');
    const currentExerciseNameDisplay = document.getElementById('current-exercise-name');
    const exerciseTimeDisplay = document.getElementById('exercise-time-display');
    const pauseResumeBtn = document.getElementById('pause-resume-btn');
    const pauseIcon = '<i class="material-icons">pause</i>';
    const playIcon = '<i class="material-icons">play_arrow</i>';
    const currentExerciseProgressBar = document.getElementById('current-exercise-progress-bar');
    const totalSessionProgressBar = document.getElementById('total-session-progress-bar');

    // Элементы кастомизации
    const closeCustomizationModalBtn = document.getElementById('close-customization-modal');
    const themeOptionButtons = document.querySelectorAll('.theme-option');

    // Элементы сводки
    const summaryTitleDisplay = document.getElementById('summary-title');
    const summaryMessageDisplay = document.getElementById('summary-message');
    const summaryExpGainedDisplay = document.getElementById('summary-exp-gained');
    const closeSummaryModalBtn = document.getElementById('close-summary-modal-btn');

    // Элементы окна с предложением разминки
    const startWarmupBtn = document.getElementById('start-warmup-btn');
    const skipWarmupBtn = document.getElementById('skip-warmup-btn');


    // --- Состояние приложения ---
    let userData = { name: 'Имя пользователя', level: 1, currentExp: 0, expToNextLevel: 100, profilePicSrc: 'https://img.itisuniqueofficial.com/80', lastWorkoutDate: null };
    const warmupExercises = [ { name: "Круговые вращения руками", animationUrl: "video/arm_circles.webp", description: "Встаньте, ноги на ширине плеч, руки вытянуты в стороны. Делайте небольшие круговые движения, постепенно увеличивая их радиус." }, { name: "Махи ногой (вперед-назад)", animationUrl: "video/leg_swings.webp", description: "Держитесь за стену для равновесия. Совершайте махи одной ногой вперед и назад контролируемым движением." }, { name: "Скручивания корпуса", animationUrl: "video/torso_twists.webp", description: "Встаньте, ноги широко расставлены, колени слегка согнуты. Поворачивайте верхнюю часть туловища из стороны в сторону." } ];
    const warmupConfig = { workDuration: 20, restDuration: 0, exercises: warmupExercises, rounds: 1, isWarmup: true, expAward: 25 };
    const exercises = [ { name: "Джампинг-джек", animationUrl: "video/jumping_jacks.webp", description: "Из положения стоя, в прыжке расставьте ноги в стороны и хлопните руками над головой. Вернитесь в исходное положение." }, { name: "Бег с высоким подниманием колен", animationUrl: "video/high_knees.webp", description: "Бегите на месте, поднимая колени как можно выше к груди с каждым шагом. Держите мышцы кора в напряжении." }, { name: "Бёрпи", animationUrl: "video/burpees.webp", description: "Из положения стоя, присядьте, упритесь руками в пол, отпрыгните ногами назад в планку, (опционально - отожмитесь), верните ноги в присед и выпрыгните вверх." }, { name: "Скалолаз", animationUrl: "video/mountain_climbers.webp", description: "Начните из положения планки. Подтяните одно колено к груди, затем быстро смените на другое, имитируя бег на месте." }, { name: "Приседания с выпрыгиванием", animationUrl: "video/squat_jumps.webp", description: "Выполните обычное приседание, затем выпрыгните вверх. Мягко приземлитесь обратно в положение приседа." }, { name: "Выпады (поочередно)", animationUrl: "video/lunges.webp", description: "Сделайте шаг вперед одной ногой, опустив бедра так, чтобы оба колена были согнуты под углом 90 градусов. Вернитесь в исходное положение и повторите с другой ногой." }, { name: "Захлёст голени", animationUrl: "video/butt_kicks.webp", description: "Бегите на месте, стараясь пятками коснуться ягодиц. Держите верхнюю часть тела неподвижной." }, { name: "Прыжки в планке", animationUrl: "video/plank_jacks.webp", description: "Начните из положения планки. В прыжке разведите ноги в стороны, затем сведите их вместе. Держите кор напряженным, а бедра стабильными." }, { name: "Конькобежец", animationUrl: "video/skaters.webp", description: "Балансируя на одной ноге, очертите другой полукруг медленно выпрямив её сначала впереди опороной, а затем заведя её назад." }, { name: "Прыжки из стороны в сторону", animationUrl: "video/box_jumps.webp", description: "Встаньте ровно, согните одну ногу в угол 90 град. Выполните прыжок боком выставив одну руку перед собой а другую заведя назад, затем сразу же оттолкнитесь и прыгните в предыдущую сторону" }, { name: "Невидимая скакалка", animationUrl: "video/jump_rope.webp", description: "Имитируйте движения прыжков через скакалку. Держите ноги вместе и легко прыгайте на носках, вращая запястьями, как будто держите скакалку." } ];
    let currentTrainingSession = null, sessionTimerInterval = null, exerciseTimerInterval = null, isPaused = false, estimatedTotalSessionDuration = 0;

    // --- Вспомогательные функции ---
    function showScreen(screenToShow) { screens.forEach(screen => screen.classList.remove('active')); screenToShow.classList.add('active'); }
    function updateProfileDisplay() { userNameDisplay.textContent = userData.name; profilePic.src = userData.profilePicSrc; userLevelDisplay.textContent = userData.level; currentExpDisplay.textContent = userData.currentExp; nextLevelExpDisplay.textContent = userData.expToNextLevel; const expPercentage = (userData.currentExp / userData.expToNextLevel) * 100; expBar.style.width = `${expPercentage}%`; }
    function saveUserData() { localStorage.setItem('fitnessAppData', JSON.stringify(userData)); }
    function loadUserData() { const savedData = localStorage.getItem('fitnessAppData'); if (savedData) { userData = JSON.parse(savedData); } if (!userData.profilePicSrc) { userData.profilePicSrc = 'https://via.placeholder.com/80'; } updateProfileDisplay(); }
    function addExp(amount) { userData.currentExp += amount; let leveledUp = false; while (userData.currentExp >= userData.expToNextLevel) { userData.level++; leveledUp = true; userData.currentExp -= userData.expToNextLevel; userData.expToNextLevel = Math.floor(userData.expToNextLevel * 1.2); } updateProfileDisplay(); saveUserData(); return { expGained: amount, leveledUp: leveledUp, newLevel: userData.level }; }

    // --- Обработчики событий и навигация ---
    beginTrainingBtn.addEventListener('click', () => { const today = new Date().toDateString(); if (userData.lastWorkoutDate !== today) { warmupPromptModal.classList.add('active'); } else { startTrainingSession(); } });
    startWarmupBtn.addEventListener('click', () => { warmupPromptModal.classList.remove('active'); startTrainingSession(true); });
    skipWarmupBtn.addEventListener('click', () => { warmupPromptModal.classList.remove('active'); startTrainingSession(false); });
    exerciseGuideBtn.addEventListener('click', () => { populateExerciseGuide(); showScreen(exerciseGuideScreen); });
    closeGuideBtn.addEventListener('click', () => { showScreen(mainScreen); });
    customizationBtn.addEventListener('click', () => customizationMenu.classList.add('active'));
    closeCustomizationModalBtn.addEventListener('click', () => customizationMenu.classList.remove('active'));
    closeSummaryModalBtn.addEventListener('click', () => { sessionSummaryModal.classList.remove('active'); showScreen(mainScreen); });
    window.addEventListener('click', (event) => { if (event.target === customizationMenu) { customizationMenu.classList.remove('active'); } if (event.target === sessionSummaryModal) { sessionSummaryModal.classList.remove('active'); showScreen(mainScreen); } if(event.target === warmupPromptModal) {warmupPromptModal.classList.remove('active');}});

    // --- Логика справки ---
    function populateExerciseGuide() {
        guideContent.innerHTML = '';
        const allExercises = [...warmupExercises, ...exercises];
        allExercises.forEach(exercise => {
            const item = document.createElement('div');
            item.classList.add('exercise-item');
            item.innerHTML = `
                <h3>${exercise.name}</h3>
                <div class="animation-placeholder">
                    <img src="${exercise.animationUrl}" alt="Анимация ${exercise.name}" loading="lazy">
                </div>
                <p>${exercise.description}</p>
            `;
            guideContent.appendChild(item);
        });
    }

    // --- Логика тренировки ---
    function getWorkoutConfig(level) {
        let config = { workDuration: 20, restDuration: 10, exercisesPerRound: 4, rounds: 1, isWarmup: false };
        if (level >= 2) { config.workDuration = 25; config.exercisesPerRound = 4; }
        if (level >= 4) { config.workDuration = 30; config.restDuration = 10; config.rounds = 2; config.exercisesPerRound = 4;}
        if (level >= 6) { config.workDuration = 30; config.exercisesPerRound = 5; config.rounds = 2;}
        if (level >= 8) { config.workDuration = 35; config.restDuration = 10; config.exercisesPerRound = 5; config.rounds = 2;}
        if (level >= 10) { config.workDuration = 40; config.restDuration = 15; config.exercisesPerRound = 5; config.rounds = 3;}
        if (level >= 13) { config.workDuration = 40; config.restDuration = 15; config.exercisesPerRound = 6; config.rounds = 3;}
        if (level >= 16) { config.workDuration = 45; config.restDuration = 15; config.exercisesPerRound = 6; config.rounds = 3;}
        return config;
    }

    function startTrainingSession(isWarmup = false) {
        isPaused = false;
        pauseResumeBtn.innerHTML = pauseIcon;
        let config, sessionExercises;
        if (isWarmup) {
            config = warmupConfig;
            sessionExercises = config.exercises;
            sessionTypeDisplay.textContent = 'Разминка';
            estimatedTotalSessionDuration = config.workDuration * sessionExercises.length;
        } else {
            config = getWorkoutConfig(userData.level);
            const totalExercisesInSession = config.exercisesPerRound * config.rounds;
            sessionExercises = [...exercises].sort(() => 0.5 - Math.random()).slice(0, totalExercisesInSession);
            sessionTypeDisplay.textContent = 'Тренировка';
            estimatedTotalSessionDuration = (config.workDuration * totalExercisesInSession) + (config.restDuration * (totalExercisesInSession - 1));
        }
        currentTrainingSession = { config, exercises: sessionExercises, currentExerciseArrayIndex: 0, isWorkPhase: true, timeLeftInPhase: config.workDuration, totalSessionTime: 0, };
        currentExerciseProgressBar.style.width = '0%';
        totalSessionProgressBar.style.width = '0%';
        updateTotalSessionTimeDisplay();
        startNextPhase();
        startSessionTimer();
        showScreen(trainingSessionScreen);
    }

    function startSessionTimer() {
        clearInterval(sessionTimerInterval);
        sessionTimerInterval = setInterval(() => {
            if (!isPaused && currentTrainingSession) {
                currentTrainingSession.totalSessionTime++;
                updateTotalSessionTimeDisplay();
                if (estimatedTotalSessionDuration > 0) {
                    const totalProgress = Math.min((currentTrainingSession.totalSessionTime / estimatedTotalSessionDuration) * 100, 100);
                    totalSessionProgressBar.style.width = `${totalProgress}%`;
                }
            }
        }, 1000);
    }
    
    function updateTotalSessionTimeDisplay() { if (!currentTrainingSession) return; const minutes = Math.floor(currentTrainingSession.totalSessionTime / 60).toString().padStart(2, '0'); const seconds = (currentTrainingSession.totalSessionTime % 60).toString().padStart(2, '0'); sessionTimeDisplay.textContent = `${minutes}:${seconds}`; }

    function startNextPhase() {
        clearInterval(exerciseTimerInterval);
        if (!currentTrainingSession) return;
        if (currentTrainingSession.currentExerciseArrayIndex >= currentTrainingSession.exercises.length) {
            endTrainingSession(true);
            return;
        }
        const currentExercise = currentTrainingSession.exercises[currentTrainingSession.currentExerciseArrayIndex];
        let phaseDuration;
        if (currentTrainingSession.isWorkPhase) {
            currentExerciseAnimation.src = currentExercise.animationUrl;
            currentExerciseNameDisplay.textContent = currentExercise.name;
            phaseDuration = currentTrainingSession.config.workDuration;
        } else {
            currentExerciseAnimation.src = "video/rest.webp";
            currentExerciseNameDisplay.textContent = "Отдых";
            phaseDuration = currentTrainingSession.config.restDuration;
        }
        currentTrainingSession.timeLeftInPhase = phaseDuration;
        exerciseTimeDisplay.textContent = phaseDuration.toString().padStart(2, '0');
        currentExerciseProgressBar.style.transition = 'none';
        currentExerciseProgressBar.style.width = '0%';
        void currentExerciseProgressBar.offsetWidth;
        currentExerciseProgressBar.style.transition = 'width 0.2s linear';

        exerciseTimerInterval = setInterval(() => {
            if (!isPaused && currentTrainingSession) {
                currentTrainingSession.timeLeftInPhase--;
                exerciseTimeDisplay.textContent = currentTrainingSession.timeLeftInPhase.toString().padStart(2, '0');
                const progress = ((phaseDuration - currentTrainingSession.timeLeftInPhase) / phaseDuration) * 100;
                currentExerciseProgressBar.style.width = `${progress}%`;
                if (currentTrainingSession.timeLeftInPhase <= 0) {
                    clearInterval(exerciseTimerInterval);
                    if (currentTrainingSession.config.isWarmup) {
                        currentTrainingSession.currentExerciseArrayIndex++;
                    } else {
                        if (currentTrainingSession.isWorkPhase) {
                            currentTrainingSession.isWorkPhase = false;
                        } else {
                            currentTrainingSession.isWorkPhase = true;
                            currentTrainingSession.currentExerciseArrayIndex++;
                        }
                    }
                    startNextPhase();
                }
            }
        }, 1000);
    }
    
    function endTrainingSession(completed) {
        clearInterval(sessionTimerInterval);
        clearInterval(exerciseTimerInterval);
        if (completed && currentTrainingSession) {
            userData.lastWorkoutDate = new Date().toDateString();
            let expResult;
            if (currentTrainingSession.config.isWarmup) {
                expResult = addExp(currentTrainingSession.config.expAward);
                summaryTitleDisplay.textContent = "Разминка завершена!";
            } else {
                const baseExp = Math.floor(currentTrainingSession.totalSessionTime * 0.5);
                const levelBonus = userData.level * 2;
                expResult = addExp(baseExp + levelBonus);
                summaryTitleDisplay.textContent = "Тренировка завершена!";
            }
            let message = `Отличная работа! Вы заработали ${expResult.expGained} опыта.`;
            if (expResult.leveledUp) { message += ` Вы достигли уровня ${expResult.newLevel}!`; }
            summaryMessageDisplay.textContent = message;
            summaryExpGainedDisplay.textContent = expResult.expGained;
            sessionSummaryModal.classList.add('active');
        } else {
            alert("Тренировка прервана.");
            showScreen(mainScreen);
        }
        currentTrainingSession = null;
    }

    pauseResumeBtn.addEventListener('click', () => { isPaused = !isPaused; pauseResumeBtn.innerHTML = isPaused ? playIcon : pauseIcon; });
    exitSessionBtn.addEventListener('click', () => { if (confirm("Вы уверены, что хотите выйти? Прогресс не будет сохранен.")) { endTrainingSession(false); } });
    
    // --- Логика тем ---
    themeOptionButtons.forEach(button => { button.addEventListener('click', () => { const theme = button.getAttribute('data-theme'); applyTheme(theme); localStorage.setItem('fitnessAppTheme', theme); customizationMenu.classList.remove('active'); }); });
    function applyTheme(theme) { document.body.className = ''; if (theme && theme !== 'default') { document.body.classList.add(`${theme}-theme`); } }
    function loadTheme() { const savedTheme = localStorage.getItem('fitnessAppTheme') || 'default'; applyTheme(savedTheme); }

    // --- Начальная загрузка ---
    loadUserData();
    loadTheme();
    updateProfileDisplay();
    showScreen(mainScreen);
});
