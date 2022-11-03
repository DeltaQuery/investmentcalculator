import React from 'react'
import { Asset } from '../components/Asset'
import { BarC } from '../components/BarC'
import { Contributions } from '../components/Contributions'
import { PieC } from '../components/PieC'
import { StAmount } from '../components/StAmount'
import { StDate } from '../components/StDate'
import { Table } from '../components/Table'
import { Worth } from '../components/Worth'
import { Years } from '../components/Years'
import { Footer } from '../components/Footer'

export const Home = () => {
    return (
        <div className="Home">
            <h1 style={{ textAlign:"center", marginTop: "0rem", marginBottom: "0.5rem"}}>Investment Calculator</h1>
            <div className="Data Container">
                <StAmount />
                <Contributions />
                <Asset />
                <StDate />
                <Years />
            </div>
            <Worth />
            <div className="ChartsContainer">
                <BarC />
                <PieC />
            </div>
            <Table />
            <Footer/>
        </div>
    )
}
