$(document).ready(function() {
    var empty = false;
    for (let i =1; i<= 10; i++){
        let crn = chrome.storage.local.get('crn_id'+i,function(result) {
            console.log(result)
            crn=result['crn_id'+i]
            if (crn!=null){
                let crnFill = document.getElementById('crn_id'+i);
                crnFill.value = crn;
            }
            else {
                empty = true;
                return;
            }
        });
        if (empty)
            break;
    }});