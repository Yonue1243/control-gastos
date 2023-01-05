import { useEffect, useState } from "preact/hooks";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
export const Controlpresupuesto = ({presupuesto,gastos,setGastos,setPresupuesto,setIsValidPresupuesto}) => {
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

      useEffect(() => {
      const totalGastado = gastos.reduce((total, gasto) =>gasto.cantidad + total, 0)
      const totalDisponible = presupuesto - totalGastado

      const nuevoPorcentaje = (((presupuesto-totalDisponible)/presupuesto)*100).toFixed(2)
      console.log(nuevoPorcentaje)

      setPorcentaje(nuevoPorcentaje)
      setGastado(totalGastado)
      setDisponible(totalDisponible)
      
      },[gastos])




    const formatearCantidad = (cantidad) => {
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          });
        return formatter.format(cantidad)
    }
    
    const handleResetApp = () =>{
      const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?')
      if(resultado){
        setGastos([])
        setPresupuesto(0)
        setIsValidPresupuesto(false)

      }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
          <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje>100 ? '#DC2626' : '#3B82F6',
            trailColor: '#F5F5F5',
            textColor: porcentaje>100 ? '#DC2626' : '#3B82F6'
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
          >

          </CircularProgressbar>
        </div>
        <div className='contenido-presupuesto'>
          <button className="reset-app" type="button" onClick={handleResetApp}>
            Resetear App
          </button>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''} `}>

            <span>Disponible: </span> {formatearCantidad(disponible)}

            </p>
            <p>

            <span>Gastado: </span> {formatearCantidad(gastado)}

            </p>

        </div>
    </div>  
  )
}
