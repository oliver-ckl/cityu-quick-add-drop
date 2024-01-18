function validate(input) {//validate the input with customerized rules
    let checks = [emptyCheck, duplicateCheck, formatCheck];
    return checks.every(check => check(input));//return true if all checks are passed
}
function emptyCheck(input){
    return input != '';
}
function duplicateCheck(input, listType){
    if (listType == 'drop')
        return $("#drop-area .tags .addedTag:contains('" + input + "') ").length == 0;
    else
        return $("#add-area .tags .addedTag:contains('" + input + "') ").length == 0;
}
function formatCheck(input){//customerize your format check here
    return input.match(/^[0-9]{5}$/)!=null;
}
