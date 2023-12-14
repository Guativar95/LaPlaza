import React, { ReactNode, useState } from 'react'
import clsx from 'clsx'

import { Card } from '@/components/ui/Card'

export type Tab = {
  label: string
  content: ReactNode
}

export type TabsProps = {
  tabs: Tab[]
  classNameHeader?: string
  classNameContent?: string
}

export const Tabs: React.FC<TabsProps> = ({ tabs = [], classNameHeader, classNameContent }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const activateTab = (index: number) => {
    setActiveTabIndex(index)
  }

  return (
    <>
      <Card
        className={clsx(
          'flex justify-between items-center gap-8 py-5 overflow-x-auto',
          classNameHeader
        )}
      >
        {tabs.map((tab, index) => (
          <div key={index}>
            <button onClick={() => activateTab(index)}>
              <h2
                className={clsx(
                  'text-2xl text-secondary font-harabara-mais-demo',
                  index === activeTabIndex ? 'underline' : ''
                )}
              >
                {tab.label}
              </h2>
            </button>
          </div>
        ))}
      </Card>
      <Card className={classNameContent}>{tabs[activeTabIndex].content}</Card>
    </>
  )
}
