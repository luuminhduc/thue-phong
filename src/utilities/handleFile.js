export async function fileListToBase64(fileList) {
    // create function which return resolved promise
    // with data:base64 string
    function getBase64(file) {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = (ev) => {
          resolve(ev.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
    const promises = [];

    // loop through fileList with for loop
    for (let i = 0; i < fileList.length; i++) {
      promises.push(getBase64(fileList[i]));
    }

    return await Promise.all(promises);
  }

  export const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }