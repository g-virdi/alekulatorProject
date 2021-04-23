// Create top toast
async function displayToastMessage(message) {
        toastTop = app.toast.create({
            text: message,
            position: 'top',
            closeTimeout: 2000,
        });
        toastTop.open();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitBetweenToast(toastArray){
    for (i=0; i<toastArray.length; i++){
      displayToastMessage(toastArray[i]);
      await sleep(2500);
    }
}
