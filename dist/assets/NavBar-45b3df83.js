import{u as n,j as s,L as o,r,R as i}from"./index-2e3018e1.js";const c="/BeatTheAlgorithm/assets/left-arrow-be2dbe18.svg";const h=({showMenuClick:a})=>{const l=n();function e(){a(),setTimeout(()=>{l(0)})}return s.jsxs("div",{className:"algoMenu fadeInRight",children:[s.jsx("img",{src:c,onClick:a,className:"goBackArrow"}),s.jsx("h1",{children:"Algorithms"}),s.jsxs("div",{className:"algoList",children:[s.jsx(o,{className:"algorithms",to:"/algo/bubble_sort",onClick:e,children:"Bubble Sort"}),s.jsx(o,{className:"algorithms",to:"/algo/selection_sort",onClick:e,children:"Selection Sort"}),s.jsx(o,{className:"algorithms",to:"/algo/heap_sort",onClick:e,children:"Heap Sort"}),s.jsx(o,{className:"algorithms",to:"/algo/merge_sort",onClick:e,children:"Merge Sort"}),s.jsx(o,{className:"algorithms",to:"/algo/quick_sort",onClick:e,children:"Quick Sort"}),s.jsx(o,{className:"algorithms",to:"/algo/dfs",onClick:e,children:"Depth-First Search"}),s.jsx(o,{className:"algorithms",to:"/algo/bfs",onClick:e,children:"Breadth-First Search"})]}),s.jsxs("div",{className:"menuButtons",children:[s.jsx(o,{className:"homeButtonMenu",to:"/",onClick:a,children:"Home"}),s.jsx(o,{className:"aboutButtonMenu",to:"/about",onClick:a,children:"About"}),s.jsx(o,{className:"aboutButtonMenu",to:"/moreOnAlgorithms",onClick:a,children:"Learn More"})]})]})};function m(){const[a,l]=r.useState(!1);function e(){l(t=>!t)}return i.useEffect(()=>{a?(document.body.style.overflow="hidden",document.querySelector(".algoMenu").style.overflow="auto"):document.body.style.overflow="auto"},[a]),s.jsx(s.Fragment,{children:s.jsxs("nav",{className:"navBar",children:[s.jsxs("div",{className:"logo",children:[s.jsxs("div",{className:"hamburgerMenu",onClick:e,children:[s.jsx("div",{}),s.jsx("div",{}),s.jsx("div",{})]}),s.jsx(o,{className:"navFont",to:"/",onClick:()=>{l(!1),window.scrollTo({top:0,behavior:"instant"})},children:s.jsx("p",{children:"Beat the Algorithm"})})]}),s.jsxs("div",{className:"links",children:[s.jsx(o,{className:"navFont",to:"/",onClick:()=>{l(!1),window.scrollTo({top:0,behavior:"instant"})},children:s.jsx("p",{children:"Home"})}),s.jsx(o,{className:"navFont",to:"/moreOnAlgorithms",onClick:()=>{l(!1),window.scrollTo({top:0,behavior:"instant"})},children:s.jsx("p",{children:"More on Algorithms"})}),s.jsx(o,{className:"navFont",to:"/about",onClick:()=>{l(!1),window.scrollTo({top:0,behavior:"instant"})},children:s.jsx("p",{children:"About"})})]}),a&&s.jsx(h,{showMenuClick:e})]})})}export{m as default};
