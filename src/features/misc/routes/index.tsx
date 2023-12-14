import { Route, Routes } from 'react-router-dom'

import { HelpPage, HomePage, NotFoundPage } from '../pages'

export const MiscRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<NotFoundPage />} />
      <Route path='404' element={<NotFoundPage />} />
      <Route path='inicio' element={<HomePage />} />
      <Route path='ayuda' element={<HelpPage />} />
    </Routes>
  )
}
