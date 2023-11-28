// Function to calculate the macronutrient values (calories, fat, protein, carbohydrates) of a recipe
const macrocalc = (ingredients) => {
  // Initialize an object to store the total macros
  let macros = {
    calories: 0,
    fat: 0,
    protein: 0,
    carbohydrates: 0,
  };

  // Iterate over each ingredient to calculate and accumulate its macros
  ingredients.forEach((ingredient) => {
    macros.calories +=
      (ingredient.calories * ingredient.RecipeIngredient.quantity) / 100;
    macros.fat += (ingredient.fat * ingredient.RecipeIngredient.quantity) / 100;
    macros.protein +=
      (ingredient.protein * ingredient.RecipeIngredient.quantity) / 100;
    macros.carbohydrates +=
      (ingredient.carbohydrates * ingredient.RecipeIngredient.quantity) / 100;
  });

  // Round each macro value to two decimal places
  for (let key in macros) {
    macros[key] = parseFloat(macros[key].toFixed(2));
  }

  return macros;
};

// Function to validate an email address using a regular expression
function emailCheck(email) {
  // Regular expression for validating an email address
  const emailRegex =
    /^(?=.{1,256}$)[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // Test the email against the regex and return the result
  return emailRegex.test(email);
}

export { macrocalc, emailCheck };
