import Header from './components/header/Header';
import './App.css'
import { UnitProvider } from './context/UnitContext';
import BodyContainer from './components/bodyContainer/BodyContainer';




function App() {
  
  return (
    <UnitProvider>
      <>
       <div className='w-full p-4 font-(--brand-font)'>
        <Header /> 
        <h1
        className='text-[52px] leading-[120%] font-bold w-full px-4 py-12 md:px-37 lg:py-16'
        >How's the sky looking today?</h1>
       </div>
       
       <BodyContainer />     
    </>
    </UnitProvider>
  )
}


export default App
