'use client'

import React, {useEffect, useState} from 'react'
import { catchAsync } from './utils'
import axios from 'axios'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [articles, setArticles] = useState<any>(null)
  const [inputData, setInputData] = useState('')


  const handleSubmit = async() => {
    const fetchData = async () => {
      console.log(inputData)
      const {data} = await axios.get(`http://127.0.0.1:8000/test?q=${inputData}`)
      console.log(data)
      setArticles(data)
    }
    //fetchData()
    catchAsync(fetchData())
  }
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      <Input value={inputData} onChange={(e) => setInputData(e.target.value)} />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  )
}
