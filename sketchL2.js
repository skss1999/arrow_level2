let table;
let tableLength;

let ans;
let lastr = 999;

var img;
let timer;
let timerValue;
let timerHeader = document.getElementById('timerHeader');

let taskNum;
let endFlag table.getArray();
    });
}

function changeMark() {
    correctMarker.innerText = cM;
    wrongMarker.innerText = wM;
}

function newGame() {
    taskNum = 9; //9 to 0, total 10
    cM = 0;
    wM = 0;
    changeMark();
    lastReceivedKey = '0';
    newPic();
    window.clearInterval(timer);
    noticeWin.style.visibility = 'hidden';
    timer = setInterval(time1s, 1000);
    completed = false;
}

function toggleButton() {
    blinkFlag = document.getElementById('toggleID').checked;
}

function newPic() {
    let r = floor(random(tableLength));
    while (r == lastr) {
        r = floor(random(tableLength));
    }
    lastr = r;
    img = loadImage("./arrowImage/" + table[r][0], function() {
        // img.resize(windowWidth, windowWidth);
        ans = table[r][1];
    });
    timerValue = 6; //0 to 4, total 5s
    timerHeader.innerHTML = timerValue;
}

function detectReceivedKey() {
    let x = ''
    if (!tp) {
        x = split(lastReceivedKey, 'Arrow');
        if (x.length != 2) {
            wM++; = false;

let lastReceivedKey = '0';

let cM;
let wM;
let correctMarker = document.getElementById('correctMarker');
let wrongMarker = document.getElementById('wrongMarker');

let noticeWin = document.getElementById('noticeWin');
let finalCorrect = document.getElementById('finalCorrect');
let finalWrong = document.getElementById('finalWrong');

let blinkFlag;
let completed;

let tp = false;

function preload() {
    table = loadTable('configL2.csv', 'csv', 'header', function() {
        tableLength = table.getRows().length;
        table =
            return;
        }
        x = x[1].toLowerCase();
    } else {
        console.log(labelContainerResult);
        if (str(labelContainerResult) != '4' && str(labelContainerResult) != '5') {
            if (str(labelContainerResult) == '0') {
                x = 'right';
            } else if (str(labelContainerResult) == '1') {
                x = 'left';
            } else if (str(labelContainerResult) == '2') {
                x = 'up';
            } else if (str(labelContainerResult) == '3') {
                x = 'down';
            }
        }
    }
    if (x == ans) {
        cM++;
    } else {
        wM++;
    }
}

function time1s() {
    if (timerValue > 0) {
        timerValue--;
    } else {
        if (taskNum > 0) {
            newPic();
        }
        detectReceivedKey();
        changeMark();
        if (taskNum == 0) {
            endFlag = true;
            window.clearInterval(timer);
            finalCorrect.innerHTML = "<strong class=\"text-success\">Correct: </strong>" + str(cM);
            finalWrong.innerHTML = "<strong class=\"text-danger\">Wrong: </strong>" + str(wM);
            noticeWin.style.visibility = 'visible';
            completed = true;
        }
        taskNum--;
    }
    timerHeader.innerHTML = timerValue;
}

async function camOnOff() {
    tp = document.getElementById('toggleCam').checked;
    if (tp) {
        pose_init();
        document.getElementById("camArea").style.visibility = 'visible';
        document.getElementById("label-container").style.visibility = 'visible';
        document.getElementById("label-container-b").style.visibility = 'visible';
    } else {
        await webcam.stop();
        document.getElementById("camArea").style.visibility = 'hidden';
        document.getElementById("label-container").style.visibility = 'hidden';
        document.getElementById("label-container-b").style.visibility = 'hidden';
    }
}



function setup() {
    canvas = createCanvas(windowHeight, windowHeight * 0.93);
    // canvas.position(0, 0);
    newGame();
    toggleButton();
}

function draw() {
    clear();
    background(250);
    if (!tp) {
        canvas.position(0, 0);
    } else {
        canvas.position((windowWidth - width) / 2, 0);
    }
    if (ans == 'up') {
        image(img, width / 3, 0, width / 3, height / 3);
    } else if (ans == 'down') {
        image(img, width / 3, height / 3 * 2, width / 3, height / 3);
    } else if (ans == 'left') {
        image(img, 0, height / 3, width / 3, height / 3);
    } else {
        image(img, width / 3 * 2, height / 3, width / 3, height / 3);
    }
}

function keyPressed() {
    if (!tp) {
        if (key == "ArrowUp" || key == "ArrowDown" || key == "ArrowLeft" || key == "ArrowRight") {
            lastReceivedKey = key;
        }
        if (key == "f") {
            if (completed && blinkFlag) {
                newGame();
            }
        }
    }
}

// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

// the link to your model provided by Teachable Machine export panel
const URL = "./my-pose-model/";
const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";
let model, webcam, ctx, labelContainer, maxPredictions;
let labelContainerResult;

async function pose_init() {
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 300;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(pose_loop);

    // append/get elements to the DOM
    const canvas = document.getElementById("canvas");
    canvas.width = size;
    canvas.height = size;
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function pose_loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    if (tp) {
        window.requestAnimationFrame(pose_loop);
    }
}

async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const {
        pose,
        posenetOutput
    } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    let temp = 0;
    let highestProb;
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
        if (float(str(classPrediction).split(': ')[1]) > temp) {
            temp = float(str(classPrediction).split(': '));
            labelContainerResult = i;
            highestProb =str(classPrediction).split(': ')[0] ;
            if (str(labelContainerResult) == '4') {
                if (completed && blinkFlag) {
                    newGame();
                }
            }
        }
        // console.log(classPrediction);
    }

    document.getElementById('label-container-b').innerHTML = highestProb.toUpperCase();
    // if (labelContainerResult == '0') {
    //     document.getElementById('label-container-b').innerHTML = 'RIGHT';
    // } else if (labelContainerResult == '1') {
    //     document.getElementById('label-container-b').innerHTML = 'LEFT';
    // } else if (labelContainerResult == '2') {
    //     document.getElementById('label-container-b').innerHTML = 'UP';
    // } else if (labelContainerResult == '3') {
    //     document.getElementById('label-container-b').innerHTML = 'DOWN';
    // } else if (labelContainerResult == '4') {
    //     document.getElementById('label-container-b').innerHTML = 'NEXT';
    // } else {
    //     document.getElementById('label-container-b').innerHTML = 'NORMAL';
    // }

    // finally draw the poses
    drawPose(pose);
}

function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);
        // draw the keypoints and skeleton
        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}