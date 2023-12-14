import { Navbar } from '../Navbar'
import { Wrapper } from '../Wrapper'

export const Header = () => {
  return (
    <header className='shadow bg-white'>
      <Wrapper>
        <Navbar />
      </Wrapper>
    </header>
  )
}
