import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
const inter = Inter({ subsets: ['latin'] })

export const getStaticProps = async () => {

  // Read the csv file from the public folder
  // const res = await fetch('http://localhost:3000/temples.csv')
  // const data = await res.text()

  // Split the csv file into an array of rows
  // const rows = data.split('\n')


  // return {
  //   props: { temples: rows }
  // }

  const res = await fetch('http://localhost:3000/temples.csv')

  // return list of temples
  // split the csv file into an array of rows
  const data = await res.text()
  const arr = data.split('\n')
  

  return {
    props: { temples: arr }

  }
    
}


const Names = ({ temples }) => {
  return (
    <div>
      <div className={(inter.className, styles.paddingNormal)}>
        <h3>
          Temples in Kalasin, Kamphaeng Phet,KhonKaen and Jantaburi.
        </h3>
      </div>

    {/* download button */}
    <div className={styles.paddingNormal}>
      <a href="http://localhost:3000/temples.csv" download>
        <button className={styles.button}>Download CSV</button>
      </a>
    </div>

      <ul className={(styles.paddingLeft)}>

    {temples.map((temple, index) => (
      <li key={index}>{temple}</li>
    ))}

      </ul>

    </div>
  )
}

export default Names;