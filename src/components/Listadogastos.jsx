import React from 'react'
import { Gasto } from './Gasto'
export const Listadogastos = ({gastos,setGastoEditar,eliminarGasto,filtro,gastosfiltro}) => {
  return (
    <div className='listado-gastos contenedor'>

        {
          filtro ? (
            <>
              <h2>{gastosfiltro.length ? 'Gastos' : 'No hay gastos en esta categoria'}</h2>

          {gastosfiltro.map(gasto =>
              <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              />
              )}
              </>

          ) : 
          <>
                  <h2>{gastos.length ? 'Gastos' : 'No hay gastos'}</h2>
            {gastos.map(gasto =>
            <Gasto
            key={gasto.id}
            gasto={gasto}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            />
            )}
            </>
        }
        </div>
  )
}
