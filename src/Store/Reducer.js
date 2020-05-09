import { ADD_INGREDIENT, REMOVE_INGREDIENT } from './Constants';
import { INGREDIENTS_PRICE } from '../Containers/BurgerBuilder/Constants';

const initialState = {
    ingredients : {
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    totalPrice : 4
}


const reducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_INGREDIENT :
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName]+1
                },
                totalPrice : state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            }
        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName]-1
                },
                totalPrice : state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
            }
        default:
            return state;
    }

};

export default reducer;