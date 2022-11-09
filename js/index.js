const algoMenuButton = document.querySelector(".algo-menu-button");
algoMenuButton.onclick = function(){
    let sidebar = document.querySelector(".side-bar");
    let changeDocument = document.body;
    if (sidebar.style.display === "none"){
        sidebar.style.display = "flex";
        changeDocument.style.left = "180px";
        changeDocument.style.up = "52px";
    }else{
        sidebar.style.display = "none";
        changeDocument.style.left = "0";
        changeDocument.style.up = "0";
    }
};

const closeSideBar = document.querySelector(".close-side-bar");
closeSideBar.onclick = function(){
    let sidebar = document.querySelector(".side-bar");
    sidebar.style.display = "none";
    let changeDocument = document.body;
    changeDocument.style.left = "0";
    changeDocument.style.up = "0";
}

const bubbleSort = document.querySelector(".bubble-sort");
bubbleSort.onclick = () => {
    $(".left-content").load("bubbleSort.html");
    $(".right-content").load("bubbleSortUser.html");
}