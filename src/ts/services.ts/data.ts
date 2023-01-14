import { Products } from "../models/models";

export let products: Products[] = [
  new Products(
    "https://i.postimg.cc/ZqhPhGjj/bok1.png",
    "Kejsarn av Portugallien",
    "Pocket",
    2017,
    "Dottern Klara Fina Gulleborg är livets ljus för den värmländske torparen Jan i Skrotlycka. När hon ger sig iväg till storstaden och dras till det lättsinniga livet där spränger hans vanmäktiga faderskärlek allt förstånd, och han vandrar in i vansinnets rike: han blir Kejsarn av Portugallien.",
    79,
    1
  ),
  new Products(
    "https://i.postimg.cc/d15GrLFS/bok2.png",
    "Jerusalem",
    "Pocket",
    2017,
    "Jerusalem är berättelsen om en stark väckelsevåg som delar en socken i Dalarna, en handfull familjer följer kallelsen och beger sig till det heliga landet medan andra väljer att bli kvar på sina gårdar.",
    79,
    2
  ),
  new Products(
    "https://i.postimg.cc/rmVSD5Br/BOK3.png",
    "Kristuslegender",
    "Pocket",
    2018,
    "Kristuslegender är en älskad klassiker i Selma Lagerlöfs rika författarskatt. Trots att det har gått mer än 100 år sedan den skrevs trycks den ständigt om i nya upplagor på olika håll i världen.",
    80,
    3
  ),
  new Products(
    "https://i.postimg.cc/nLY4V3Px/BOK4.png",
    "Gösta Berglings saga",
    "Inbunden",
    2018,
    "Skönhet och destruktiv passion, kaos och uppror, hjältedåd och poesi; till sist den eviga kampen mellan gott och ont, förlagt till det tidiga 1800-talets Värmland. Selma Lagerlöfs debutroman Gösta Berlings saga hör till de absoluta klassikerna och saknar motstycke i svensk litteratur.",
    180,
    4
  ),
  new Products(
    "https://i.postimg.cc/nrMBkpcV/BOK5.png",
    "Spökhanden",
    "Häftad",
    2012,
    "Selma Lagerlöfs Spökhanden utkom först 1898 i tidskriften Idun och ger en mörk gestaltning av ett äktenskap där kvinnans frigörelse utgör en omöjlighet.",
    59,
    5
  ),
  new Products(
    "https://i.postimg.cc/L57fQwnt/BOK6.png",
    "Troll och människor I",
    "E-bok",
    2013,
    "Den första av två volymer i Selma Lagerlöfs textsamling Troll och människor utkom första gången 1915. De två volymerna innehåller kortare noveller, tal, brev och en dikt.",
    56,
    6
  ),
];

export let selectedItems: Products[] = JSON.parse(
  localStorage.getItem("storageList") || "[]"
);
