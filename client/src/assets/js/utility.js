const macrocalc = (ingredients) => {
  let macros = {
    calories: 0,
    fat: 0,
    protein: 0,
    carbohydrates: 0,
  };
  ingredients.forEach((ingredient) => {
    macros.calories +=
      (ingredient.calories * ingredient.RecipeIngredient.quantity) / 100;

    macros.fat += (ingredient.fat * ingredient.RecipeIngredient.quantity) / 100;
    macros.protein +=
      (ingredient.protein * ingredient.RecipeIngredient.quantity) / 100;
    macros.carbohydrates +=
      (ingredient.carbohydrates * ingredient.RecipeIngredient.quantity) / 100;
  });
  for (let key in macros) {
    macros[key] = macros[key].toFixed(2);
  }

  return macros;
};
export { macrocalc };
