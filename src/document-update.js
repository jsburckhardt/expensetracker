exports.updateStringtoFloatAmountDocument = function(document) {
    let documentUrl = `${collLink}/docs/${document.id}`;
    console.log(`Replacing document:\n${document.Amount}\n`);
    let temp = parseFloat(document.Amount);
    document.Amount = temp;

    //return new Promise((resolve, reject) => {
    client.replaceDocument(documentUrl, document, (err, result) => {
        if (err) console.log(err);
        else {
            return result;
            // console.log(typeof document.Amount);
        }
    });
    // });
};
