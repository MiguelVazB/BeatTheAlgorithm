const algoMenuButton = document.querySelector(".algo-menu-button");

algoMenuButton.onclick = function(){
    let sidebar = document.querySelector(".side-bar");
    sidebar.style.display = "flex";
    let changeDocument = document.body;
    changeDocument.style.left = "180px";
};

const closeSideBar = document.querySelector(".close-side-bar");
closeSideBar.onclick = function(){
    let sidebar = document.querySelector(".side-bar");
    sidebar.style.display = "none";
    let changeDocument = document.body;
    changeDocument.style.left = "0";
}