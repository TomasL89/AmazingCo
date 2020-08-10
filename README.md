# AmazingCo

## Site Demo
https://amazingco20200809082059.azurewebsites.net

## Build Instructions
Clone this repository and open the solution in Visual Studio 2019, a build should restore the dependencies required for the project. 

## Run Instructions
Once the build is complete the project should be able to be run from Visual Studio using the IIS Express launch option, this may take a few minutes for the first run

# Discussion

## Problem Solving

### Angular
Learning the basics of Angular development, I approached this by doing a quick introduction course through PluralSight and then using that knowledge for constructing a basic Angular page in a smaller test project. Once I was comfortable with the approach of the basic usage I then started working on the submission.

### Angular + ASP.NET MVC Framework
One of the objectives for the task stated that the solution had to be flexible as promotions are subject to change over time, I wanted to be able to retrieve the promotions via a GET request when the page loaded. Visual Studio had a suitable starter template which integrated Angular and a MVC framework as a complete Single Page Application. Given that the task had a quick turn around time I felt that it was best to use a working start template that can be modified to suit the need to solving the task, any extra unrelated components have been removed so that the remaining solution is smaller. 

### Promotion Handling
As mentioned in the prior paragraph, MVC is used to simplify the means of retrieving the promotions. I decided to retrieve those promotions from a static list in the Controller for the project, simulating a database call for that data. I would have liked to be able to create an database object interface and inject that into the controller instead of using a static list, but I felt that was out of scope for this task and would be a suitable candidate for future work. 

### Promotion object 
The following class structure was used in the C# backend
```
public class Promotion
{
  public int ExperienceId { get; set; } 
  public string EventName { get; set; }
  public int Condition { get; set; }
  public double Modifier { get; set; }
  public string Description { get; set; }
}
```
#### ExperienceId 
Linked to the experience.id in the store.component.ts, this is used to see if a particular experience is eligible for a promotion discount.
#### EventName
A description that is used when displaying the Event on the store page
#### Condition
A set value that determines wether a discount is applied depending on the number of items in the cart. For example if a Promotion has a "Buy 4, only pay for 3" the Condition would be set to 4 and this is checked when a user adds an item to the cart.
#### Modifier
This is used to apply a discount and was designed to be as flexible as possible, this was the biggest challenge of the task. I decided to apply the following logic:
##### Case 1: Buy 5, get 20% off the 5th experience
The modifier was set to .8, the 5th item would be multiplied by .8 to apply a 20% discount
##### Case 2: Buy 2 for $1500
The modifier was set to .875, the 2nd item would be multiplied by .875. For this example it would be subTotal = $800 + (.875 * $800) = $1500
##### Case 3: Buy 4, only pay for 3
The modifier was set to -1, if the user adds the 4th item, once the add button event is fired then the discount would be subTotal = (item.quantity + modifier) * item.cost. Effectively this would be subTotal = (4 + (-1)) * $440 = $1320
##### Case 4: Buy 2, get 1 free
Similiar to Case 3, the modifier instead is a +1 and will be applied to the cart quanitiy without being charged for.

#### Discount Code Structure
```
// available promotions from database
var promotions[]
// Case 1, -1 is assigned as it applies to all items
var anyDiscountAvailable = promotions[].find(d => d.experienceId === -1)

// Case 2 to 4
var discountIndex = promotions[].findIndex(d => d.experienceId === item.id)

// Apply Case 1 discount if true
if (cart.quantity == anyDiscountAvailable.condition)
  apply 20% discount to 5th item
  
// Else check if there is an applicable discount for the cart item, the discountIndex will be -1 if doesn't exist in the array
else if (discountIndex > 0 && cart.quantity === promotions[discountIndex].condition) 

  // retrieve the discount modifier from promotions
  var itemDiscount = promotions[discountIndex].modifier
  
  // Apply Case 2 discount if true
  if (itemDiscount > 0 && itemDiscount < 1) 
    Apply the .875 X item cost and add to subTotal
    
  // Apply Case 3 discount if true
  if (itemDiscount < 0)
    Calculate the subTotal by only multiplying the 3 out of 4 items by the itemCost
    
  // Apply Case 4 discount if true
  if (itemDiscount >= 1)
    Add item to cart.quantity and calculate subTotal 
```
