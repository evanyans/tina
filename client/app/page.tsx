'use client'
import React, {useEffect, useState} from 'react'
import { catchAsync, formatDate, myMax, getButtonColor, capFirstLetter, getColor } from './utils'
import axios from 'axios'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Card,CardContent,CardDescription, CardHeader,CardTitle,} from "@/components/ui/card"
import Typewriter from 'typewriter-effect';
import { addDays, format } from "date-fns"
import { DatePickerWithRange } from '@/components/ui/datepicker'
import { Bar, BarChart, ResponsiveContainer } from "recharts"
import {Drawer,DrawerClose,DrawerContent,DrawerDescription,DrawerFooter,DrawerHeader,DrawerTitle,DrawerTrigger,} from "@/components/ui/drawer"

export default function Home() {
  const [articles, setArticles] = useState<any>(null)
  const [inputData, setInputData] = useState('')
  const [date, setDate] = useState<any>({from: addDays(new Date(), -14),to: new Date(),});
  const { toast } = useToast()

  const handleSubmit = async() => {
    const fetchData = async () => {
      console.log(inputData)
      console.log(date.from)
      console.log(date.to)
      const {data} = await axios.get(`https://tinanalyzer-9ee51ed39f77.herokuapp.com/test?q=${inputData}&from=${date.from}&to=${date.to}`)
      console.log(data)
      setArticles(data)
    }
    toast({
      title: "Analyzing Articles...",
      description: "It may take up to 20 seconds to analyze your articles on your first usage.",
    })
    catchAsync(fetchData)()
  }

  return (
    <div className="flex flex-col mt-10 items-center gap-2">
      <h1 className="content-center text-6xl font-black">TINA</h1>
      <p className="text-base font-normal	">Tactical Investment News Analyzer</p>
      <div className="flex flex-row">
        <p className="text-sm font-light mb-2">Try typing words like&nbsp;</p>
        <div className="text-sm font-light">
          <Typewriter 
            options={{
              strings: ['Apple', 'Tesla', 'NVIDIA', 'Netflix', 'GameStop'],
              autoStart: true,
              loop: true,
            }}/>    
        </div>
      </div>
      <Input className="font-light" value={inputData} onChange={(e) => setInputData(e.target.value)} placeholder="Type keywords here"/>
      <DatePickerWithRange date={date} setDate={setDate} />
      <Button className="mb-10 max-w-xs w-full" onClick={handleSubmit}>Analyze Articles</Button>
      {articles  
      && //checks if articles has been loaded yet before displaying
      articles.map(({article, sentiment} : any, index: any) => (
        <Card key={index} className="card">
          <CardHeader>
            <CardTitle>{article.source.name}</CardTitle>
            <CardDescription>{formatDate(article.publishedAt)}</CardDescription>
            <CardDescription className="text-blue-400"><a href={article.url} target="_blank">{article.title}</a></CardDescription>
          </CardHeader>
          <CardContent>
          <Drawer>
            <DrawerTrigger asChild>
              <Button className={getButtonColor(sentiment.reduce(myMax).label)}>{capFirstLetter(sentiment.reduce(myMax).label)}</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Deeper Analysis</DrawerTitle>
                  <DrawerDescription>Compare the sentiment polarities of this article.</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="mt-3 h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                          {
                            score: sentiment[0].score,
                            fill: getColor(sentiment[0].label)
                          },
                          {
                            score: sentiment[1].score,
                            fill: getColor(sentiment[1].label)
                          },
                          {
                            score: sentiment[2].score,
                            fill: getColor(sentiment[2].label)
                          },
                        ]}>
                        <Bar
                          dataKey="score"
                          style={{
                            fill: "fill",
                            opacity: 0.9,
                          }}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}