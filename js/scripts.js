document.getElementById('addContentHere').innerHTML +=
`
<div id="widget">
  <div class="sub-container">
    <h1 id='bookOnline'>Book Online</h1>
    <div class="links">
      <div>
        <a href="http://www.wheelhousetesting.net/">What do we treat?</a>
      </div>
      <div>
        <a href="http://www.wheelhousetesting.net/">How much will it cost?</a>
      </div>
    </div>
  </div>
  <hr>
  <div class='sub-container'>
    <h2 id='tomorrow'>Tomorrow</h2>
    <div class="row" id="buttonRow">

    </div>
  </div>
</div>

<style>

  body{
    font-family: sans-serif;
  }

  a{
    text-decoration: none;
    color: #2695d6;
  }

  #bookOnline{
    font-size: 25px;
    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 7px;
  }

  #tomorrow{
    font-size: 20px;
    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 7px;
  }

  hr{
    width: 398px;
    border-color:#2f66bf;
    background-color:#2f66bf;
    height: 3px;
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .button{
    height: 40px;
    width: 80px;
    background-color:#2f66bf;
    color: white;
    border-radius: 5px;
    border: none;
    text-decoration: none;
    text-shadow: none;
  }

  #widget{
    border: 2px solid #d2d4d8;
    height: 314px;
    width: 400px;
    margin: 15px;
  }

  .sub-container{
    padding: 10px;
  }

  .links{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    font-weight: bold;
    justify-items: left;
    font-family: times-new-roman;
  }

  #buttonRow{
    margin-left: 5px;
    margin-right: 5px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 5px;
    grid-row-gap: 10px;
  }

  #buttonRow:before{
    content: none;
  }

  #more{
    height: 40px;
    width: 80px;
    background-color: white;
    border-radius: 5px;
    border: 2px solid gray;
    text-decoration: none;
    text-shadow: none;
  }


</style>
`

let promise = new Promise(function(resolve, reject){
  let request = new XMLHttpRequest();
  let url = 'https://cors-anywhere.herokuapp.com/https://s3.amazonaws.com/wheelhouse-cdn/wheelhouse-www/assets/timeslotdata.json';
  request.onload = function(){
    if (this.status === 200){
      resolve(request.response);
    } else {
      reject(Error(request.statusText));
    }
  }
  request.open('GET', url, true);
  request.send();
});

promise.then(function(response){
  let body = JSON.parse(response);
  let buttonRow = document.getElementById('buttonRow');
  for (let i = 0; i < 11; i++){
    let hour = new Date(body.scheduleDays[0].timeSlots[i].slotDateTime).getHours();
    let mins = new Date(body.scheduleDays[0].timeSlots[i].slotDateTime).getMinutes().toString();
    let ampm;
    if (mins === '0'){
      mins = '00';
    }
    if (hour > 12){
      hour = hour % 12;
      ampm = 'p';
    } else {
      ampm = 'a';
    }
    buttonRow.innerHTML += `<div><button class='button' onclick='window.location.href="www.wheelhousetesting.net"'>${hour}:${mins}${ampm}</button></div>`;
  }
  buttonRow.innerHTML += `<div><button id='more' onclick='window.location.href="www.wheelhousetesting.net"'>More</button></div>`
})
