import React from 'react';
import classes from '../../css/Order.module.css';


const order = (props) => {
        const ingredients = [];

        for (let ingredientName in props.ingredients) {
                ingredients.push({ 
                    name : ingredientName,
                    amount:props.ingredients[ingredientName]})
        }
        const ingredientOutput = ingredients.map(ig => {
        return <span  style = {{transform:'capitalize',
                                display:'inline-block',
                            margin:'0 8px',
                        border:'1px solid orange',
                    padding : '5px',
                color:'white',
            backgroundColor:'orange' }} key={ig.name}>{ig.name} ({ig.amount})</span>
        })
        return (
            <div className={classes.Order}>
                <p>Ingredients : {ingredientOutput}</p>
                <p>Price: <strong>IUSD {props.price.toFixed(2)}</strong></p>

            </div>
        )
}

export default order;