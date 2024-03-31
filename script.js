let questons = [
    {
        "question": "Was waren die drei beliebtesten deutschen Passwörter im Jahr 2020?",
        "answer_1": "Schnucki, qwertz, ichliebedich",
        "answer_2": "123456, 123456789, passwort",
        "answer_3": "Alexander, hallo123, lol123",
        "answer_4": "Geburtstag, Adresse, Land",
        "right_answer": 2
    },
    {
        "question": "Betrüger suchen in Papierkörben und Altpapiercontainern fremder Personen nach Passwörtern und Zugangscodes oder stellen gelöschte Daten aus Festplatten wieder her. Wie nennt man diese illegale Informationsbeschaffung?",
        "answer_1": "Phishing",
        "answer_2": "scetching",
        "answer_3": "Pretexting",
        "answer_4": "Dumpster Diving",
        "right_answer": 4
    },
    {
        "question": "Was versteht man unter Tracking?",
        "answer_1": "Eine von der US-Strafverfolgungsbehörde entwickelte elektronische Fußfessel.",
        "answer_2": "Das Individualisieren des eigenen Rechners auf die meistbesuchten Onlineseiten.",
        "answer_3": "Die Schritte eines Nutzers im Internet beobachten und auswerten.",
        "answer_4": "Selbstsuche im Darknet",
        "right_answer": 3
    },
    {
        "question": "Wo befinden sich Daten einer Firma, wenn sie Cloud Computing nützt?",
        "answer_1": "Alle Daten sind extern in der Cloud gespeichert.",
        "answer_2": "Die Daten sind ausschließlich auf virtualisierten Linux-Servern gespeichert.",
        "answer_3": "Daten sind extern in der Cloud und auch vor Ort auf lokalen Rechnern gespeichert.",
        "answer_4": "Alle Daten sind in Windows-Servern bei einem Partner gespeichert.",
        "right_answer": 1
    },
    {
        "question": "Was ist das Darknet?",
        "answer_1": "Eine kommerzielle Suchmaschine, deren Dienstleistungen über PayPal vergütet werden.",
        "answer_2": "Ein verschlüsselter Bereich des Internets, der das anonyme und unzensierte Kommunizieren ermöglicht.",
        "answer_3": "Der Bereich des Internets, der von Drogenhändlern und Waffenschiebern als Handelsplattform geschaffen wurde.",
        "answer_4": "Eine Plattform, auf der sich Leute über alles mögliche austauschen.",
        "right_answer": 2
    },
];

let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('./audio/pass.mp3');
let AUDIO_FAIL = new Audio('./audio/fail.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questons.length;
    showQuestion()
}

function showQuestion() {
    if (gameIsOver()) {
        // Show End Screen
        showEndScreen();
    } else { // Show question
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questons.length
}

function showEndScreen() {
    document.getElementById('endScreen').style = ''; //Display none wird entfernt
    document.getElementById('questionBody').style = 'display: none';

    document.getElementById('amount-of-questions').innerHTML = questons.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-img').src = './img/win-7254378_640.png'
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questons.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%`;
}

function updateToNextQuestion() {
    let question = questons[currentQuestion];

    document.getElementById('question-Number').innerHTML = currentQuestion + 1; // Fängt von 1 an und nicht von 0
    document.getElementById('questionText').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selection) {
    let question = questons[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selectedQuestionNumber)) {
        document.getElementById(selection).parentNode.classList.add('bg-success'); //Mit parentNote spricht man das übergeordnete Element an.
        rightQuestions++; //richtige Antwort wird hinzugefügt
        AUDIO_SUCCESS.play();
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger'); //Mit parentNote spricht man das übergeordnete Element an.
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-Button').disabled = false; //Button wird wieder aktiviert
}

function rightAnswerSelected(selectedQuestionNumber) {
    return selectedQuestionNumber == questons['right_answer']
}

function nextQuestion() {
    currentQuestion++; //Variable (Fragen) wird erhöht bzw nächste Frage wird geladen.
    document.getElementById('next-Button').disabled = true; //Button wird wieder deaktiviert
    resetAnswerButtons()
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('header-img').src = './img/quiz-5858940_640.jpg';
    document.getElementById('questionBody').style = ''; // Question wieder anzeigen
    document.getElementById('endScreen').style = 'display: none'; // Endscreen ausblenden
    rightQuestions = 0;
    currentQuestion = 0;
    init()
}
