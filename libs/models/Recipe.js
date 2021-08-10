class Recipe {
  constructor(props) {
    this.id = props.id;
    this.authorId = props.authorId;
    this.title = props.title;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || this.createdAt;
    this.servings = props.servings || 1;
    this.ingredients = props.ingredients;
    this.method = props.method;
    this.nutrition = props.nutrition;
    this.prepTime = props.prepTime;
    this.cookTime = props.cookTime;
    this.dietTypes = props.dietTypes;
    this.notes = props.notes;
    this.description = props.description;
    this.imageUrl = props.imageUrl;
  }

  static fromDynamoDocument(doc) {
    return new Recipe({
      id: doc.id.S,
      authorId: doc.authorId.S,
      title: doc.title.S,
      createdAt: doc.createdAt.S,
      updatedAt: doc.updatedAt.S,
      servings: doc.servings.N,
      ingredients: doc.ingredients,
      method: doc.method,
      nutrition: doc.nutrition,
      prepTime: doc.prepTime,
      cookTime: doc.cookTime,
      dietTypes: doc.dietTypes,
      notes: doc.notes,
      description: doc.description,
      imageUrl: doc.imageUrl,
    });
  }
}

module.exports = Recipe;

// {
//   id: '1234',
//   authorId: '2345',
//   title: 'Short Ribs',
//   createdAt: '2021-08-03T07:49:26.171Z',
//   updatedAt: '2021-08-03T07:49:26.171Z',
//   servings: 1,
//   ingredients: [
//     {
//       name: 'Banana',
//       amount: 1
//     },
//     {
//       name: 'Oats',
//       amount: 1,
//       unit: 'cup of',
//     },
//   ],
//   method: [
//     {
//       description: 'Blend banana and oats together',
//     },
//     {
//       description: 'Enjoy!',
//       imageUrl: 'https://www.google.co.nz/'
//     },
//   ],
//   nutrition: {
//     calories: 200,
//     protein: 20,
//     carbs: 15,
//     fats: 10,
//     sugars: 14
//   },
//   prepTime: 5,
//   cookTime: 0,
//   dietTypes: [ 'paleo', 'vegan', 'vegetarian' ],
//   notes: [ 'Can substitute banana for any type of fruit', 'Check out recommended blenders here https://1234.co.nz' ],
//   description: 'Simple shake in less than 5 mins!',
//   imageUrl: 'https://www.google.co.nz/',
// }