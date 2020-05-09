import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../Hoc/AuxComp';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import { INGREDIENTS_PRICE } from './Constants';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';

import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../Store/Constants';

class BurgerBuilder extends Component {

    state = {
        purchasable : false,
        purchasing : false,
        loading:false,
        error:false
    }

    componentDidMount () {

        // axios.get('https://react-my-burger-18451.firebaseio.com/ingredients.json')
        //      .then(response => {
        //             this.setState({ingredients: response.data});
        //      })
        //      .catch(error =>this.setState({error:true}))
    }

    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
        .map(igKey => ingredients[igKey])
        .reduce((sum,el)=> sum+el,0);
        return sum > 0;


    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false})
    }

    purchaseContineHandler = () => {
        this.props.history.push('/checkout');
    }
    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error?   <p> Ingredients cant be loaded</p>:<Spinner/>
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients = { this.props.ings } />
                    <BuildControls 
                            addIngredientHandler = {this.props.onIngredientAdded} 
                            removeIngredientHandler = {this.props.onIngredientRemoved} 
                            disabledInfo = {disabledInfo}
                            price = {this.props.price}
                            purchasable = {this.updatePurchaseState(this.props.ings)}
                            ordered = {this.purchaseHandler}
                            />
                </Aux>
            )
            orderSummary = <OrderSummary ingredients = {this.props.ings  } 
                            price = {this.props.price}
                            purchaseCancelled = {this.purchaseCancelHandler}
                            purchaseContinued = {this.purchaseContineHandler}/>; 
        }
        if (this.state.loading) orderSummary = <Spinner/>
        

        return (
            <Aux>
                <Modal show ={this.state.purchasing} modalClosed = {this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
                
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings : state.ingredients,
        price : state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {

    return {
        onIngredientAdded : (ingName) => dispatch({type:ADD_INGREDIENT,ingredientName: ingName}),
        onIngredientRemoved : (ingName) => dispatch({type:REMOVE_INGREDIENT,ingredientName: ingName})
    }

}

export default  connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));