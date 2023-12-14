import { useAccordion } from '@/components/ui/Accordion/AccordionContext'
import { Button } from '@/components/ui/Button'

export interface FilterApplyButtonProps {
  onClick?: () => void
}

export const FilterApplyButton = ({ onClick }: FilterApplyButtonProps) => {
  const { closeAll } = useAccordion()

  const handleClick = () => {
    closeAll()
    onClick && onClick()
  }

  return (
    <div className='flex justify-end mt-3'>
      <Button variant='gradient' className='!py-1' onClick={handleClick}>
        Continuar
      </Button>
    </div>
  )
}
