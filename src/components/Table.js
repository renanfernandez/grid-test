import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_DATA, LOAD_ERROR, LOAD_FINISH } from '../store/table';
import { FixedSizeList as List } from "react-window";
import AutoSizer from 'react-virtualized-auto-sizer';

export default function Table() {
    
    const dispatch = useDispatch()
    const dataTable = useSelector(tableReducer => tableReducer.data);
    const [isLoading, setIsLoading] = useState(true);
    const [dataTableInfo, setDataTableInfo] = useState([]);

    const loadTable = async () => {
        await dispatch({type: LOAD_DATA});

        axios({
            url: 'http://localhost:3000/data/data_full.json',
            methos: 'GET',
        })
        .then(response => {
            const data = response.data.data;
            dispatch({type: LOAD_FINISH, payload :{
                data
            }});
            setDataTableInfo(response.data);
            setIsLoading(false);
        })
        .catch(error => {
            dispatch({type: LOAD_ERROR });
        })

        return dataTableInfo;

    }

    const TableRow = ({ index, key, style }) => (
        <div className="infoTableRow" style={style} key={key}>
            <span>{dataTable[index].industry}</span>
            <span>{dataTable[index].origin}</span>
            <span>{dataTable[index].price}</span>
            <span>{dataTable[index].product}</span>
            <span>{dataTable[index].quantity}</span>
            <span>{dataTable[index].type}</span>
        </div>
    )
    
    useEffect(() => {
        loadTable();
    },[]);

    return (
       
            <div className="infoTable">
                <div className="infoTableRow infoTableHeader">
                    <span>industry</span>
                    <span>origin</span>
                    <span>price</span>
                    <span>product</span>
                    <span>quantity</span>
                    <span>type</span>
                </div>
                {!isLoading && dataTable.length > 0 ? (
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                            width={width}
                            height={height}
                            itemCount={dataTable.length}
                            itemSize={60}
                            >
                         {TableRow}
                    </List>
                        )}
                    </AutoSizer>
                    
                ): (
                    <span>Nenhum resultado encontrado.</span>
                ) }
                 
            
            </div>
                  
    )
}
