function addElem(parent,elemName){
   var li = document.createElement("li");
   parent.appendChild(li);
   li.innerHTML=elemName;
}

function supports_canvas() {
  return !!document.createElement('canvas').getContext;
}

function supports_video() {
  return !!document.createElement('video').canPlayType;
}


function supports_local_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch(e){
    return false;
  }
}
function features1(){
    var listOfFeatures = document.getElementById('listOfFeatures1');

    if( 'geolocation' in navigator ){
        addElem(listOfFeatures,'geolocation')
    }

    if( supports_canvas() ){
        addElem(listOfFeatures,'canvas')
    }

    if( supports_video() ){
        addElem(listOfFeatures,'video')
    }

    if( supports_local_storage()){
        addElem(listOfFeatures,'local storage')
    }
}

function features2(){
    var listOfFeatures = document.getElementById('listOfFeatures2');
    var options = ['localstorage', 'geolocation','history', 'microdata','applicationcache', 'canvas', 'audio','video'];

    for(i=0;i < options.length ; i++){
        var op = options[i];
        console.log('o='+op);
        if(Modernizr[op]){
            addElem(listOfFeatures,op);
        }else{
            addElem(listOfFeatures,op+' NO!');
        }
    }
}