import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import firebaseConfig from '../scr/firebase-config.js';
// Initialize Firebase  

const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

const starCountRef = ref(db, "/History");
onValue(starCountRef, (snapshot) => {
  const data = Object.values(snapshot.val())

  const labels = data.map(function(index){
    var timestamp =  index.timestamp
    var datahora = new Date(timestamp);
    return datahora.toLocaleString("pt-BR", {timeZone: "UTC", format: "DD/MM/YYYY HH:mm:ss"});;
  })
  const temp = data.map(function(index){
    return index.T;
  })
  const humd = data.map(function(index){
    return index.H;
  })
  makeGraf("myChart", labels, temp, '#f34c75');
  makeGraf("myChart2", labels, humd, '#007bff');
  console.log(labels)
  console.log(temp)
});



function makeGraf(id_graf, labels,dados, color) {
  var ctx = document.getElementById(id_graf);
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        data: dados,
        lineTension: 0,
        fill: 'origin',
        backgroundColor: 'rgba(108, 58, 198, 0.4)',
        borderColor: color,
        borderWidth: 2,
        pointBackgroundColor: color,
      }]
    },
    options: {
      plugins: {
        title: {
            display: true,
            text: 'TEST'
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false,
      }
    }
  });
}
function createLine(date, T, H, E) {
  let rows = document.createElement("tr")
  let cells = document.createElement("td")

  cells.textContent = date
  rows.appendChild(cells)

  cells.textContent = T
  rows.appendChild(cells)

  cells.textContent = H
  rows.appendChild(cells)

  cells.textContent = E
  rows.appendChild(cells)
  
  tableBody.appendChild(Row);
}