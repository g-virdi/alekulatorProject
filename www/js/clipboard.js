let clipboard = new ClipboardJS('.btn');

clipboard.on('success', function (e) {
  displayToastMessage("Copied to Clipboard");
});

clipboard.on('error', function (e) {
  displayToastMessage("Copy to Clipboard failed");
});
