import { createContext } from "react";

export const GameContext = createContext({
    difficulty:"",
    randomNumbers:"",
    countDownOver:false,
    setWinner:null,
    winner:""
})