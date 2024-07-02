// $(document).ready(function () {
//     const video = document.getElementById('video');
//     const canvas = document.getElementById('canvas');
//     const captureButton = document.getElementById('capture');
    
//     const form = document.getElementById('capture-form');

//     const capturedImagesDivTestada = document.getElementById('captured-images-testada');
//     const capturedImagesDivHRetirado = document.getElementById('captured-images-hidrometro-retirado');
//     const capturedImagesDivHNovo = document.getElementById('captured-images-hidrometro-novo');
//     const capturedImagesDivHCavalete = document.getElementById('captured-images-cavalete');

//     let cameraStarted = false;
//     let capturesCount = 0;

//     // Inicia a câmera quando clicar no botão de ativar
//     $('#ativar').on('click', function () {

//         $("#video").removeAttr('hidden');
//         $("#capture").removeAttr('hidden');



//         setTimeout(function () {
//             if (!cameraStarted) {
//                 startCamera();
//                 cameraStarted = true;
//             }


//         }, 500);
//     });

//     function startCamera() {
//         navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
//             .then(stream => {
//                 video.srcObject = stream;
//                 video.play();
//             })
//             .catch(err => {
//                 console.error("Erro ao acessar a câmera: ", err);
//             });
//     }

//     // Captura a foto e exibe abaixo do formulário
//     captureButton.addEventListener('click', () => {
//         const context = canvas.getContext('2d');
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         context.drawImage(video, 0, 0, canvas.width, canvas.height);

//         const dataURL = canvas.toDataURL('image/png');
//         const image = new Image();
//         image.src = dataURL;
//         image.className = 'preview-image';
//         // capturedImagesDiv.appendChild(image);

//         switch (capturesCount) {
//             case 0:
//                 capturedImagesDivTestada.appendChild(image)
//                 break;

//             case 1:
//                 capturedImagesDivHRetirado.appendChild(image)
//                 break
            
//             case 2:
//                 capturedImagesDivHNovo.appendChild(image)
//                 break
            
//             case 3:
//                 capturedImagesDivHCavalete.appendChild(image)
//                 break
        
//             default:
//                 break;
//         }

//         capturesCount++;

//         if (capturesCount === 4) {
//             stopCamera();
//         }
//     });

//     // Desliga a câmera
//     function stopCamera() {
//         const stream = video.srcObject;
//         const tracks = stream.getTracks();

//         tracks.forEach(function (track) {
//             track.stop();
//         });

//         video.srcObject = null;
//         cameraStarted = false;
//         $('#ativar').prop('disabled', true); // Desabilita o botão de ativar
//         $('#capture').attr('hidden', true);
//         $('#video').attr('hidden', true);
//     }


//     $('#capture-form').submit(function (event) {
//         event.preventDefault(); // Impede o envio padrão do formulário
//     });
// });

// $(document).on('click', '#sendsend', function () {
//     alert('Registro Salvo Com Sucesso')
//     location.reload()
// })

$(document).ready(function () {
    const form = document.getElementById('capture-form');
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    
    let cameraStarted = false;
    let activeSection = null; // Guarda a seção ativa para captura de imagem
    const sections = ['testada', 'hidrometro-retirado', 'hidrometro-novo', 'cavalete'];
    let capturesCount = 0;

    // Inicia a câmera quando clicar no botão de ativar
    $('.btn-ativar').on('click', function () {
        const sectionId = $(this).data('section');
        const videoElement = $(`#video-${sectionId}`)[0];
        const captureButton = $(`#capture-${sectionId}`)[0];

        $(`#video-${sectionId}`).removeAttr('hidden');
        $(`#capture-${sectionId}`).removeAttr('hidden');

        setTimeout(function () {
            if (!cameraStarted) {
                startCamera(sectionId, videoElement, captureButton);
                cameraStarted = true;
            }
        }, 500);
    });

    function startCamera(sectionId, videoElement, captureButton) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(stream => {
                videoElement.srcObject = stream;
                videoElement.play();
                activeSection = sectionId;
            })
            .catch(err => {
                console.error("Erro ao acessar a câmera: ", err);
            });
    }

    // Captura a foto e exibe abaixo do formulário
    $('.btn-capture').on('click', function () {
        if (activeSection === null) return;

        const sectionId = activeSection;
        const canvasElement = $(`#canvas-${sectionId}`)[0];
        const capturedImagesDiv = $(`#captured-images-${sectionId}`)[0];

        const context = canvasElement.getContext('2d');
        canvasElement.width = video.videoWidth;
        canvasElement.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

        const dataURL = canvasElement.toDataURL('image/png');
        const image = new Image();
        image.src = dataURL;
        image.className = 'preview-image';

        capturedImagesDiv.appendChild(image);
        capturesCount++;

        if (capturesCount === sections.length) {
            stopCamera();
        }
    });

    // Desliga a câmera
    function stopCamera() {
        const sectionId = activeSection;
        const videoElement = $(`#video-${sectionId}`)[0];
        const stream = videoElement.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(function (track) {
            track.stop();
        });

        videoElement.srcObject = null;
        cameraStarted = false;
        $(`.btn-ativar[data-section="${sectionId}"]`).prop('disabled', true); // Desabilita o botão de ativar
        $(`#capture-${sectionId}`).attr('hidden', true);
        $(`#video-${sectionId}`).attr('hidden', true);

        activeSection = null;
    }

    // Impede o envio padrão do formulário
    $('#capture-form').submit(function (event) {
        event.preventDefault();
    });

    // Ação ao clicar no botão Salvar
    $(document).on('click', '#sendsend', function () {
        alert('Registro Salvo Com Sucesso');
        location.reload();
    });
});
