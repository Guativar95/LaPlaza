export interface ProgressStepBarItemProps {
  stepNumber: number
  stepWidth: string
  text?: string
  active?: boolean
  progress?: string
}

export const ProgressStepBarItem = ({
  stepWidth,
  stepNumber,
  text,
  active,
  progress,
}: ProgressStepBarItemProps) => {
  return (
    <div style={{ width: stepWidth }}>
      <div className='relative mb-2'>
        {stepNumber !== 1 && (
          <div
            className='absolute flex align-center items-center align-middle content-center'
            style={{
              width: 'calc(100% - 2.5rem - 1rem)',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className='w-full bg-gray-200 rounded items-center align-middle align-center flex-1'>
              <div className='w-0 bg-primary/50 py-1 rounded' style={{ width: progress }}></div>
            </div>
          </div>
        )}

        <div
          className={`w-10 h-10 mx-auto rounded-full text-lg flex items-center ${
            active ? 'bg-primary text-white' : 'bg-white text-gray-600 border border-gray-300'
          }`}
        >
          <span className={`text-center w-full`}>{stepNumber}</span>
        </div>
      </div>

      <div className='text-sm text-center 2xl:text-base'>{text}</div>
    </div>
  )
}
