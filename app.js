console.log("I am here!");
let viz;
var workbook, activeSheet;
const containerDiv = document.getElementById("vizContainer");

const btn = document.getElementById("btn");
const showBtn = document.getElementById("showBtn");
const exportPDF = document.getElementById("exportPDF");
const exportImage = document.getElementById("exportImage");
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";
const options = {
  hideTabs: true,
  height: 800,
  width: 1000,
  onFirstInteractive: function () {
    workbook = viz.getWorkbook();
    activeSheet = workbook.getActiveSheet();
    console.log("Hey, my dashboard is interactive!"); //callback(e: TableauEvent)
  },
  onFirstVizSizeKnown: function() {
    console.log("Hey, my dashboard has a size!");
  }
};

function initViz() {
  console.log("Inside init viz");
  viz = new tableau.Viz(containerDiv, url, options);//create new visualization object
}

document.addEventListener("DOMContentLoaded", initViz);//execute initViz


function filterSingleValue() {
  activeSheet.applyFilterAsync(
    "Region",
    "North",
    tableau.FilterUpdateType.REPLACE);
}
function selectSingleValue() {
  workbook.getActiveSheet().selectMarksAsync(
    "Region",
    "South",
    tableau.SelectionUpdateType.REPLACE);
}

// listen for clicks to hide the viz
btn.addEventListener("click", function() {
  console.log("Hello from my button!");
  viz.hide();
});
// listen for clicks to show the viz
showBtn.addEventListener("click", function() {
  viz.show();
});
// listen for clicks to export to PDF
exportPDF.addEventListener("click", function() {
  viz.showExportPDFDialog();
});

// listen for click to export an Image
exportImage.addEventListener("click", function() {
  viz.showExportImageDialog();
});

function getRangeValues() {
  // get the values from the input
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  // get the workbook object
  const workbook = viz.getWorkbook();
  // get the active sheet in the window - this is the dashboard
  const activeSheet = workbook.getActiveSheet();
  // get all the sheets in the dashboard
  const sheets = activeSheet.getWorksheets();
  const sheetToFilter = sheets[1];
  sheetToFilter
    .applyRangeFilterAsync("Sales", {
      min: minValue,
      max: maxValue
    })
    .then(console.log("Filter applied!"));
}

document.getElementById("applyFilter").addEventListener("click", function() {
  getRangeValues();
});
