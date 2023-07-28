var sName = document.getElementById('sitename');
var sUrl = document.getElementById('siteurl');
var alrt = document.getElementById('alrt');
var btnClose = document.getElementById('close');
var siteDetails = [];


if(localStorage.getItem('sitedata') === null){
    siteDetails=[]
}else{
    siteDetails=JSON.parse(localStorage.getItem('sitedata'));
    display()
}

btnClose.addEventListener('click',function(){
    alrt.classList.replace('d-flex','d-none');

})

function senData(){
    if(snameValidation() === true && surlValidation() === true){
        test();
        var data = {
            siteName:sName.value,
            siteUrl:sUrl.value
        }
        siteDetails.push(data);
        localStorage.setItem('sitedata',JSON.stringify(siteDetails));
        display();
        reset();
    }else{
        alrt.classList.replace('d-none','d-flex');
    }
}

function test(){
    var Protocol = /^(https?:\/\/)/;
    if (!Protocol.test(sUrl.value))
    sUrl.value = "https://" + sUrl.value;
}

function reset(){
    sName.value='';
    sUrl.value='';
}

function display(){
    var dos= ``;
    for(i=0;i<siteDetails.length;i++){
        dos+=`
        <tr>
        <td>${i+1}</td>
        <td>${siteDetails[i].siteName}</td>
        <td>
        <button class="btn btn-success" onclick="show()">
        <a href="${siteDetails[i].siteUrl}" class="text-white text-decoration-none" target="_blank">
        <i class="fa-solid fa-eye"></i> 
        Visit
        </a>
        </button>
        </td>
        <td><button class="btn btn-danger" onclick="delte(${i})"><i class="fa-solid fa-trash"></i> Delete</button></td>
        </tr>
        `
    }
    document.getElementById('adding').innerHTML= dos;
}
function show(){
    console.log();
}

function delte(index){
    siteDetails.splice(index, 1);
    localStorage.setItem('sitedata',JSON.stringify(siteDetails));
    display()
}

function snameValidation(){
    var nameRegx = /^[A-Z][a-z]{3,9}$/;
    var namefUser = sName.value;
    if(nameRegx.test(namefUser)){
        return true;
    }else{
        return false
    }
}

function surlValidation(){
    var nameRegx = new RegExp('^(https?:\\/\\/)?'+ 
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
    '(\\#[-a-z\\d_]*)?$','i'); 
    var linkfUser = sUrl.value;
    if(nameRegx.test(linkfUser)){
        return true;
    }else{
        return false
    }
}