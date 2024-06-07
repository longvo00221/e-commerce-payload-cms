import { CollectionConfig } from 'payload/types'
import Dashboard from '../../app/_components/Dashboard'

const DashboardConfig: CollectionConfig = {
  slug: 'dashboard',
  admin: {
    useAsTitle: 'Dashboard',
    components: {
      views: {
        List: Dashboard,
      },
    },
  },
  fields: [
    {
      name: 'dummyField',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
  ],
}

export default DashboardConfig
