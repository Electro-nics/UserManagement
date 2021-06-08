import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'

export const Table=()=>{
    const [data,setData]=useState([])
    const columns=[
        {title:'Id', field:'id'},
        {title:'Email', field:'email'},
        {title:'FirstName', field:'first_name'},
        {title:'LastName', field:'last_name'},
        {title:'Photo', field:'avatar'}
    ]
    useEffect(()=>{
        fetch("https://reqres.in/api/users/1").then(resp=>resp.json()).then(resp=>setData(resp))
    },[])
    return(<div>
        <MaterialTable
      title="UserData"
      columns={[
        { title: 'Id', field: 'id' },
        {title:'Email', field:'email'},
        { title: 'First Name', field: 'first_name' },
        { title: 'Last Name', field: 'last_name' },
        {
            title: 'Avatar',
            field: 'avatar',
            render: rowData => (
              <img
                style={{ height: 36, borderRadius: '50%' }}
                src={rowData.avatar}
              />
            ),
          }
        
      ]}
      data={query =>
        new Promise((resolve, reject) => {
          let url = 'https://reqres.in/api/users?'
          url += 'per_page=' + query.pageSize
          url += '&page=' + (query.page + 1)
          fetch(url)
            .then(response => response.json())
            .then(result => {
              resolve({
                data: result.data,
                page: result.page - 1,
                totalCount: result.total,
              })
            })
        })
      }
      options={{search:false}}
      editable={{
          onRowDelete:selectedRow=>new Promise((resolve,reject)=>(console.log(selectedRow)))
      }}
    />

    </div>)
}