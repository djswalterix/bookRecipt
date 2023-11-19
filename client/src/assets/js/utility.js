const macrocalc = (ingredients) => {
  let macros = {
    calories: 0,
    fat: 0,
    protein: 0,
    carbohydrates: 0,
  };
  ingredients.forEach((ingredient) => {
    macros.calories +=
      ingredient.calories * ingredient.RecipeIngredient.quantity;

    macros.fat += ingredient.fat * ingredient.RecipeIngredient.quantity;
    macros.protein += ingredient.protein * ingredient.RecipeIngredient.quantity;
    macros.carbohydrates +=
      ingredient.carbohydrates * ingredient.RecipeIngredient.quantity;
  });

  return macros;
};
export { macrocalc };
