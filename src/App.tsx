import { Header } from './components/Header'
import { SummanyTable } from './components/SummanyTable'
import './styles/global.css'
import { Plus } from 'phosphor-react'
//import { Habit } from './components/Habit'

export function App() {

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
      <Header/>
      <SummanyTable />
      </div>
    </div>
  )
}

