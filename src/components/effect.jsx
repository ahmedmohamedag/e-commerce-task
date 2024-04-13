"use client"

import Image from "next/image"
import { useState , useEffect } from "react"


export const Effect = () => {
    const [products,setProducts]=useState([])
    const [serch,setSerch]=useState('')
    const [productFilter,setProductFilter]=useState([])
    useEffect(
        ()=>{
            fetch('https://fakestoreapi.com/products')
            .then(res =>
                res.json()
            )
            .then(data=> {
                setProducts(data)
            })
        }
        ,[]
    )
// بتشوف البيانات رجعة ولا لا
    useEffect(()=>{
        products.length > 0 ?(
            console.log(products)
        ) :("") 
    },[products])
// المصفوفة الجديدة بعد البحث الفلتر
useEffect(()=>{
    setProductFilter (products)
},[products])
// 
useEffect(()=>{
    const Product = products.filter(
        item => item.title.toLowerCase().includes(serch)
    )
    setProductFilter(Product)
},[serch])


const handleChange = (e)=>{
    setSerch(e.target.value)
}
    return (
        <div className="container p-12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 ">
            <input onChange={handleChange} type="text" className="border md:col-span-2 lg:col-span-3 px-8 py-2 focus:outline-none" placeholder="Serch by Name" />
            {
                productFilter?.map((product,key)=>(
                    <div key={key} className="flex flex-col items-center justify-between shadow-md hover:shadow-lg">
                        <Image
                        className=" mb-2 h-[200px]"
                        src={product.image}
                        width={200}
                        height={100}
                        />
                        <h3 className="py-8 text-center">{product.title}</h3>
                        <div className="flex items-center justify-between py-3">
                            <span className="me-3">{product.price}</span>
                            <span>{product.rating.rate}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
