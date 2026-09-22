import { Route, Routes } from 'react-router-dom'
import { SiteLayout } from '../components/SiteLayout'
import { AboutPage } from '../pages/AboutPage'
import { CaseStudyPage } from '../pages/CaseStudyPage'
import { ContactPage } from '../pages/ContactPage'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ServicesPage } from '../pages/ServicesPage'
import { WorkPage } from '../pages/WorkPage'

export function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about/" element={<AboutPage />} />
        <Route path="services/" element={<ServicesPage />} />
        <Route path="work/" element={<WorkPage />} />
        <Route path="work/:slug/" element={<CaseStudyPage />} />
        <Route path="contact/" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
