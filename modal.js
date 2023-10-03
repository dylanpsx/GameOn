// Fonction pour basculer la navigation mobile
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements : Je déclare 3 variables pour stocker les éléments du DOM
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// Événement de lancement de la modale : J'ajoute un gestionnaire d'événement "click"
// Lorsque le bouton est cliqué la fonction "launchModal" est exécutée pour afficher la modale
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Événement pour fermer la modale : J'ajoute un gestionnaire d'événement "click"
// Lorsque le bouton est cliqué la fonction "closeModal" est appelée pour fermer la modale
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", closeModal);

// Fonction pour ouvrir la modale : J'ai défini la propriété CSS display sur "block" ce qui rend la modale visible 
function launchModal() {
  modalbg.classList.add("fixed-height-modal"); // Ajoutez la classe pour définir la hauteur
  modalbg.style.display = "block";
}

// Fonction pour fermer la modale : J'ai définis la propriété CSS display sur "none" ce qui cache la modale
function closeModal() {
  modalbg.style.display = "none";
}

// Fonction de validation du formulaire : J'appel plusieurs fonctions de validation spécifiques pour chaque champ du formulaire
// Je vérifie si toutes les fonctions de validation renvoient true, ce qui signifie que chaque champ est valide. 
// Si c'est le cas, la fonction renvoie true, indiquant que le formulaire est valide.
function validateForm() {
  const isValidFirstName = validateFirstName();
  const isValidLastName = validateLastName();
  const isValidEmail = validateEmail();
  const isValidBirthdate = validateBirthdate();
  const isValidQuantity = validateQuantity();
  const isValidLocation = validateLocation();
  const isValidTerms = validateTerms();

  return (
    isValidFirstName &&
    isValidLastName &&
    isValidEmail &&
    isValidBirthdate &&
    isValidQuantity &&
    isValidLocation &&
    isValidTerms
  );
}

// Fonction de validation du champ Date de naissance : Je commence par vérifier si le champ est vide, auquel cas elle affiche un message d'erreur 
// Sinon, elle convertit la date de naissance entrée en objet Date
// Puis calcule l'âge de l'utilisateur en années en soustrayant l'année de naissance de l'année actuelle 
// Si l'âge est inférieur à 18 ans, un message d'erreur est affiché, sinon le champ est considéré comme valide.
function validateBirthdate() {
  const birthdateInput = document.getElementById("birthdate");
  const birthdateError = document.getElementById("birthdate-error");

  if (!birthdateInput.value) {
    birthdateError.textContent = "Veuillez entrer votre date de naissance.";
    birthdateInput.parentElement.setAttribute("data-error-visible", "true");
    return false;
  } else {
    // Converti la date de naissance en objet Date
    const birthdate = new Date(birthdateInput.value);
    const currentDate = new Date();

    // Calcule l'âge de l'utilisateur en années
    const age = currentDate.getFullYear() - birthdate.getFullYear();

    // Vérifi si l'âge est inférieur à 18 ans
    if (age < 18) {
      birthdateError.textContent = "Vous devez avoir au moins 18 ans pour vous inscrire.";
      return false;
    } else {
      birthdateError.textContent = "";
      birthdateInput.parentElement.setAttribute("data-error-visible", "false");
      return true;
    }
  }
}

// Fonction de validation du champ "À combien de tournois GameOn avez-vous déjà participé ?" : 
// J'utilise une expression régulière pour vérifier si la valeur entrée est une valeur numérique (chiffres uniquement) 
// Si le champ est vide ou ne correspond pas à la regex, un message d'erreur est affiché
// Je défini un attribut personnalisé "data-error-visible" sur l'élément parent du champ de quantité pour indiquer une erreur visible ou non
// Sinon le champ est considéré comme valide.
function validateQuantity() {
  const quantityInput = document.getElementById("quantity");
  const quantityError = document.getElementById("quantity-error");

  const quantityPattern = /^[0-9]+$/; // Regex pour une valeur numérique

  if (!quantityInput.value || !quantityPattern.test(quantityInput.value)) {
    quantityError.textContent = "Veuillez entrer une valeur numérique.";
    quantityInput.parentElement.setAttribute("data-error-visible", "true");
    return false;
  } else {
    quantityError.textContent = "";
    quantityInput.parentElement.setAttribute("data-error-visible", "false");
    return true;
  }
}

// Fonction de validation du champ "A quel tournoi souhaitez-vous participer cette année ?" : 
// Je recherche tous les boutons radio avec le nom "location" et vérifie si au moins l'un d'entre eux est coché
// Si aucun n'est coché, un message d'erreur est affiché, sinon le champ est valide.
function validateLocation() {
  const locationInputs = document.querySelectorAll("input[name='location']");
  const locationError = document.getElementById("location-error");

  let isChecked = false;
  locationInputs.forEach((input) => {
    if (input.checked) {
      isChecked = true;
    }
  });

  if (!isChecked) {
    locationError.textContent = "Veuillez choisir une option.";
    return false;
  } else {
    locationError.textContent = "";
    return true;
  }
}

// Fonction de validation du champ "J'ai lu et accepté les conditions d'utilisation" : 
// Je vérifie si la case à cocher avec l'ID "checkbox1" est cochée 
// Si elle n'est pas cochée un message d'erreur est affiché sinon le champ est valide
function validateTerms() {
  const termsCheckbox = document.getElementById("checkbox1");
  const termsError = document.getElementById("terms-error");

  if (!termsCheckbox.checked) {
    termsError.textContent = "Vous devez vérifier que vous acceptez les termes et conditions.";
    return false;
  } else {
    termsError.textContent = "";
    return true;
  }
}

// Fonction de validation du champ Prénom : J'utilise une expression régulière pour m'assurer que le prénom contient uniquement
// des lettres, des espaces et des apostrophes 
// Si le champ est vide et a moins de 2 caractères ou ne correspond pas au modèle de nom, un message d'erreur est affiché 
// Sinon le champ est valide
function validateFirstName() {
  const firstNameInput = document.getElementById("first");
  const firstNameError = document.getElementById("first-error");

  const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s\-']+$/; // Regex pour les noms (peut inclure des espaces et des apostrophes)

  if (!firstNameInput.value || firstNameInput.value.length < 2 || !namePattern.test(firstNameInput.value)) {
    firstNameError.textContent = "Veuillez entrer un prénom valide.";
    firstNameInput.parentElement.setAttribute("data-error-visible", "true");
    return false;
  } else {
    firstNameError.textContent = "";
    firstNameInput.parentElement.setAttribute("data-error-visible", "false");
    return true;
  }
}

// Fonction de validation du champ Nom : J'utilise également l'expression régulière pour vérifier le format du nom 
// Si le champ est vide et a moins de 2 caractères ou ne correspond pas au modèle de nom un message d'erreur est affiché
// Sinon le champ est valide.
function validateLastName() {
  const lastNameInput = document.getElementById("last");
  const lastNameError = document.getElementById("last-error");

  const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s\-']+$/; // Regex pour les noms (peut inclure des espaces et des apostrophes)

  if (!lastNameInput.value || lastNameInput.value.length < 2 || !namePattern.test(lastNameInput.value)) {
    lastNameError.textContent = "Veuillez entrer un nom valide.";
    lastNameInput.parentElement.setAttribute("data-error-visible", "true");
    return false;
  } else {
    lastNameError.textContent = "";
    lastNameInput.parentElement.setAttribute("data-error-visible", "false");
    return true;
  }
}

// Fonction de validation du champ E-mail : J'utilise une expression régulière pour vérifier que l'adresse e-mail à un format valide 
// Si le champ est vide ou ne correspond pas au modèle d'adresse e-mail un message d'erreur est affiché 
// Sinon le champ est valide.
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("email-error");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour adresse électronique valide

  if (!emailInput.value) {
    emailError.textContent = "Veuillez entrer votre adresse e-mail.";
    emailInput.parentElement.setAttribute("data-error-visible", "true");
    return false;
  } else if (!emailPattern.test(emailInput.value)) {
    emailError.textContent = "Veuillez entrer une adresse e-mail valide.";
    return false;
  } else {
    emailError.textContent = "";
    emailInput.parentElement.setAttribute("data-error-visible", "false");
    return true;
  }
}

// Fonction pour afficher les données du formulaire dans la console : 
// Je récupère les valeurs de tous les champs du formulaire en utilisant document.getElementById 
// Ensuite je crée un objet formData avec ces valeurs 
// Enfin, j'utilise console.log pour afficher ces données dans la console
function displayFormData() {
  const formData = {
    firstName: document.getElementById("first").value,
    lastName: document.getElementById("last").value,
    email: document.getElementById("email").value,
    birthdate: document.getElementById("birthdate").value,
    quantity: document.getElementById("quantity").value,
    location: getSelectedLocation(), // Appel de la fonction pour récupérer la valeur du champ "A quel tournoi souhaitez-vous participer cette année ?"
  };

  console.log("Données du formulaire :", formData);
}

// Fonction pour afficher le message de confirmation et masquer le formulaire :
function displayConfirmationMessage() {
  const confirmationMessage = document.getElementById("confirmation-message");
  const form = document.querySelector("form[name='reserve']");

  // Masque le formulaire en définissant sa propriété "display" sur "none"
  form.style.display = "none";

  // Crée un conteneur pour le message de confirmation et ajouter une classe CSS
  const confirmationContainer = document.createElement("div");
  confirmationContainer.classList.add("confirmation-container");

  // Défini le contenu HTML du conteneur avec le message de confirmation (avec "votre inscription" à la ligne)
  confirmationContainer.innerHTML = "Merci pour<br />votre inscription.";

  // Crée un conteneur pour le bouton "Fermer" et ajouter une classe CSS
  const closeButtonContainer = document.createElement("div");
  closeButtonContainer.classList.add("close-button-container");

  // Crée le bouton "Fermer" et ajouter une classe CSS
  const closeButton = document.createElement("input");
  closeButton.value = "Fermer";
  closeButton.classList.add("button", "btn-submit");

  // Ajoute un gestionnaire d'événement "click" au bouton pour appeler la fonction "closeModal" lors du clic
  closeButton.addEventListener("click", closeModal);

  // Ajoute le bouton "Fermer" au conteneur du bouton
  closeButtonContainer.appendChild(closeButton);

  // Ajoute le conteneur du bouton "Fermer" au message de confirmation
  confirmationContainer.appendChild(closeButtonContainer);

  // Ajoute le message de confirmation (avec le bouton "Fermer") à l'élément avec l'ID "confirmation-message"
  confirmationMessage.appendChild(confirmationContainer);
}

// Événement pour la soumission du formulaire : L'événement est attaché au formulaire avec l'attribut name égal à "reserve" 
// Lorsque le formulaire est soumis, la fonction validateForm est appelée 
// Si le formulaire est valide, la soumission par défaut est empêchée (pour éviter un rechargement de page) 
// Et la fonction displayFormData est appelée pour afficher les données du formulaire dans la console
const form = document.querySelector("form[name='reserve']");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche l'envoi du formulaire par défaut

  if (validateForm()) {
    // Si le formulaire est valide, affichez le message de confirmation et masquez le formulaire
    displayConfirmationMessage();
  }
});

// Fonction pour récupérer la valeur du champ "A quel tournoi souhaitez-vous participer cette année ?" : 
// Je récupère la valeur du champ, je recherche tous les boutons radio avec le nom "location" 
// Et renvoie la valeur du bouton radio qui est sélectionné 
// Si aucun bouton radio n'est sélectionné, elle renvoie null.
function getSelectedLocation() {
  const locationInputs = document.querySelectorAll("input[name='location']");

  for (const input of locationInputs) {
    if (input.checked) {
      return input.value;
    }
  }

  return null; // Retourne null si aucun bouton radio n'est sélectionné
}

// Attacher des gestionnaires d'événements "change" aux champs d'entrée
const inputFields = document.querySelectorAll(".formData input");

inputFields.forEach((input) => {
  input.addEventListener("change", () => {
    // Lorsque la valeur d'un champ change, appelez validateForm() pour vérifier le formulaire en temps réel.
    validateForm();
  });
});
