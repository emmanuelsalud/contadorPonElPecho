import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import io from "socket.io-client"
import { useEffect, useState } from 'react'

export default function Home() {

  const [entregadas, setEntregadas] = useState('')
  const [conexiones, setConexiones] = useState('')
  const [conexionesSD, setConexionesSD] = useState('')
  

  useEffect(() => {

    var socket = io("https://socket-lucha.sdmkt.org/", {transports: ['websocket']}); 
    var web = io("https://burbuja.sdmkt.org/", {transports: ['websocket']})

    socket.on('citaslucha', (data) => {
      setEntregadas(data.citas)
      setConexiones(data.conexiones)
    })

    web.emit('count', {})
    web.on('count', data => {
      setConexionesSD(data)
    })

    return () => {
      socket.close()
      web.close()
    }

  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Contador de Mastos Entregadas</title>
        <meta name="description" content="Permite llevar la cuenta de las mastos entregadas y pacientes en la lp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      
        <h1 style={{paddingBottom: 0, marginBottom: 0, fontSize: 76}}>#PonElPecho</h1>
        <h1 className={styles.title} style={{color: '#f190a8', fontSize: 76}}>
          {entregadas} - {10000-entregadas}
        </h1>
        <br/>
        <br/>
    
        <h3 style={{paddingBottom: 0, marginBottom: 0}}>Conexiones LP / Otras LPs</h3>
        <h1 className={styles.title}  style={{color: '#f190a8', fontSize: 76}}>
          {conexiones} - {conexionesSD - conexiones}
        </h1>


      </main>


    </div>
  )
}
