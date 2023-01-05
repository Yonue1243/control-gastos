import { useState, useEffect } from 'preact/hooks'
import {Header} from './components/Header'
import { Modal } from './components/Modal';
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { generarID } from './helpers';
import { Listadogastos } from './components/Listadogastos';
import { Filtros } from './components/Filtros';
export function App() {


  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [presupuesto, setPresupuesto] =useState(
    JSON.parse(Number(localStorage.getItem('presupuesto')) ?? 0)
  )
  const [modal,setModal] = useState(false)
  const [animarModal,setanimarModal] = useState(false)
  const [gastos,setGastos] = useState(

    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [gastoEditar,setGastoEditar] = useState({})

  const [filtro,setFiltro] = useState('')
  const [gastosfiltro,setGastosFiltro] = useState([])

  useEffect(() => {
    if(Object.keys(gastoEditar).length>0){
      setModal(true);
    
      setTimeout(() => {
              setanimarModal(true)
      }, 300);
    }
  },[gastoEditar])

  useEffect(() =>{
    localStorage.setItem('presupuesto',JSON.stringify(presupuesto) ?? 0)
    console.log(presupuesto)
  },[presupuesto])

useEffect(() =>{
  localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
},[gastos])

  useEffect(() =>{
    const presupuestoLocal = JSON.parse(Number(localStorage.getItem('presupuesto')) ?? 0)
    if (presupuestoLocal>0){
      setIsValidPresupuesto(true)
    }
  },[])

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltro(gastosFiltrados)
    }
  },[filtro])

  const handleNuevoGasto = () =>{
    setModal(true);
    setGastoEditar({})
    setTimeout(() => {
            setanimarModal(true)
    }, 300);
  }

  const guardarGasto = gasto =>{

    if(gasto.id){
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }else{
      gasto.id = generarID();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }

    setanimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 300);
  }


  const eliminarGasto = id =>{

    const actualizarGasto = gastos.filter(gasto => gasto.id !== id)

    setGastos(actualizarGasto)

  }

  return (
    
    <div className={modal ? 'fijar' : ''}>
      <Header
      gastos={gastos}
      presupuesto ={presupuesto}
      setPresupuesto= {setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
      setGastos={setGastos}
      />
      
      {isValidPresupuesto && (
        <>
        <main>
          <Filtros
          filtro={filtro}
          setFiltro={setFiltro}
          >

          </Filtros>
        <Listadogastos
        gastos={gastos}
        setGastoEditar={setGastoEditar}
        eliminarGasto={eliminarGasto}
        gastosfiltro={gastosfiltro}
        filtro={filtro}
        />
        </main>
              <div className='nuevo-gasto'>
              <img
      
              src={IconoNuevoGasto}
              alt='nuevo gasto'
              onClick={handleNuevoGasto}
      
              />
            </div>
            </>
      )}
      {modal && 
      
      <Modal setModal={setModal}
        animarModal={animarModal}
        setanimarModal={setanimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />}
    </div>
  )
}
