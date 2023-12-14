import { HiOutlineDocumentReport } from 'react-icons/hi'
import { RiListUnordered } from 'react-icons/ri'
import { PanelCard } from '@vehicles/common/components/PanelCard'
import { PanelList } from '@vehicles/common/components/PanelList'

import { MainLayout } from '@/components/Layout'

export const HomePage = () => {
  return (
    <MainLayout title='Inicio'>
      <PanelList>
        <PanelCard
          icon={<HiOutlineDocumentReport className='text-8xl' />}
          to='/vehiculos'
          text='Inventario'
        />
        <PanelCard icon={<RiListUnordered className='text-8xl' />} to='#' text='Informes' />
      </PanelList>
    </MainLayout>
  )
}
