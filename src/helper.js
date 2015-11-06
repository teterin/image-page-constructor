export function uploadImage(inputEvent) {
    const blob = inputEvent.target.files[0];
    return validImg(blob).then(()=>new Promise((resolve, reject)=> {
        let reader = new FileReader();
        reader.onload = event=>   resolve(event.target.result);
        reader.onerror = error=> reject(error);
        reader.readAsDataURL(blob);
    }));
}

function validImg(blob) {
    return new Promise((resolve, reject)=> {
        if (!blob) {
            reject('Image is not found');
        }
        let reader = new FileReader();
        reader.onload = event=> {
            let fileType = new Uint8Array(event.target.result)
                .subarray(0, 3).reduce((prev, curr)=>prev + curr.toString(16), '');
            if (~['ffd8ff', '89504e'].indexOf(fileType)) {
                resolve()
            } else {
                reject('Unsupported file type. You can upload only jpeg and png');
            }
        };
        reader.onerror = error=> reject(error);
        reader.readAsArrayBuffer(blob);
    })
}