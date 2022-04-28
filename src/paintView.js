import data from './frontend_developer_practice.json'
import {Button, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import React, {useState} from "react"


const PaintPage = (props) => {

    const [projectType, setProjectType] = React.useState('');
    const [sectors, getSectors] = React.useState([]);
    const [sector, setSector] = React.useState('');
    const [prod, getProd] = React.useState([]);
    const [product, setProd] = React.useState("");
    const [color, setColor]= React.useState("");
    const [cost, setCost]= React.useState("");

    const calculateCost = () =>{
        let selectedProd= data.products.filter((prod)=>prod.name === product)[0]
        let selectedSector= data.sectors.filter((s)=>s.name === sector)[0]
        let paintCount = 30 / selectedProd.redecorationCycle;
        setCost(paintCount*selectedProd.price*selectedSector.costMultiplier)
    }

    const selectProjectType = (event) => {
        setProjectType(event.target.value);
        let sectorsFiltered = data.projectType_sector.filter((sector)=>sector.type === event.target.value)
        getSectors(sectorsFiltered)
        setSector("")
        setProd("")
    };

    const selectSector = (event) => {
        setSector(event.target.value);
        let prodFiltered = data.sector_product.filter((sector)=>sector.sector === event.target.value)
        getProd(prodFiltered);
        setProd("")
    };

    const selectProduct = (event) => {
        setProd(event.target.value);

    };

    const selectColor = (event) => {
        setColor(event.target.value);

    };
    return (
        <Grid container spacing={1}>

            <FormControl style={{width:"50%",margin:"20px"}}>
            <InputLabel id="demo-simple-select-label">Project Type</InputLabel>
            <Select
                value={projectType}
                onChange={selectProjectType}
            >
                {React.Children.toArray(data.projectTypes.map((projectType) => ( <MenuItem value={projectType.name}>{projectType.name}</MenuItem> )))}

            </Select>
        </FormControl>
        <FormControl disabled={sectors.length===0} style={{width:"50%",margin:"20px"}}>
            <InputLabel id="demo-simple-select-label">Sector</InputLabel>
            <Select
                value={sector}
                onChange={selectSector}
            >
                {React.Children.toArray(sectors.map((sector) => ( <MenuItem value={sector.sector}>{sector.sector}</MenuItem> )))}

            </Select>
        </FormControl>

            <FormControl disabled={prod.length===0} style={{width:"50%",margin:"20px"}}>
                <InputLabel id="demo-simple-select-label">Product</InputLabel>
                <Select
                    value={product}
                    onChange={selectProduct}
                >
                    {React.Children.toArray(prod.map((p) => ( <MenuItem value={p.product}>{p.product}</MenuItem> )))}

                </Select>
            </FormControl>


    <FormControl  style={{width:"50%",margin:"20px"}}>
        <InputLabel id="demo-simple-select-label">Color</InputLabel>
        <Select
            value={color}
            onChange={selectColor}
        >
            {React.Children.toArray(data.colour.map((c) => ( <MenuItem style={{background:c.hex}} value={c.name}>{c.name}</MenuItem> )))}

        </Select>
    </FormControl>


            <Button disabled={prod.length===0 || product === "" ||color===""} onClick={calculateCost}>Calculate Total Cost</Button>
            <h4>{cost}</h4>

        </Grid>
    )

}

export default PaintPage;