// $(document).ready(function () {
//     const sections = ['testada', 'hidrometro-retirado', 'hidrometro-novo', 'cavalete'];

//     sections.forEach(section => {
//         const video = document.getElementById(`video-${section}`);
//         const canvas = document.getElementById(`canvas-${section}`);
//         const captureButton = document.getElementById(`capture-${section}`);
//         const capturedImagesDiv = document.getElementById(`captured-images-${section}`);
//         const activateButton = $(`button[data-section="${section}"]`);

//         activateButton.on('click', function () {
//             $(video).show();
//             $(captureButton).removeAttr('hidden');
//             activateButton.prop('hidden', true);
//             startCamera(video);
//         });

//         captureButton.addEventListener('click', () => {
//             const context = canvas.getContext('2d');
//             canvas.width = video.videoWidth;
//             canvas.height = video.videoHeight;
//             context.drawImage(video, 0, 0, canvas.width, canvas.height);

//             const dataURL = canvas.toDataURL('image/png');
//             const image = new Image();
//             image.src = dataURL;
//             image.className = 'preview-image';
//             capturedImagesDiv.innerHTML = '';  // Clear previous images
//             capturedImagesDiv.appendChild(image);

//             stopCamera(video);
//             $(captureButton).prop('hidden', true);
//             $(canvas).hide();

//             $(`#nova-${section}`).prop('hidden', false);
//             // $("#nova-testada").prop('hidden', false);
//             // $("#nova-hidrometro-retirado").prop('hidden', false);
            
//         });

//     });

//     $(document).on("click", "#nova-testada", function() {
//         const quadro = $(`#captured-images-testada`)
//         quadro.empty()
//         $(`button[data-section="testada"]`).removeAttr('hidden');
//         $("#nova-testada").prop('hidden', true);
//     })

//     $(document).on("click", "#nova-hidrometro-retirado", function() {
//         const quadro = $(`#captured-images-hidrometro-retirado`)
//         quadro.empty()
//         $(`button[data-section="hidrometro-retirado"]`).removeAttr('hidden');
//         $("#nova-hidrometro-retirado").prop('hidden', true);
//     })

//     $(document).on("click", "#nova-hidrometro-novo", function() {
//         const quadro = $(`#captured-images-hidrometro-novo`)
//         quadro.empty()
//         $(`button[data-section="hidrometro-novo"]`).removeAttr('hidden');
//         $("#nova-hidrometro-novo").prop('hidden', true);
//     })

//     $(document).on("click", "#nova-cavalete", function() {
//         const quadro = $(`#captured-images-cavalete`)
//         quadro.empty()
//         $(`button[data-section="cavalete"]`).removeAttr('hidden');
//         $("#nova-cavalete").prop('hidden', true);
//     })

//     function startCamera(video) {
//         navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
//             .then(stream => {
//                 video.srcObject = stream;
//                 video.play();
//             })
//             .catch(err => {
//                 console.error("Erro ao acessar a câmera: ", err);
//             });
//     }

//     function stopCamera(video) {
//         const stream = video.srcObject;
//         const tracks = stream.getTracks();

//         tracks.forEach(function (track) {
//             track.stop();
//         });

//         video.srcObject = null;
//         $(video).hide();
//     }

// });

$(document).ready(function () {
    const sections = ['testada', 'hidrometro-retirado', 'hidrometro-novo', 'cavalete'];

    sections.forEach(section => {
        const video = document.getElementById(`video-${section}`);
        const canvas = document.getElementById(`canvas-${section}`);
        const captureButton = document.getElementById(`capture-${section}`);
        const novaButton = document.getElementById(`nova-${section}`);
        const capturedImagesDiv = document.getElementById(`captured-images-${section}`);
        const activateButton = $(`button[data-section="${section}"]`);
        const inputFile = document.getElementById(`input-${section}`);

        activateButton.on('click', function () {
            $(video).show();
            $(captureButton).removeAttr('hidden');
            activateButton.prop('hidden', true);
            startCamera(video);
        });

        captureButton.addEventListener('click', () => {
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const dataURL = canvas.toDataURL('image/png');
            const image = new Image();
            image.src = dataURL;
            image.className = 'preview-image';
            capturedImagesDiv.innerHTML = '';  // Clear previous images
            capturedImagesDiv.appendChild(image);

            // Convert dataURL to Blob and set it in the input file
            fetch(dataURL)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], `${section}.png`, { type: "image/png" });
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    inputFile.files = dataTransfer.files;
                });

            stopCamera(video);
            $(captureButton).prop('hidden', true);
            $(canvas).hide();

            $(novaButton).removeAttr('hidden');
        });

        novaButton.addEventListener('click', () => {
            capturedImagesDiv.innerHTML = '';  // Clear previous images
            inputFile.value = '';  // Clear the input file
            $(novaButton).prop('hidden', true);
            activateButton.removeAttr('hidden');
        });
    });

    function startCamera(video) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(stream => {
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error("Erro ao acessar a câmera: ", err);
            });
    }

    function stopCamera(video) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(function (track) {
            track.stop();
        });

        video.srcObject = null;
        $(video).hide();
    }

    // Enviar formulário com as imagens capturadas
    $('#capture-form').on('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch(this.action, {
            method: this.method,
            body: formData
        }).then(response => response.text())
          .then(result => {
              console.log(result);
              alert("Formulário enviado com sucesso!");
          }).catch(error => {
              console.error("Erro ao enviar o formulário: ", error);
              alert("Erro ao enviar o formulário.");
          });
    });
});
