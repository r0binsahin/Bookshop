// Funktion för att skriva ut produkter/lista

import { Products } from "../models/models";
import { selectedItems } from "../services.ts/data";
import { products as filteredList } from "../services.ts/data";

export const showProducts = (products: Products[]) => {
  let container = document.getElementById(
    "productpageWrapper"
  ) as HTMLDivElement;
  try {
    for (let i = 0; i < products.length; i++) {
      let bookContainer = document.createElement("div");
      let title = document.createElement("h3");
      let img = document.createElement("img");
      let type = document.createElement("p");
      let price = document.createElement("p");
      let button = document.createElement("button");
      button.innerHTML = "Köp";
      button.classList.add("buyButton");
      button.addEventListener("click", () => {
        handleCLick(products[i]);

        cartBadge();
      });

      img.setAttribute("data-bs-toggle", "modal");
      img.setAttribute("data-bs-target", "#exampleModal");
      img.classList.add("bookImg");

      img.addEventListener("click", () => {
        displayModal(products[i]);
      });

      bookContainer.classList.add(products[i].type);
      bookContainer.classList.add("bookContainer");
      price.classList.add("price");

      title.innerHTML = products[i].title;
      img.src = products[i].img;
      type.innerHTML = products[i].type;
      price.innerHTML = `${products[i].price}:-`;

      bookContainer.appendChild(title);
      bookContainer.appendChild(img);
      bookContainer.appendChild(type);
      bookContainer.appendChild(price);
      bookContainer.appendChild(button);
      container.appendChild(bookContainer);
    }
  } catch (e) {
    errorMsg("Något gick fel...");
  }
};

//Hantera klick/köp
export const handleCLick = (product: Products) => {
  selectedItems.push(product);
  localStorage.setItem("storageList", JSON.stringify(selectedItems));
  if (document.getElementById("checkoutpageWrapper")) {
    let container = document.getElementById(
      "checkoutpageWrapper"
    ) as HTMLDivElement;
    container.innerHTML = "";
    showCart(selectedItems);
  }
};

//Kalkylera totalsumman

const calcPrice = (selectedItems: Products[]) => {
  let sum: number = 0;

  for (let i = 0; i < selectedItems.length; i++) {
    sum += selectedItems[i].price;
  }
  return sum;
};

// funktion för att skriva ut kundvagnen

export const showCart = (selectedItems: Products[]) => {
  let container = document.getElementById(
    "checkoutpageWrapper"
  ) as HTMLDivElement;
  productSort(selectedItems);

  for (let i = 0; i < selectedItems.length; i++) {
    if (!document.getElementById(selectedItems[i].id.toString())) {
      let noOfProducts: number = counter(selectedItems, selectedItems[i].title);
      let bookContainer = document.createElement("div");
      let title = document.createElement("h3");
      let img = document.createElement("img");
      let price = document.createElement("p");
      let quantity = document.createElement("p");
      let addButton = document.createElement("button");
      let removeButton = document.createElement("button");
      let deleteButton = document.createElement("button");

      bookContainer.setAttribute("id", `${selectedItems[i].id}`);
      quantity.innerHTML = JSON.stringify(noOfProducts);
      removeButton.innerHTML = " - ";
      addButton.innerHTML = " + ";
      addButton.classList.add("addButton");
      deleteButton.innerHTML = "Ta bort";
      deleteButton.classList.add("deleteButton");

      addButton.addEventListener("click", () => {
        handleAdd(selectedItems[i].id);
        cartBadge();
      });
      removeButton.addEventListener("click", () => {
        handleRemove(selectedItems[i].id, noOfProducts);
        cartBadge();
      });
      deleteButton.addEventListener("click", () => {
        handleDelete(selectedItems[i].id);
        cartBadge();
      });
      bookContainer.classList.add(selectedItems[i].type);
      price.innerHTML = `${selectedItems[i].price} :- st`;
      title.innerHTML = selectedItems[i].title;
      img.src = selectedItems[i].img;

      bookContainer.appendChild(img);
      bookContainer.appendChild(title);
      bookContainer.appendChild(price);
      bookContainer.appendChild(removeButton);
      bookContainer.appendChild(addButton);
      bookContainer.appendChild(deleteButton);
      bookContainer.appendChild(quantity);
      container.appendChild(bookContainer);
    }
  }
  if (!document.querySelector(".totalSum")) {
    let sum = calcPrice(selectedItems).toString();
    let totalSum = document.createElement("p");
    totalSum.innerHTML = "Total summa: " + sum + "kr";
    totalSum.classList.add("totalSum");
    container.appendChild(totalSum);
  }
  if (document.querySelector("img")) {
    displayPayButton();
  } else {
    errorMsg("Varukorgen är tom");
  }
};

export const displayConfirmation = () => {
  const container = document.getElementById("mainContainer") as HTMLDivElement;
  container.innerHTML = "";

  const messageContainer: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  const messageTitle: HTMLHeadingElement = document.createElement(
    "h2"
  ) as HTMLHeadingElement;
  const orderNo: HTMLParagraphElement = document.createElement(
    "p"
  ) as HTMLParagraphElement;
  const confirmationMessage: HTMLParagraphElement = document.createElement(
    "p"
  ) as HTMLParagraphElement;

  const toStarPage: HTMLAnchorElement = document.createElement(
    "a"
  ) as HTMLAnchorElement;

  messageContainer.classList.add("messageContainer");
  messageTitle.classList.add("mesTitle");
  orderNo.classList.add("orderNo");
  confirmationMessage.classList.add("confirmationMessage");
  toStarPage.classList.add("toStartPage");

  messageTitle.innerHTML = "Orderbekräftelse";
  orderNo.innerHTML = Math.random().toString();
  confirmationMessage.innerHTML =
    "Tack för ditt köp! Detta är en bekfräftelse av din order från Selmas Böcker. Du kommer att få ett mejl med spårningsnummer så fort din vara har lämnat vårt lager";
  toStarPage.innerHTML = "Till startsidan";
  toStarPage.href = "/src/index.html";

  container.appendChild(messageContainer);
  messageContainer.appendChild(messageTitle);
  messageContainer.appendChild(orderNo);
  messageContainer.appendChild(confirmationMessage);
  messageContainer.appendChild(toStarPage);
};

export const displayPayButton = () => {
  let checkoutpageWrapper = document.getElementById(
    "checkoutpageWrapper"
  ) as HTMLDivElement;

  const payButton: HTMLButtonElement = document.createElement("button");
  const isEmptyMessage: HTMLParagraphElement = document.createElement("p");

  payButton.classList.add("payButton");
  payButton.setAttribute("id", "payButton");
  payButton.innerHTML = "Till betalningen";
  isEmptyMessage.classList.add("isEmptyMessage");
  const container = document.getElementById("mainContainer") as HTMLDivElement;

  if (checkoutpageWrapper.innerHTML === "") {
    errorMsg("Varukorgen är tom");
  }

  if (checkoutpageWrapper.innerHTML !== "") {
    if (!document.querySelector(".payButton")) {
      container.appendChild(payButton);

      payButton.addEventListener(
        "click",
        () => {
          displayPaymentForm();
        },
        { once: true }
      );
    }
  } else {
    payButton.style.display = "none"; //??? måste funka när man tömmer korgen
  }
};

export const cartBadge = () => {
  let LSgetList: string = localStorage.getItem("storageList") || "[]";
  let LSListJSON: Products[] = JSON.parse(LSgetList);

  const cart1 = document.getElementById("cartItems") as HTMLSpanElement;
  let badgeNumber = LSListJSON.length;
  cart1.innerHTML = badgeNumber.toString();

  const cart2 = document.getElementById("cartItemsDesktop") as HTMLSpanElement;
  cart2.innerHTML = badgeNumber.toString();
};

//Hantera bortagning av 1 produkt
export const handleRemove = (target: number, noOfProducts: number) => {
  let isDeleted: boolean = false;

  for (let i = 0; i < selectedItems.length; i++) {
    if (target === selectedItems[i].id) {
      if (!isDeleted) {
        if (noOfProducts < 2) {
          let confirm = window.confirm(
            "Vill du ta bort produkten från kundvagnen?"
          );
          if (!confirm) {
            return 0;
          }
        }
        selectedItems.splice(i, 1);
        isDeleted = true;
      }
    }
  }

  localStorage.setItem("storageList", JSON.stringify(selectedItems));
  let container = document.getElementById(
    "checkoutpageWrapper"
  ) as HTMLDivElement;
  container.innerHTML = "";
  showCart(selectedItems);
};

// Hantera delete.
export const handleDelete = (target: number) => {
  let confirm = window.confirm("Vill du ta bort produkten från kundvagnen?");
  if (!confirm) {
    return 0;
  } else {
    for (let i = selectedItems.length - 1; i >= 0; i--) {
      if (target === selectedItems[i].id) {
        selectedItems.splice(i, 1);
      }
    }

    localStorage.setItem("storageList", JSON.stringify(selectedItems));
    let container = document.getElementById(
      "checkoutpageWrapper"
    ) as HTMLDivElement;
    container.innerHTML = "";
    showCart(selectedItems);
  }
};

export const handleAdd = (target: number) => {
  for (let i = selectedItems.length - 1; i >= 0; i--) {
    if (target === selectedItems[i].id) {
      selectedItems.push(selectedItems[i]);
      localStorage.setItem("storageList", JSON.stringify(selectedItems));
      let container = document.getElementById(
        "checkoutpageWrapper"
      ) as HTMLDivElement;
      container.innerHTML = "";
      showCart(selectedItems);
      return 0;
    }
  }
};

// Räknare för antar produkter av varje sort i köplistan
export const counter = (products: Products[], target: string) => {
  let sum: number = 0;
  for (let i = 0; i < products.length; i++) {
    if (products[i].title === target) {
      sum++;
    }
  }
  return sum;
};

export const displayPaymentForm = () => {
  const formContainer: HTMLDivElement = document.createElement("div");
  const payForm: HTMLFormElement = document.createElement("form");
  const formTitle: HTMLElement = document.createElement("h2");
  const personInfoHead: HTMLLabelElement = document.createElement("label");
  const firstName: HTMLInputElement = document.createElement("input");
  const lastName: HTMLInputElement = document.createElement("input");
  const personalNo: HTMLInputElement = document.createElement("input");
  const phone: HTMLInputElement = document.createElement("input");
  const mail: HTMLInputElement = document.createElement("input");

  const addressHead: HTMLLabelElement = document.createElement("label");
  const streetName: HTMLInputElement = document.createElement("input");
  const postalCode: HTMLInputElement = document.createElement("input");
  const cityName: HTMLInputElement = document.createElement("input");
  const countryName: HTMLInputElement = document.createElement("input");

  const paymentDetails: HTMLLabelElement = document.createElement("label");
  const paymentMessage: HTMLParagraphElement = document.createElement("p");
  const cardContainer: HTMLDivElement = document.createElement("div");
  const visaRadio: HTMLInputElement = document.createElement("input");
  const visaText: HTMLLabelElement = document.createElement("label");
  const masterRadio: HTMLInputElement = document.createElement("input");
  const masterText: HTMLLabelElement = document.createElement("label");
  const klarnaRadio: HTMLInputElement = document.createElement("input");
  const klarnaText: HTMLLabelElement = document.createElement("label");
  const cardNo: HTMLInputElement = document.createElement("input");
  const cardDate: HTMLInputElement = document.createElement("input");
  const cardCVC: HTMLInputElement = document.createElement("input");
  const submitButton: HTMLInputElement = document.createElement("input");
  const mainContainer = document.getElementById(
    "mainContainer"
  ) as HTMLDivElement;

  personInfoHead.innerHTML = "Personuppgifter";
  formTitle.innerHTML = " Betalningsformulär";
  addressHead.innerHTML = "Adressuppgifter";
  paymentDetails.innerHTML = "Betalningsuppgifter";
  firstName.placeholder = "Namn";
  lastName.placeholder = "Efternamn";
  personalNo.placeholder = "Personnummer";
  phone.placeholder = "Telefon";
  mail.placeholder = "Epostadress";
  streetName.placeholder = "Gatuadress";
  postalCode.placeholder = "Postkod";
  cityName.placeholder = "Postort";
  countryName.placeholder = "Land";
  paymentMessage.innerHTML = "Var god välj betalningsätt:";
  visaRadio.type = "radio";
  visaRadio.name = "pay";
  visaText.innerHTML = "Visa";
  masterRadio.type = "radio";
  masterRadio.name = "pay";
  masterText.innerHTML = "Master Card";
  klarnaRadio.type = "radio";
  klarnaRadio.name = "pay";
  klarnaText.innerHTML = "Klarna faktura";
  cardNo.placeholder = "Kortnummer";
  cardDate.placeholder = "Utgångsdatum";
  cardCVC.placeholder = "CVC";
  submitButton.type = "submit";
  submitButton.value = "Slutför";

  formContainer.classList.add("formContainer");
  payForm.classList.add("formContainer__payForm");
  personInfoHead.classList.add("formContainer__payForm--personInfoHead");
  firstName.classList.add("formContainer__payForm--firstName");
  lastName.classList.add("formContainer__payForm--lastName");
  personalNo.classList.add("formContainer__payForm--personalNo");
  mail.classList.add("formContainer__payForm--mail");
  phone.classList.add("formContainer__payForm--phone");
  addressHead.classList.add("formContainer__payForm--addressHead");
  streetName.classList.add("formContainer__payForm--streetName");
  postalCode.classList.add("formContainer__payForm--postalCode");
  cityName.classList.add("formContainer__payForm--cityName");
  countryName.classList.add("formContainer__payForm--countryName");
  paymentDetails.classList.add("formContainer__payForm--paymentDetails");
  paymentMessage.classList.add("formContainer__payForm--paymentMessage");
  cardContainer.classList.add("formContainer__payForm--cardContainer");
  visaRadio.classList.add("visaRadio");
  visaText.classList.add("visaText");
  masterRadio.classList.add("masterRadio");
  masterText.classList.add("masterText");
  klarnaRadio.classList.add("klarnaRadio");
  klarnaText.classList.add("klarnaText");
  cardNo.classList.add("formContainer__payForm--cardNo");
  cardDate.classList.add("formContainer__payForm--cardDate");
  cardCVC.classList.add("formContainer__payForm--cardCVC");
  submitButton.classList.add("formContainer__payForm--submitButton");

  mainContainer.appendChild(formContainer);
  formContainer.appendChild(payForm);
  payForm.appendChild(formTitle);
  payForm.appendChild(personInfoHead);
  payForm.appendChild(firstName);
  payForm.appendChild(lastName);
  payForm.appendChild(personalNo);
  payForm.appendChild(phone);
  payForm.appendChild(mail);
  payForm.appendChild(addressHead);
  payForm.appendChild(streetName);
  payForm.appendChild(postalCode);
  payForm.appendChild(cityName);
  payForm.appendChild(countryName);
  payForm.appendChild(paymentDetails);
  payForm.appendChild(paymentMessage);
  payForm.appendChild(cardContainer);
  cardContainer.appendChild(visaRadio);
  cardContainer.appendChild(visaText);
  cardContainer.appendChild(masterRadio);
  cardContainer.appendChild(masterText);
  cardContainer.appendChild(klarnaRadio);
  cardContainer.appendChild(klarnaText);
  payForm.appendChild(cardNo);
  payForm.appendChild(cardDate);
  payForm.appendChild(cardCVC);
  payForm.appendChild(submitButton);

  /*firstName.setAttribute("required", "");
  lastName.setAttribute("required", "");
  personalNo.setAttribute("required", "");
  phone.setAttribute("required", "");
  mail.setAttribute("required", "");
  streetName.setAttribute("required", "");
  postalCode.setAttribute("required", "");
  cityName.setAttribute("required", "");
  countryName.setAttribute("required", "");
  visaRadio.setAttribute("required", "");
  cardNo.setAttribute("required", "");
  cardDate.setAttribute("required", "");
  cardCVC.setAttribute("required", "");

  mail.type = "email";
  phone.setAttribute("pattern", "[0-9]{3}-[0-9]{7}");
  phone.title = "07X-XXXXXXX";
  personalNo.setAttribute("pattern", "[0-9]{8}-[0-9]{4}");
  personalNo.title = "ÅÅÅÅMMDD-XXXX";
  postalCode.setAttribute("pattern", "[0-9]{5}");
  postalCode.title = "t.ex: 12345";
  cardNo.type = "number";
  cardNo.setAttribute("pattern", "([0-9]{10})");
  cardNo.title = "10 siffror";
  cardDate.setAttribute("pattern", "[1-9]{2}-[1-9]{2}-[0-9]{4})");
  cardDate.title = "DD-MM-ÅÅÅÅ";
  cardCVC.setAttribute("pattern", "[0-9]{3}");
  cardCVC.title = "3 siffror"; */

  payForm.addEventListener("submit", () => {
    localStorage.clear();
    displayConfirmation();
    cartBadge();
  });
};

export const filterProducts = () => {
  let btnOne = document.getElementById("btnOne") as HTMLInputElement;
  let btnTwo = document.getElementById("btnTwo") as HTMLInputElement;
  let btnThree = document.getElementById("btnThree") as HTMLInputElement;
  let btnFour = document.getElementById("btnFour") as HTMLInputElement;
  let btnFive = document.getElementById("btnFive") as HTMLInputElement;

  let selectedFilter: string = "";

  btnOne.addEventListener("click", () => {
    selectedFilter = "Alla";
    filterAlternatives(filteredList);
  });
  btnTwo.addEventListener("click", () => {
    selectedFilter = "Pocket";
    filterAlternatives(filteredList);
  });
  btnThree.addEventListener("click", () => {
    selectedFilter = "Häftad";
    filterAlternatives(filteredList);
  });
  btnFour.addEventListener("click", () => {
    selectedFilter = "E-bok";
    filterAlternatives(filteredList);
  });
  btnFive.addEventListener("click", () => {
    selectedFilter = "Inbunden";
    filterAlternatives(filteredList);
  });

  const filterAlternatives = (products: Products[]) => {
    let filteredList = products.filter((book) => {
      return book.type === selectedFilter;
    });

    if (selectedFilter === "Alla") {
      let container = document.getElementById(
        "productpageWrapper"
      ) as HTMLDivElement;

      container.innerHTML = "";
      showProducts(products);
    } else {
      showFilteredProducts(filteredList);
    }
  };

  const showFilteredProducts = (filteredList: Products[]) => {
    let container = document.getElementById(
      "productpageWrapper"
    ) as HTMLDivElement;

    container.innerHTML = "";

    for (let i = 0; i < filteredList.length; i++) {
      let bookContainer = document.createElement("div");
      let title = document.createElement("h3");
      let img = document.createElement("img");
      let type = document.createElement("p");
      let price = document.createElement("p");
      let button = document.createElement("button");
      button.innerHTML = "Köp";
      button.classList.add("buyButton");
      button.addEventListener("click", () => {
        handleCLick(filteredList[i]);
        cartBadge();
      });
      bookContainer.classList.add(filteredList[i].type);
      bookContainer.classList.add("bookContainer");
      price.classList.add("price");

      title.innerHTML = filteredList[i].title;
      img.src = filteredList[i].img;
      type.innerHTML = filteredList[i].type;
      price.innerHTML = JSON.stringify(filteredList[i].price);

      bookContainer.appendChild(title);
      bookContainer.appendChild(img);
      bookContainer.appendChild(type);
      bookContainer.appendChild(price);
      bookContainer.appendChild(button);
      container.appendChild(bookContainer);
    }
  };
};

// Sorteringsfunktion av köplistan. -- gör så artiklarna inte hoppar runt när man raderar.
export const productSort = (
  selectedItems: Products[],
  desc: boolean = true
) => {
  return selectedItems.sort((a: Products, b: Products) => {
    if (desc) {
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;

      return 0;
    } else {
      if (a.title > b.title) return -1;
      if (a.title < b.title) return 1;

      return 0;
    }
  });
};
export const errorMsg = (errorMessage: string) => {
  const container = document.querySelector("main") as HTMLDivElement;
  container.innerHTML = "";
  const isEmptyMessage: HTMLParagraphElement = document.createElement("p");
  isEmptyMessage.classList.add("isEmptyMsg");
  isEmptyMessage.innerHTML = errorMessage;
  container.appendChild(isEmptyMessage);
};

export const displayModal = (modalProduct: Products) => {
  const modalBody: HTMLDivElement = document.getElementById(
    "modal-body"
  ) as HTMLDivElement;
  modalBody.innerHTML = "";
  const modalTitle: HTMLHeadingElement = document.getElementById(
    "exampleModalLabel"
  ) as HTMLHeadingElement;

  const img = document.createElement("img");
  const type = document.createElement("p");
  const year = document.createElement("p");
  const desc = document.createElement("p");
  const price = document.createElement("p");

  let yearString = modalProduct.year.toString();
  let priceString = modalProduct.price.toString();

  img.src = modalProduct.img;
  modalTitle.innerHTML = modalProduct.title;
  type.innerHTML = modalProduct.type;
  year.innerHTML = yearString;
  desc.innerHTML = modalProduct.description;
  price.innerHTML = `${priceString}:-`;

  modalBody.appendChild(img);
  modalBody.appendChild(type);
  modalBody.appendChild(year);
  modalBody.appendChild(desc);
  modalBody.appendChild(price);
};
