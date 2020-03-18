import React from "react"
//import "./Production.css";
import "./InventoryTable.css"
import {Button, Form, Table} from "reactstrap"

class Production extends React.Component{
    constructor(props){
      super(props);
      
      this.state = {
          products:[
            {
            Location: '',
            DepartmentName: '',
            ProductName: '',
            InDepartment: '',
            Lost: ''
            } 
          ]
      } 
    }
    
    async componentDidMount() {
      try {
        let response = await fetch(`/inventory/fetch-in-production`)
        let {products} = await response.json();
        this.setState({products});
      } catch (error) {
        console.log(error);
      }
    }
  
    render(){
      console.log('in render ', this.state.products)
        const products = this.state.products.map((item, index) =>{
            return(
              <tr key={index}>
                <td > {item.Location}</td>
                <td > {item.DepartmentName}</td>
                <td > {item.ProductName}</td>
                <td > {item.InDepartment}</td>
                <td > {item.Lost}</td>
              </tr>
              )})
  
  
      return(
        <div className="InventoryStyle">
        <Table >
        <thead>
          <tr>
            <th>Location</th>
            <th>Department Name</th>
            <th>Product Name</th>
            <th>In Department</th>
            <th>Lost</th>
          </tr>
          </thead>
          <tbody>
          {products}
          </tbody>
        </Table>
        <br />
  
        </div>
      ) 
    }
  }

/*const products = [
    {id: '0', name: 'Select'},
    {id: '1', name: 'Truck'},
    {id: '2', name: 'Noteboard'},
    {id: '3', name: 'Puppy Feet'},
    {id: '4', name: '2-wheel Camo'},
    {id: '5', name: '2-wheel Flag'},
    {id: '6', name: '2-wheel Flower'},
    {id: '7', name: '2-wheel Bark'},
    {id: '8', name: '2-wheel Wonder'},
    {id: '9', name: '4-wheel Camo'},
    {id: '10', name: '4-wheel Flag'},
    {id: '11', name: '4-wheel Flower'},
    {id: '12', name: '4-wheel Bark'},
    {id: '13', name: '4-wheel Wonder'}
  ];

let productsList = products.length > 0 && products.map((item, i) => {
return (<option key={i} value={item.name}>{item.name}</option>)
}, this)

const productions = [
    {id: '0', name: 'Select'},
    {id: '1', name: 'Belovac'},
    {id: '2', name: 'Guillotine'},
    {id: '3', name: 'Rotozip'},
    {id: '4', name: 'Sanding'},
    {id: '5', name: 'Velcro'},
    {id: '6', name: 'Stickers'},
    {id: '7', name: 'Trim'},
    {id: '8', name: 'Screw'},
    {id: '9', name: 'Wrap'},
    {id: '10', name: 'Blisterpack'},
    {id: '11', name: 'Grill package'},
    {id: '12', name: 'Walker Package'},
  ];

let productionList = productions.length > 0 && productions.map((item, i) => {
return (<option key={i} value={item.name}>{item.name}</option>)
}, this)

const colors = [
    {id: '0', name: 'Select'},
    {id: '1', name: 'Red'},
    {id: '2', name: 'Blue'},
    {id: '3', name: 'Black'}
  ];

let colorsList = colors.length > 0 && colors.map((item, i) => {
return (<option key={i} value={item.name}>{item.name}</option>)
}, this)


class Production extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {ProductName: '',
            ProductDepartment:'' ,
            ProductColor: '',
            productions: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        console.log(event)
        this.setState({ ProductName: event.target.ProductName,
                        ProductDepartment: event.target.ProductDepartment,
                        ProductColor: event.target.ProductColor})
        console.log(this.state)
    }

    async handleSubmit(){
        try{
            //console.log('in handle submit ', this.state.ProductDepartment)
            let url = '/inventory/fetch-production-step'
            let ProductName = this.state.ProductName
            let ProductDepartment = this.state.ProductDepartment
            let ProductColor = this.state.ProductColor    
            let response = await fetch(url, 
                {method: 'POST',
                body: JSON.stringify({ProductName: ProductName,
                ProductDepartment:ProductDepartment ,
                ProductColor: ProductColor
                }),
                headers:{ 'Content-Type': 'application/json'}})
            let respnseJSON = await response.json()
            this.setState(respnseJSON)
            console.log('in handlesubmit the response is ',respnseJSON)
        } catch (error){
            console.log(error)
        }
    }
    

    render(){
        let productions = this.state.productions.map((item, index) =>{
            return(
              <tr key={index}>
              <td >{item.MaterialName}</td>
              <td >{item.InStock}</td>
              <td >{item.Lost}</td>
              </tr>
              )})
        return(
        <div className="productionStyle">
           <h2 className="inventory">Productions</h2>
            <Form>
                <div className="formatInlinePro">
                    <label>Products: </label>
                    <select className="fontSize" id="ProductName"  name="ProductName" onChange={(e) => this.setState({ ProductName: e.target.value })}>{productsList}</select>
                </div>
                <div className="formatInlinePro">
                    <label>Steps: </label>
                    <select className="fontSize" id="ProductDepartment"  name="ProductDepartment" onChange={(e) => this.setState({ ProductDepartment: e.target.value })}>{productionList}</select>
                </div>
                <div className="formatInlinePro">
                    <label>Color: </label>
                    <select className="fontSize" id="ProductColor"  name="ProductColor" onChange={(e) => this.setState({ ProductColor: e.target.value })}>{colorsList}</select>
                </div>
                <Button onClick = {this.handleSubmit}>Retrieve</Button>
            </Form>
            <div>
            <br/>
            <h2 className="inventory">Productions List</h2>
            </div>
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>MaterialName</th>
                <th>In stock</th>
                <th>Lost</th>
              </tr>
              </thead>
              <tbody>
              {productions}
              </tbody>
            </Table>
            
            </div>
        )
    }
}*/

export default Production