function initSpectrometer() {
  const toggleButton = document.getElementById("toggleButton");
  const canvas = document.getElementById("spectrumCanvas");
  const ctx = canvas.getContext("2d");
  const noteDisplay = document.getElementById("noteDisplay");

  let audioContext;
  let analyser;
  let microphone;
  let dataArray;
  let animationId;

  const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  function freqToNote(freq) {
    const A4 = 440;
    const semitones = 12 * Math.log2(freq / A4);
    const midi = Math.round(semitones) + 69;
    const note = NOTES[midi % 12];
    const octave = Math.floor(midi / 12) - 1;
    return `${note}${octave}`;
  }

  function startAnalyzer() {
    console.log("Inicializando AudioContext...");
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        console.log("Stream obtenido:", stream);
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);

        dataArray = new Uint8Array(analyser.frequencyBinCount);

        function draw() {
          analyser.getByteFrequencyData(dataArray);

          ctx.fillStyle = "black";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          const barWidth = (canvas.width / dataArray.length) * 2.5;
          let maxAmp = 0;
          let maxIndex = 0;

          for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i] > maxAmp) {
              maxAmp = dataArray[i];
              maxIndex = i;
            }
          }

          const freqBin = maxIndex * audioContext.sampleRate / analyser.fftSize;

          for (let i = 0; i < dataArray.length; i++) {
            const barHeight = dataArray[i];
            const x = i * barWidth;
            ctx.fillStyle = "lime";
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          }

          if (maxAmp > 100 && freqBin > 50) {
            noteDisplay.textContent = `Nota: ${freqToNote(freqBin)} (${freqBin.toFixed(1)} Hz)`;
          } else {
            noteDisplay.textContent = "Nota: --";
          }

          animationId = requestAnimationFrame(draw);
        }

        draw();
      })
      .catch(err => {
        console.error("Error accediendo al micrófono:", err);
        alert("No se pudo acceder al micrófono.");
      });
  }

  function stopAnalyzer() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    if (audioContext) {
      audioContext.close();
      audioContext = null;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    noteDisplay.textContent = "Nota: --";
  }

  let running = false;
  toggleButton.addEventListener("click", () => {
    if (!running) {
      startAnalyzer();
      toggleButton.textContent = "⏹️ Detener Análisis";
    } else {
      stopAnalyzer();
      toggleButton.textContent = "🎤 Empezar Análisis";
    }
    running = !running;
  });
}
