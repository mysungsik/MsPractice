const uploadedImg = document.getElementById("inputImage");
const previewImg = document.getElementById("preview-image");

function change(){
    const files = uploadedImg.files;
    const pickedFile = files[0]
    
    console.log(files)
    previewImg.src = URL.createObjectURL(pickedFile)
}

uploadedImg.addEventListener("change",change)