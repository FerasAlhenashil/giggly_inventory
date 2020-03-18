import React from "react"
import "./Sales.css"
import {Button} from "reactstrap";



class Sales extends React.Component{

    constructor(props){
        super(props);
         this.state = {
            productList: [],
            productQuantity: "0"
        }
         this.products = [
            {id: 'null', name: 'Select'},
            {id: 'Paws, Red', name: 'Paws, Red'},
            {id: 'Paws, Blue', name: 'Paws, Blue'},
            {id: 'Paws, Black', name: 'Paws, Black'},
            {id: 'Grill, Truck, Red', name: 'Grill, Truck, Red'},
            {id: 'Grill, Truck, Blue', name: 'Grill, Truck, Blue'},
            {id: 'Grill, Truck, Black', name: 'Grill, Truck, Black'},
            {id: 'Grill, Noteboard, Red', name: 'Grill, Noteboard, Red'},
            {id: 'Grill, Noteboard, Blue', name: 'Grill, Noteboard, Blue'},
            {id: 'Grill, Noteboard, Black', name: 'Grill, Noteboard, Black'},
            {id: 'Skin, Two-Wheel, Barktastic', name: 'Skin, Two-Wheel, Barktastic'},
            {id: 'Skin, Two-Wheel, Flowerific', name: 'Skin, Two-Wheel, Flowerific'},
            {id: 'Skin, Two-Wheel, Military', name: 'Skin, Two-Wheel, Military'},
            {id: 'Skin, Two-Wheel, Patriotic', name: 'Skin, Two-Wheel, Patriotic'},
            {id: 'Skin, Two-Wheel, WonderFall', name: 'Skin, Two-Wheel, WonderFall'},
            {id: 'Skin, Four-Wheel, Barktastic', name: 'Skin, Four-Wheel, Barktastic'},
            {id: 'Skin, Four-Wheel, Flowerific', name: 'Skin, Four-Wheel, Flowerific'},
            {id: 'Skin, Four-Wheel, Military', name: 'Skin, Four-Wheel, Military'},
            {id: 'Skin, Four-Wheel, WonderFall', name: 'Skin, Four-Wheel, WonderFall'}
        ];

        this.productsMenue = this.products.length > 0 && this.products.map((item, i) => {
            return (<option key={i} value={item.id}>{item.name}</option>)
        }, this)

    }

    addProduct(){
        this.setState({productList: [...this.state.productList, "" ]})
    }

    handleChange(e, index){
        this.state.productList[index] = e.target.value
        this.setState({productList: this.state.productList})
    }

    async handleSubmit(){
        try{
            console.log('Sales handleSubmit productList is', this.state.productList)
        let url = '/inventory/'
        let productList = this.state.productList
        let response = await fetch(url, 
            {method: 'POST',
            body: JSON.stringify({productList}),
            headers:{ 'Content-Type': 'application/json'}})
        let responseJSON = await response.json()
        this.setState(responseJSON)
        console.log('in handlesubmit the response is ',responseJSON)
        } catch (error){
            console.log(error)
        }
    };

    render(){
        return(
            <div class="salesStyle">
                    <h2 className="inventory">Products Ordered</h2>
                    <form>
                    <div className="formatInline">
                        <label style={{fontSize: "20px"}}>Product: </label>
                        <select id="ProductName" name="name" onChange={(e) => this.setState({ ProductName: e.target.ProductName })}>{this.productsMenue}</select>
                        <label style={{fontSize: "20px"}}>Quantity: </label>
                        <input className="inputStyle" style={{marginLeft:"10px"}}/>
                    </div>
                            {
                                this.state.productList.map((prod, index) => {

                                    return(
                                        <div className="formatInline">

                                            <div key={index}>
                                                <label style={{marginLeft:"10px"}}>Product: </label>
                                                <select id="ProductName" onChange={(e) => this.setState({ ProductName: e.target.ProductName })}>{this.productsMenue}</select>
                                                <label>Quantity: </label>
                                                <input className="inputStyle" name="quantity" onChange={(e)=>this.handleChange(e, index)} value={prod}/>
                                            </div>
                                        </div>

                                    )
                                })
                            }
                        <Button onClick= {(e) => this.addProduct(e)}> Add Product </Button>

                    <div style={{marginTop:"30px"}}>
                    <h2 className="inventory">Customer Details</h2>
                    </div>
                    <div style={{fontSize: "19px"}}>
                        <label>Order date:</label>
                        <input class="calender" type="date" name="date"></input>
                    </div>

                    <div style={{fontSize: "20px"}}>
                        <label>Firstname: </label>
                        <input className="inputStyle" type="text" firstName="firstName"/>
                    </div>

                    <div style={{fontSize: "20px"}}>
                        <label>Lastname: </label>
                        <input className="inputStyle"/>
                    </div>

                    <div style={{fontSize: "20px"}}>
                        <label>Email: </label>
                        <input className="inputStyle"/>
                    </div>

                    <div style={{fontSize: "20px"}}>
                        <label>Address: </label>
                        <input className="inputStyle"/>
                    </div>

                    <div style={{fontSize: "20px"}}>
                        <label>City: </label>
                        <input className="inputStyle"/>
                    </div>

                    <div style={{fontSize: "20px"}}>
                        <label>Zip: </label>
                        <input className="inputStyle"/>
                    </div>

                    <div style={{fontSize: "20px"}}>
                        <label>State: </label>
                        <input className="inputStyle"/>
                    </div>

                    <Button onClick={this.handleSubmit}>
                        Submit
                    </Button>
                    </form>

            </div>
    )
  }
}

export default Sales
